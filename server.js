'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const server = express();
server.use(cors());
const PORT = process.env.PORT;
const bp = require('body-parser');

server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));


server.get('/', (req, res) => {
   res.status(200).send('Home');
})
server.get('/currency', (req, res) => {
   console.log("hello mhesen");
   // res.status(200).send('Home');
})
server.listen(PORT, () => {
   console.log(`Listening on PORT ${PORT}`);
})

const exchange = require('./exchange');

server.get('/rate', exchange);

server.get('*', (req, res) => {

   res.status(404).send('invalid request to backend')
});


server.post('/addUser', addUser);
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017',
   { useNewUrlParser: true, useUnifiedTopology: true });

function addUser(req, res) {
   const { name, email, image_url, interests } = req.body;
   let currentUser ={};
   const user = new userInfoModel({
      name: req.body.name,
      email: req.body.email,
      image_url: req.body.image_url,
      interests: req.body.interests
   });
   // res.status(200).send()
   userInfoModel.find({ email: email }, (error, userData) => {
      if (error) {
         res.send('User not found');
      }
      else{
         userData.forEach(item => {
            if(item.email === email) {
               currentUser = item;
            }
         })
      }
      console.log(currentUser);
   })
   user.save();
   res.send(currentUser);
}
const currencySchema = new mongoose.Schema({
   name: String,
   price: Number
})

const userInfoSchema = new mongoose.Schema({
   name: String,
   email: String,
   image_url: String,
   interests: String,
   favCurrency: [currencySchema]
});



const userInfoModel = mongoose.model('info', userInfoSchema);
const currencyModel = mongoose.model('currency', currencySchema);


function currencySeed() {
   const USD = new currencyModel({
      name: 'US Dollar',
      price: 1
   })
   const EUR = new currencyModel({
      name: 'Euro',
      price: 1.13
   })

   const GPB = new currencyModel({
      name: 'British Pound',
      price: 1.25
   })

   USD.save();
   EUR.save();
   GPB.save();
}
// currencySeed();
function infoSeed() {
   const mohammed = new userInfoModel({
      name: 'Mohammed Mohiesen',
      email: 'mmohiesen996@gmail.com',
      image_url: 'image.com',
      interests: 'Sleeping',
      favCurrency: [
         {
            name: 'USD',
            price: 1
         },
         {
            name: 'EUR',
            price: 1.13
         },
         {
            name: 'GBP',
            price: 1.25
         }
      ]
   })
   mohammed.save();
}

// infoSeed();