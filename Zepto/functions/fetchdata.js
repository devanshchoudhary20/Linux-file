const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin SDK with your project credentials
const serviceAccount = require('./crawler-9470b-firebase-adminsdk-1hq9x-cd6571b190.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

function convertTimestampToIST(timestamp) {
  if (timestamp && timestamp._seconds) {
    const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
    return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  }
  return timestamp; // Return the original value if it's not a Firestore Timestamp
}

function convertAllTimestamps(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertAllTimestamps);
  }

  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object' && '_seconds' in value && '_nanoseconds' in value) {
      result[key] = convertTimestampToIST(value);
    } else if (typeof value === 'object') {
      result[key] = convertAllTimestamps(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

async function fetchOnionDocumentsFromYesterday(collectionName) {
  try {
    const documents = [];

    // Calculate yesterday's date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    // Fetch documents from the collection with filters
    const snapshot = await db.collection(collectionName)
    .where('title', '==', 'Onion')
    .where('createdAt', '>=', admin.firestore.Timestamp.fromDate(yesterday))
    .where('createdAt', '<', admin.firestore.Timestamp.fromDate(new Date().setHours(0, 0, 0, 0)))
    .get();

    snapshot.forEach(doc => {
      const data = doc.data();
      const convertedData = convertAllTimestamps(data);
      documents.push({
        id: doc.id,
        ...convertedData
      });
    });

    if (documents.length === 0) {
      console.log('No matching documents found in the collection.');
      return;
    }

    console.log(`Successfully fetched ${documents.length} documents`);
    
    // Save the data to output.js file
    const outputData = `export const data = () => { ${JSON.stringify(documents, null, 2)}; };`;
    fs.writeFileSync('output.js', outputData);
    console.log('Data saved to output.js');

  } catch (error) {
    console.error('Error fetching documents:', error);
  } finally {
    // Terminate the Firebase Admin SDK
    admin.app().delete();
  }
}

// Usage
const collectionName = 'products';

fetchOnionDocumentsFromYesterday(collectionName);