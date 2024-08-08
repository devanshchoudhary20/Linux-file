const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const cheerio = require('cheerio');
const { performance } = require('perf_hooks');

admin.initializeApp();
const db = admin.firestore();

// Weather API configuration
const WEATHER_API_KEY = '9516a5fca465c5eaa1aa00d0a7165077';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const CITY_NAME = 'Bangalore,IN';

// Array of product links
const productLinks = [
    "https://www.zeptonow.com/pn/akshayakalpa-amrutha-a2-pasteurized-fresh-milk-pouch/pvid/d3db9200-f330-4c52-996c-e231fcceaed0",
    "https://www.zeptonow.com/pn/nandini-goodlife-toned-uht-milk-fino-pouch/pvid/b01c94d5-7fa9-4119-b157-5e401def1280",
    "https://www.zeptonow.com/pn/amul-gold-homogenised-full-cream-milk-tetra-pack/pvid/ff393466-31a4-4aba-a51b-a787c39ef57e",
    "https://www.zeptonow.com/pn/nandini-goodlife-regular-milk-uht-tetra-pack-brik/pvid/b76a82b8-8c7d-4b3a-aa17-754fa3bfc0d4",
    "https://www.zeptonow.com/pn/amul-taaza-homogenised-toned-milk-tetra-pack/pvid/84eae511-5edb-4a22-875e-5aa94976c2d6",
    "https://www.zeptonow.com/pn/akshayakalpa-artisanal-organic-set-curd/pvid/a1f91e85-5ccc-4d8e-921a-b81ca9f8d896",
    "https://www.zeptonow.com/pn/akshayakalpa-organic-probiotic-curd-pouch/pvid/d13a1bd1-aeaa-4388-9f32-2be8b1815ae7",
    "https://www.zeptonow.com/pn/amul-masti-curd-pouch/pvid/3f3d772a-04a4-4236-8dd5-e848d99c459a",
    "https://www.zeptonow.com/pn/heritage-total-curd/pvid/d3e8e9e0-7e0f-4fcd-8725-a6b64409b5ad",
    "https://www.zeptonow.com/pn/akshayakalpa-artisanal-organic-set-curd/pvid/0e7d1f54-816e-4461-9f79-a651a41fec02",
    "https://www.zeptonow.com/pn/heritage-total-curd-pouch/pvid/6fe48002-44ec-4c37-af80-7034d3fc6db6",
    "https://www.zeptonow.com/pn/eggoz-nutrition-white-egg/pvid/919c9cd8-8961-41cb-841f-b0bbcdcf6b62",
    "https://www.zeptonow.com/pn/fresh-white-eggs/pvid/15d9c5dc-9b49-498b-8ce4-506ed15d56fe",
    "https://www.zeptonow.com/pn/relish-white-eggs/pvid/73efb76f-e10c-4318-989b-35186a1a03a4",
    "https://www.zeptonow.com/pn/eggoz-nutrition-white-egg/pvid/3e5b5972-959f-4862-b1f9-b478d4c710a4",
    "https://www.zeptonow.com/pn/jaya-white-eggs/pvid/cab85a62-1fbb-4741-a113-2526c1d55e25",
    "https://www.zeptonow.com/pn/relish-white-eggs/pvid/fd54d5f6-4a7b-4d0b-a3bb-dbef78cc9396",
    "https://www.zeptonow.com/pn/britannia-100-whole-wheat-sandwich-bread/pvid/c58f1b83-4064-4b52-bdf6-c568a221dc11",
    "https://www.zeptonow.com/pn/the-bakers-dozen-100-wholewheat-bread-zero-maida-no-palm-oil-no-preservative/pvid/2cae5364-c96d-4823-9531-96357c021208",
    "https://www.zeptonow.com/pn/english-oven-100-whole-wheat-bread/pvid/d3eaa022-099a-4edd-9f2a-48246d9c5229",
    "https://www.zeptonow.com/pn/modern-100-whole-wheat-zero-maida-breakfast-bread/pvid/a9da2861-358c-4824-b58c-d357e36eeca7",
    "https://www.zeptonow.com/pn/english-oven-multigrain-bread/pvid/90d14ba9-6d61-4c7c-80b7-8fc6e7615b50",
    "https://www.zeptonow.com/pn/akshayakalpa-organic-malai-paneer/pvid/a5b27839-d7bb-4c42-9687-16ba67ea2d83",
    "https://www.zeptonow.com/pn/milky-mist-paneer/pvid/861549d8-effd-49de-a2d3-d2ffd3c7333d",
    "https://www.zeptonow.com/pn/nandini-fresh-paneer-pouch/pvid/be889ba2-ef6e-4e34-a40c-b979419d82cc",
    "https://www.zeptonow.com/pn/nandini-fresh-paneer-pouch/pvid/d659bcb1-a7a3-42af-99dd-d849e3d4268a",
    "https://www.zeptonow.com/pn/amul-fresh-malai-paneer/pvid/54099eb2-2d08-4013-a822-a3eebc72f19f",
    "https://www.zeptonow.com/pn/amul-butter-pasteurised/pvid/bebc0d21-3d61-49ad-bedc-a7155a5169d3",
    "https://www.zeptonow.com/pn/amul-butter-pasteurised-school-pack/pvid/7457c7d6-26b9-466b-8950-9c1adb6faa9a",
    "https://zeptonow.com/pn/amul-butter-pasteurised/pvid/8da0c985-dc37-495c-a8bd-6019c120cb44",
    "https://www.zeptonow.com/pn/amul-garlic-herbs-buttery-spread/pvid/bb3b57c0-4a26-4c7b-8ff2-9e50ee19bb51",
    "https://www.zeptonow.com/pn/amul-processed-cheese-cubes/pvid/d7e39d38-933d-4f4d-8c7b-985c846803c8",
    "https://www.zeptonow.com/pn/amul-cheese-slices/pvid/b9d5ab38-b2cd-4348-8c66-2a91e313e7d7",
    "https://www.zeptonow.com/pn/amul-cheese-slices/pvid/1e981626-002a-4122-be38-a0532267214c",
    "https://www.zeptonow.com/pn/dlecta-100-mozzarella-cheese-pizza-block/pvid/1b435a73-e84f-4e23-8961-d159a48fdf53",
    "https://www.zeptonow.com/pn/mtr-dosa-instant-mix/pvid/ab718dd3-b355-43af-9c8e-4042821caaa8",
    "https://www.zeptonow.com/pn/batter-box-millet-idli-dosa-batter/pvid/07a6894d-bd3e-4f81-9034-7cf578ce1443",
    "https://www.zeptonow.com/pn/id-idli-dosa-batter/pvid/a66ba5b4-313d-4469-becd-01b69bd19fc7",
    "https://www.zeptonow.com/pn/mtr-breakfast-rava-dosa-mix/pvid/852e0a76-ef1b-42a6-92a5-e5986be6bcfe",
    "https://www.zeptonow.com/pn/relish-chicken-curry-cut-without-skin/pvid/8ddd4d0f-3ea7-410b-936e-cf35ddf70b1d",
    "https://www.zeptonow.com/pn/relish-goat-curry-cut/pvid/23dae741-1006-430b-8ccd-27b3d26d6350",
    "https://www.zeptonow.com/pn/relish-chicken-breakfast-sausages/pvid/1c60a507-3062-4b3c-a231-af9e2bd41f50",
    "https://www.zeptonow.com/pn/nandus-chicken-curry-cut-without-skin/pvid/ff0fead7-56ad-4add-90ec-cbba8c417377",
    "https://www.zeptonow.com/pn/relish-chicken-cheese-shot/pvid/610a71e7-a275-44ca-8607-aaab67ad3fdf",
    "https://www.zeptonow.com/pn/relish-chicken-breast-boneless/pvid/48fab541-c58c-4e40-8796-19cc492f1095",
    "https://www.zeptonow.com/pn/relish-chicken-curry-cut-with-skin/pvid/98c2ce55-81c2-4a1d-bec1-97e74bad6a18",
    "https://www.zeptonow.com/pn/relish-chicken-mince/pvid/06bac78c-d81f-4421-9fc3-b650de291f2b",
    "https://www.zeptonow.com/pn/licious-chicken-breast-boneless/pvid/8ff55a82-411a-4793-8259-396e72f415fb",
    "https://www.zeptonow.com/pn/relish-roopchand-rupchanda-steaks/pvid/66b58d0c-a6f0-49d5-b1dd-7fa60892b1d6",
    "https://www.zeptonow.com/pn/relish-basa-pangas-fillet/pvid/528ac9e2-8065-4663-bc3b-f8b3a3ae21c9",
    "https://www.zeptonow.com/pn/relish-rohu-curry-cut-with-head/pvid/68405e7b-be66-44ef-aa44-79ddbfa96f5a",
    "https://www.zeptonow.com/pn/carrot-local/pvid/30db5880-2b4a-4955-9c2d-833749f7adc2",
    "https://www.zeptonow.com/pn/cucumber-green/pvid/cabae210-289e-4aba-9a52-2ad18b34a2fc",
    "https://www.zeptonow.com/pn/capsicum-green/pvid/493fd6ac-d7d7-4d2d-9568-a60abad9a10a",
    "https://www.zeptonow.com/pn/onion/pvid/2f6630cd-3d48-4ac8-9905-1cf2acf28ec7",
    "https://www.zeptonow.com/pn/spring-onion/pvid/78c00b05-15a0-4b51-88e9-9850f1235e8b",
    "https://www.zeptonow.com/pn/tomato-local/pvid/7e261768-88d6-4cbb-8b9b-8718625577bd",
    "https://www.zeptonow.com/pn/potato/pvid/d38ec8e4-9042-4b42-8f4e-fe879bd50c4b",
    "https://www.zeptonow.com/pn/bottle-gourd/pvid/21dd96c3-e916-49e1-a194-9cc4d528b208",
    "https://www.zeptonow.com/pn/beans-french/pvid/ff305635-6260-45eb-8b10-93b738c5e263",
    "https://www.zeptonow.com/pn/beans-cluster-gawar-phali/pvid/0c372bab-6a46-4c79-a899-f481cb6e9449",
    "https://www.zeptonow.com/pn/deep-rooted-residue-free-indian-cucumber/pvid/60e89994-7cbd-42a2-ae3a-f9d04fa88df9",
    "https://www.zeptonow.com/pn/colocasia-arbi/pvid/295c9a24-a03b-46f5-ace0-ca6d671e0af4",
    "https://www.zeptonow.com/pn/deep-rooted-residue-free-broccoli/pvid/5f6b5740-8366-4766-835a-d3e8e86cbbfd",
    "https://www.zeptonow.com/pn/organic-lady-finger/pvid/a037ea33-5355-4b0a-8340-828c8b573af6",
    "https://www.zeptonow.com/pn/lady-finger/pvid/abe657be-567e-4288-ba48-7ddd0a8a1271",
    "https://www.zeptonow.com/pn/mushroom-button/pvid/178b3f0f-c01d-4065-8f5c-d1902cbb5d51",
    "https://www.zeptonow.com/pn/cauliflower/pvid/26574e4c-d976-4428-a3a6-2711e0a17485",
    "https://www.zeptonow.com/pn/brinjal-bharta/pvid/2513708b-8b1c-42de-ace7-6959e14fa11a",
    "https://www.zeptonow.com/pn/cabbage/pvid/74d7238d-08ab-4e83-b571-eaa05e84e582",
    "https://www.zeptonow.com/pn/sweet-corn/pvid/7d396da5-f85c-4fe4-8c86-ed8dca17e528",
    "https://www.zeptonow.com/pn/banana-raw/pvid/bd32ffce-cbf9-4085-ab89-f7d6c52a7556",
    "https://www.zeptonow.com/pn/radish-white/pvid/c32d6d29-9eba-4d4b-829d-4978ccd4203b",
    "https://www.zeptonow.com/pn/banana-elaichi-yelakki/pvid/db471557-f745-4574-9e82-1916a88d9e6b",
    "https://www.zeptonow.com/pn/banana-robusta/pvid/436c0025-de54-4748-a189-79e292f26071",
    "https://www.zeptonow.com/pn/tender-coconut/pvid/b9fbf0e7-de2d-4a89-ae74-b12a7c0ab236",
    "https://www.zeptonow.com/pn/apple-royal-gala/pvid/e47494e2-dd0c-456e-9489-154b729c1716",
    "https://www.zeptonow.com/pn/jamun/pvid/ce731fe9-2cab-4692-8ac8-98144ccd4d2b",
    "https://www.zeptonow.com/pn/kiwi-chile/pvid/862df01f-c0d6-4bc9-9731-347885d2113d",
    "https://www.zeptonow.com/pn/watermelon-kiran/pvid/360f5333-15c1-468d-9afd-8cd40aad64d7",
    "https://www.zeptonow.com/pn/baby-orange/pvid/6f416513-2be6-4c46-9124-a217a83eb96a",
    "https://www.zeptonow.com/pn/pear-beauty/pvid/1f1f229a-070a-4765-813e-8b9c6e588f40",
    "https://www.zeptonow.com/pn/ice-apple/pvid/62303ea7-0610-4ec7-867b-705203a119bb",
    "https://www.zeptonow.com/pn/muskmelon/pvid/b27712ea-5097-4c98-9250-ff25bbb71415",
    "https://www.zeptonow.com/pn/mango-raw/pvid/d340f38f-a667-433a-b904-cef49ed0408f",
    "https://www.zeptonow.com/pn/pineapple/pvid/31d5d84e-c818-43d6-848a-bd10b774d847",
    "https://www.zeptonow.com/pn/papaya/pvid/9d6ab15c-70e5-410f-9d4b-82be81494244",
    "https://www.zeptonow.com/pn/mango-dasheri/pvid/7dbeb696-0c4e-46c6-a66d-17dc0761a140",
    "https://www.zeptonow.com/pn/banana-nendran/pvid/ff1a1bc0-24a3-4663-8e53-48690cf15c3c",
    "https://www.zeptonow.com/pn/sapota/pvid/e954f385-e7b9-44d5-ad8c-d5c94512903a",
    "https://www.zeptonow.com/pn/muskmelon-striped/pvid/2a684a4b-9e5a-426f-91a7-3d7d1df179f8",
    "https://www.zeptonow.com/pn/apple-fuji/pvid/469e66b9-7dc4-419e-8e0b-fb18d7088ff8",
    "https://www.zeptonow.com/pn/superplum-cherry/pvid/5742217b-8b58-4ec5-b884-c19ab8e45e42",
    "https://www.zeptonow.com/pn/pomegranate/pvid/085b06eb-cf40-4922-acee-ad29826410f5",
    "https://www.zeptonow.com/pn/amul-masti-spiced-buttermilk/pvid/a8fc94dd-57fc-40a4-a9fe-f21c3a358521",
    "https://www.zeptonow.com/pn/amul-masti-spiced-buttermilk-combo/pvid/a27fb7ed-d57d-41dc-b46d-49e5044cbc1e",
    "https://www.zeptonow.com/pn/coriander-leaves/pvid/90ec80d3-40d9-46b6-8ccb-e1b8cb65a76d",
    "https://www.zeptonow.com/pn/lemon/pvid/0d043da8-bd98-456e-b424-d5312993f188",
    "https://www.zeptonow.com/pn/chilli-green/pvid/3fa81cc0-d5c2-4865-a576-df4677972b26",
    "https://www.zeptonow.com/pn/ginger/pvid/2952f7bd-4254-413a-9c74-7f0717d2e5e7",
    "https://www.zeptonow.com/pn/garlic/pvid/5c1bb975-875c-4a7d-97a0-5bcb0b9f2449",
    "https://www.zeptonow.com/pn/spinach-cleaned-without-roots/pvid/eeb31b35-04a7-47a7-a434-dd6625f1e82c",
    "https://www.zeptonow.com/pn/deep-rooted-residue-free-ginger/pvid/e33ff4f7-2454-455b-b932-39fc5c2b9d83",
    "https://www.zeptonow.com/pn/fenugreek-methi/pvid/2aa60e3e-2d3c-439f-b0c1-ef4aa6abf7a8",
    "https://www.zeptonow.com/pn/curry-leaves-cleaned-without-roots/pvid/08ddb9aa-3de4-4f39-a684-ac58e02c70ed",
    "https://www.zeptonow.com/pn/lettuce-iceberg/pvid/370bf2eb-11a9-40cb-915a-998162d73593",
    "https://www.zeptonow.com/pn/deep-rooted-residue-free-lettuce-green/pvid/1ffe200b-0b95-4a10-b59e-9e7c0bc024d1",
    "https://www.zeptonow.com/pn/organic-chilli-green/pvid/c753b41e-41f8-4460-b044-5624410bf636"
];

async function fetchHTML(url) {
  try {
    const InitialCallTime = performance.now();
    const response = await axios.get(url);
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

async function extractProductInfo(html, url) {
  if (!html) return null;

  const $ = cheerio.load(html);

  const title = $('div[data-testid="pdp-product-name"] h1').text().trim();
    const quantity = $('div[data-testid="pdp-product-qty"] p').text().trim();
  
    let sellingPrice = $('h4[data-test-id="pdp-selling-price"]').text().trim();
    let discountedPrice = $('p[data-test-id="pdp-discounted-price"]').text().trim();
  
    if (!discountedPrice) {
      const combinedPrice = $('h4[data-testid="pdp-discounted-selling-price"]').text().trim() || $('h4[data-test-id="pdp-selling-price"]').text().trim();
      sellingPrice = combinedPrice;
      discountedPrice = combinedPrice;
    }
  
    const discountPercentage = $('.tag_tag__Y2gMh').text().trim() || Math.round((1 - parseFloat(discountedPrice.replace(/[^\d.]/g, '')) / parseFloat(sellingPrice.replace(/[^\d.]/g, ''))) * 100) + '%';
    const description = $('div[data-testid="product-details-container"] ul li')
      .map((i, el) => $(el).text().trim())
      .get()
      .join('\n');
  
    const imageUrl = $('img[data-nimg="1"][class*="aspect-square"]').eq(1).attr('src');
    
  return {
    url,
    title,
    quantity,
    sellingPrice,
    discountedPrice,
    discountPercentage,
    description,
    imageUrl,
    createdAt: new Date(),
  };
}

function addUndefinedMessages(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = value !== undefined ? value : 'This Property is undefined while fetching';
    return acc;
  }, {});
}

async function processLinks() {
  const weatherData = await getWeatherData();
  if (!weatherData) {
    console.error('Failed to get weather data');
    return; 
  }

  const collectionRef = db.collection('products');
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
              return extractProductInfo(html, link);
            }
            throw new Error('Failed to fetch HTML');
          })
          .then(productInfo => {
            if (productInfo) {
              return addUndefinedMessages({
                ...productInfo,
                temperature: weatherData?.temperature || 'This Property is undefined while fetching',
                condition: weatherData?.condition || 'This Property is undefined while fetching',
                weatherDescription: weatherData?.description || 'This Property is undefined while fetching',
              });
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

    const validResults = results.filter(result => result !== null);
    if (validResults.length > 0) {
      const dbBatch = db.batch();
      validResults.forEach(productInfo => {
        const docRef = collectionRef.doc();
        dbBatch.set(docRef, productInfo);
      });

      try {
        await dbBatch.commit();
        console.log(`Batch ${batchIndex + 1} committed successfully`);
      } catch (error) {
        console.error(`Failed to commit batch ${batchIndex + 1}:`, error);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 50));
  }
}

exports.processProducts = functions
.region('asia-south1')
.runWith({timeoutSeconds: 540})
.https.onRequest(async (req, res) => {
  try {
    await processLinks();
    res.send('Finished processing all links. Data saved in Firestore.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred.');
  }
});
