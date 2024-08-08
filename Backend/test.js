const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:4000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser);

(async () => {
    try{
    const response = await mongoose.connect('mongodb://localhost/todoapp',{ useNewUrlParser: true });
    console.log("mongoose is COnnected");
    }catch(err){
        console.log("mongoose not connected");
    }
}
);






const TodoSchema = new mongoose.Schema({
  
})