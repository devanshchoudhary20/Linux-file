// const functions = require('firebase-functions');
const axios = require('axios');
const cheerio = require('cheerio');
const { performance } = require('perf_hooks');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, writeBatch } = require('firebase/firestore');
const functions = require('firebase-functions');

const firebaseConfig = {
  apiKey: "AIzaSyAR1P4vIqBQdaFdtHGCNCV19cK2wcC_RF8",
  authDomain: "crawler-9470b.firebaseapp.com",
  projectId: "crawler-9470b",
  storageBucket: "crawler-9470b.appspot.com",
  messagingSenderId: "303304101314",
  appId: "1:303304101314:web:a3c5fee8cb22216b141a5b",
  measurementId: "G-XMKSHQNTRT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Weather API configuration
const WEATHER_API_KEY = '9516a5fca465c5eaa1aa00d0a7165077';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const CITY_NAME = 'Bangalore,IN';

// Array of product links
const productLinks = [
  "https://www.swiggy.com/stores/instamart/item/8BB9HM9FUS?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/DLUYFBFCVI?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/UF1RAT2HVQ?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/X7L4VSY9CN?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/LM5GQQVUSN?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/KY84E18T60?custom_back=false&storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/8UDUHDG8RO?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/9BAIIO3PVQ?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/RC72JAN6NK?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/QXBIOH3DXP?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/QOQVGJJD2G?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/43ETLUUN3F?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/4M2JLMBEXY?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/2GHTJQFVLM?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/0P2SYHGGYD?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/CVCRRBZ9T2?storeId=911032",
  "https://swiggy.com/stores/instamart/item/1LQFVTJCI4?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/13JKWIC8ZS?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/QCQAEZEP5J?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/IX8H30PL2E?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/4ZHMXAN34F?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/AIZ20L10E6?storeId=911032",
  "https://swiggy.com/stores/instamart/item/DYC3IT9PNC?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/LWXQC73QQB?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/BU3X5R1YBG?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/Y7UQIO9EWS?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/0FYKU31E4B?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/3TA5QPWH1O?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/L4MZ9WEN0N?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/41VUGNXR41?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/0FYKU31E4B?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/GPD8TK86UN?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/X6SSJHKVRS?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/XJDP2DIVEO?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/AMCR6BAC6S?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/48UCLABTPP?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/Q5FGIOD2WW?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/P45DGM8MTR?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/VU4ORFLGMQ?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/8OGW9E1JME?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/CJ7W227AZE?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/O20HNRXYU4?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/VLSOLQ07BL?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/Q3J3C2YRB4?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/VNCFJAG2O3?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/OMMKARKLFR?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/GF1ST5YGE6?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/W3LA7AN0IS?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/7ND5JPMIYJ?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/AIZ20L10E6?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/MBIE278M1O?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/PA6Y0UEKYU?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/VH2D314W2D?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/SICQKSPUC6?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/KUBUY5Z9HS?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/S7SF094UMH?storeId=911032",
  "https://www.swiggy.com/stores/instamart/item/2TGQA0JWNC?storeId=911032"
]
;

async function fetchHTML(url) {
  try {
    const InitialCallTime = performance.now();
    const response = await axios.get(url,{
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const EndCallTime = performance.now();
    console.log('Total Time Taken to fetch(in sec):', (EndCallTime - InitialCallTime) / 1000);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${url}: ${error.message}`);
    return null;
  }
}

async function getWeatherData() {
  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: CITY_NAME,
        appid: WEATHER_API_KEY,
        units: 'metric'
      }
    });
    return {
      temperature: response.data.main.temp,
      condition: response.data.weather[0].main,
      description: response.data.weather[0].description
    };
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return null;
  }
}

const extractDataFromHtml = async (html) => {
  const $ = cheerio.load(html);
  const scriptContent = $('script').filter((i, el) => 
        $(el).html().includes('window.___INITIAL_STATE___')
      ).html();

  const match = scriptContent.match(/window\.___INITIAL_STATE___\s*=\s*(\{.*?\});/s);
  if (match) {
    const initialStateStr = match[1];
    // Parse the JSON string
    try {
        const initialState = JSON.parse(initialStateStr);
        return initialState;
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        return null;
    }
} else {
    console.log('window.___INITIAL_STATE___ not found in the file.');
    return null;
}

}

const extractProductData = async (data,url) => {
  const products = [];
  const items = data.instamart.cachedProductItemData.lastItemState.variations;
  // console.log(items);
  items.forEach(item => {
      const image = 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/' + item.images[0];
      const discountPercentage = Math.round((1-item.price.offer_price/item.price.store_price)*100) + '%';
      const product = {
          url : url,
          name : item.display_name,
          mrp: item.price.mrp,
          store_price: item.price.store_price,
          offer_price: item.price.offer_price,
          total: item.inventory.total,
          in_stock: item.inventory.in_stock,
          quantity: item.quantity,
          image : image,
          createadAt : new Date().toLocaleString(),
          discountPercentage : discountPercentage

      };
      products.push(product);
  });

  return products;
};

async function processLinks() {
  console.log('3');
  const weatherData = await getWeatherData();
  if (!weatherData) {
    console.error('Failed to get weather data');
    return; 
  }

  const productsCollection = collection(db, 'swiggy-products');
  const batchSize = 5;
  const totalBatches = Math.ceil(productLinks.length / batchSize);

  for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
    const promises = [];

    for (let i = 0; i < batchSize; i++) {
      const index = batchIndex * batchSize + i;
      if (index >= productLinks.length) break; 
      const link = productLinks[index];
      console.log(`Fetching: ${link}`);

      promises.push(
        fetchHTML(link)
          .then(html => {
            if (html) {
              return extractDataFromHtml(html);
            }
            throw new Error('Failed to fetch HTML');
          }).then((data)=> {
            if(data){
              return extractProductData(data,link)
            }
            throw new Error('Failed to extract product info');
          })
          .then(productInfo => {
            if (productInfo) {
              return {
                ...productInfo,
                temperature: weatherData?.temperature || '0',
                condition: weatherData?.condition || 'cannot fetch',
                weatherDescription: weatherData?.description || 'cannot fetch',
              };
            }
            throw new Error('Failed to extract product info');
          })
          .catch(error => {
            console.error(`Error processing link ${link}:`, error);
            return null; 
          })
      );
    }

    const results = await Promise.all(promises);

    // Filter out null results and prepare batch write
    const validResults = results.filter(result => result !== null);
    if (validResults.length > 0) {
      const batch = writeBatch(db);
      validResults.forEach(productInfo => {
        const docRef = doc(productsCollection);
        batch.set(docRef, productInfo);
      });

      // Commit the batch
      try {
        await batch.commit();
        console.log(`Batch ${batchIndex + 1} committed successfully`);
      } catch (error) {
        console.error(`Failed to commit batch ${batchIndex + 1}:`, error);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 50));
  }
}
  
exports.swiggyInstamartProducts = functions.region('asia-south1')
.runWith({timeoutSeconds: 540})
.https.onRequest(async (req, res) => {
  try {
    await processLinks();
    console.log('Finished processing all links. Data saved in Firestore.');
    res.status(200).json({ message: 'Processing completed successfully' });
  } catch (error) {
    console.error('Error in swiggyInstamartProducts:', error);
    res.status(500).json({ 
      error: 'An error occurred during processing',
      details: error.message
    });
  }
});

// Add this at the end of the file
// if (require.main === module) {
//   processLinks()
//     .then(() => console.log('Processing completed'))
//     .catch(error => console.error('Error:', error));
// }
