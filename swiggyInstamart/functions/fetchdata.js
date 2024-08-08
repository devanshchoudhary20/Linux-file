const admin = require('firebase-admin');
const fs = require('fs');
const { parse } = require('json2csv');

// Initialize Firebase Admin SDK with your project credentials
const serviceAccount = require('./crawler-9470b-firebase-adminsdk-1hq9x-5bce692ec0.json');
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

async function exportAllDocumentsToCsv(collectionName, outputFile) {
  try {
    const documents = [];

    // Fetch all documents from the collection
    const snapshot = await db.collection(collectionName).get();

    snapshot.forEach(doc => {
      const data = doc.data();
      const convertedData = convertAllTimestamps(data);
      documents.push({
        id: doc.id,
        ...convertedData
      });
    });

    if (documents.length === 0) {
      console.log('No documents found in the collection.');
      return;
    }

    // Convert to CSV
    const csv = parse(documents);

    // Write CSV to file
    fs.writeFileSync(outputFile, csv);

    console.log(`Successfully exported ${documents.length} documents to ${outputFile}`);
  } catch (error) {
    console.error('Error exporting documents to CSV:', error);
  } finally {
    // Terminate the Firebase Admin SDK
    admin.app().delete();
  }
}

// Usage
const collectionName = 'products';
const outputFile = 'output.csv';

exportAllDocumentsToCsv(collectionName, outputFile);