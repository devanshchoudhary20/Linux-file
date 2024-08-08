const axios = require('axios');
const cheerio = require('cheerio');

// (async() => {
//     try{
//     const response = await axios.get("https://www.zeptonow.com/pn/id-idli-dosa-batter/pvid/a66ba5b4-313d-4469-becd-01b69bd19fc7")
//     const data =  response.data; 
    
//     const $ = cheerio.load(data);
//     const title = $('div[data-testid="pdp-product-name"] h1').text().trim();
//     const quantity = $('div[data-testid="pdp-product-qty"] p').text().trim();
  
//     let sellingPrice = $('h4[data-test-id="pdp-selling-price"]').text().trim();
//     let discountedPrice = $('p[data-test-id="pdp-discounted-price"]').text().trim();
  
//     if (!discountedPrice) {
//       const combinedPrice = $('h4[data-testid="pdp-discounted-selling-price"]').text().trim() || $('h4[data-test-id="pdp-selling-price"]').text().trim();
//       sellingPrice = combinedPrice;
//       discountedPrice = combinedPrice;
//     }
  
//     const discountPercentage = $('.tag_tag__Y2gMh').text().trim() || Math.round((1 - parseFloat(discountedPrice.replace(/[^\d.]/g, '')) / parseFloat(sellingPrice.replace(/[^\d.]/g, ''))) * 100) + '%';
//     const description = $('div[data-testid="product-details-container"] ul li')
//       .map((i, el) => $(el).text().trim())
//       .get()
//       .join('\n');
  
//     const imageUrl = $('img[data-nimg="1"][class*="aspect-square"]').eq(1).attr('src');
// //   console.log(data);
//     console.log ({
//         title,
//         quantity,
//         sellingPrice,
//         discountedPrice,
//         discountPercentage,
//         description,
//         imageUrl,
//         createdAt: new Date(),
//     });
//     }
//     catch(error){
//         console.log(error);
//     }
// })();



//fetch data from the url 
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK (make sure you have the necessary credentials)
if (!admin.apps.length) {
  const serviceAccount = require('./crawler-9470b-firebase-adminsdk-1hq9x-cd6571b190.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function getOnionDataFromFirestore(collectionName) {
  try {
    const db = admin.firestore();
    const collectionRef = db.collection(collectionName);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const snapshot = await collectionRef
      .where('title', '==', 'Onion')
      .where('createdAt', '>=', admin.firestore.Timestamp.fromDate(yesterday))
      .where('createdAt', '<', admin.firestore.Timestamp.fromDate(new Date()))
      .get();

    if (snapshot.empty) {
      console.log('No matching documents for Onion.');
      return null;
    }

    let onionData = null;
    snapshot.forEach(doc => {
      onionData = {
        id: doc.id,
        ...doc.data()
      };
    });

    return onionData;
  } catch (error) {
    console.error('Error getting Onion document:', error);
    throw error;
  }
}

// Example usage:
getOnionDataFromFirestore('products')
  .then(data => {
    if (data) {
      console.log('Onion product data:', data);
    } else {
      console.log('No Onion product found.');
    }
  })
  .catch(error => console.error(error));

