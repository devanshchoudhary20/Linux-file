const axios = require('axios');
const cheerio = require('cheerio');

(async() => {
    try{
    const response = await axios.get("https://www.swiggy.com/stores/instamart/item/CAVNKMA3W4?storeId=911032"
        ,{
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
        }
    })
    const data =  response.data; 
    
    const $ = cheerio.load(data);
    const scriptContent = $('script').filter((i, el) => 
          $(el).html().includes('window.___INITIAL_STATE___')
        ).html();

    const match = scriptContent.match(/window\.___INITIAL_STATE___\s*=\s*(\{.*?\});/s);

    const jsonData = (match) =>{
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
    




    const extractProductData = (data,url) => {
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

    console.log(products);
};
const res = jsonData(match);
const productData = extractProductData(res);

    
    // console.log(scriptContent);
    }catch(err){
        console.log(err);
    }
})();   

