const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
// Cors Configuration
CorsOption = {
    origin : 'http://localhost:3000',
    optionSuccessStatus : 200
};
app.use(cors(CorsOption));
app.use(express.json());
app.use(bodyParser.json())
//connection

mongoose.connect('mongodb://localhost/reactapp',{useNewUrlParser : true})
.then(() => console.log('Successfully Connected to mongoDB'))
.catch((error) => console.log(error));

//Schema

const linkSchema = new mongoose.Schema({
    parentDomain : String,
    link : String
})

const Link = mongoose.model('Link',linkSchema);





//post Request
app.post('/crawl', async (req, res) => {
    // console.log(req.body);
    const { url } = req.body;
    try {
        
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const links = [];

        $('a').each((index, element) => {
            const href = $(element).attr('href');
            if (href) {
                links.push(href);

                const newLink = new Link({
                    parentDomain : url,
                    link : href
                });
                newLink.save().catch(error => console.log('error saving to db',error))
            }
        });

        res.json(links);
    } catch (error) {
        res.status(500).send('Error fetching');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
