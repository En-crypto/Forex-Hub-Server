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
server.get('/getfeed', async (req, res) => {
   let data = await userFeedbackModel.find({});
   console.log(data);
   res.status(200).send(data);
})
server.get('/currency', (req, res) => {
   console.log("hello mhesen");
   // res.status(200).send('Home');
})
server.listen(PORT, () => {
   console.log(`Listening on PORT ${PORT}`);
})
// const addToFavorite = require('./addfav');
const exchange = require('./exchange');
const converter = require('./converter');
const symbols = require('./symbols');


const history = require('./state');

server.post('/addUser', addUser);
server.get('/history', history);
server.delete('/deletefeed/:index', deleteFeedHandler);
server.get('/rate', exchange);
server.post('/contactUs', contactHandler);
server.post('/addToFavorite', addToFavorite);
server.get('/convert', converter);
server.get('/symbols', symbols);
server.get('/getFavData', getFavData);

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017',
   { useNewUrlParser: true, useUnifiedTopology: true });

async function addUser(req, res) {
   const { name, email, image_url, interests } = req.body;
   let currentUser = {};
   const user = new userInfoModel({
      name: req.body.name,
      email: req.body.email,
      image_url: req.body.image_url,
      interests: req.body.interests
   });
   let dbData = await userInfoModel.find({});
   dbData.map(item => {
      if (item.email === email) {
         currentUser = user;
      }
   })

   if (Object.keys(currentUser).length === 0) {
      currentUser = user;
      user.save();
   }
   res.send(currentUser);
}
async function getFavData (req,res) {
   let myEmail = req.query.email;
   await userInfoModel.find({email:myEmail} , (err,data) => {
      if(err) {
         console.log('nothing to show');
      }

      else{
            res.status(200).send(data[0].favCurrency);
         console.log(data);
      }
   })
}
function addToFavorite(req, res) {
   const { name1, name2, price, email } = req.body
   userInfoModel.find({ email: email }, (err, data) => {
      if (err) {
         console.log(err.message);
         res.status(500).send(err.message);
      } else {
         data[0].favCurrency.push({ name1, name2, price });
         data[0].save();
         res.status(200).send(data[0].favCurrency);
      }
   });

}

   server.get('*', (req, res) => {

      res.status(404).send('invalid request to backend')
   });


   const currencySchema = new mongoose.Schema({
      name1: String,
      name2: String,
      price: Number
   });

   const userInfoSchema = new mongoose.Schema({
      name: String,
      email: String,
      image_url: String,
      interests: String,
      favCurrency: [currencySchema]
   });


   // Maryam & Mo3tasem 

   const userFeedbackSchema = new mongoose.Schema({
      userName: String,
      userEmail: String,
      userNumber: String,
      userFeedback: String,

   });

   const userInfoModel = mongoose.model('info', userInfoSchema);
   const currencyModel = mongoose.model('currency', currencySchema);
   const userFeedbackModel = mongoose.model('contactUs', userFeedbackSchema)

   function currencySeed() {
      const USD = new currencyModel({
         name1: 'USD',
         name2: 'GBP',
         price: 1
      })
      const GBP = new currencyModel({
         name1: 'USD',
         name2: 'GBP',
         price: 1
      })

      const EUR = new currencyModel({
         name1: 'USD',
         name2: 'GBP',
         price: 1
      })

      USD.save();
      EUR.save();
      GBP.save();
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


   function ContactUsseed() {
      const newUser = new userFeedbackModel({
         userName: 'maryam',
         userEmail: 'maryam@gmail.com',
         userNumber: '0790790790',
         userFeedback: 'Hello',

      })
      // console.log(newUser);
      newUser.save();
   }
   // infoSeed();
   function contactHandler(req, res) {

      const { userName, userEmail, userNumber, userFeedback } = req.body;

      let currentUser = {};
      const feedbackuser = userFeedbackModel({
         userName: req.body.userName,
         userEmail: req.body.userEmail,
         userNumber: req.body.userNumber,
         userFeedback: req.body.userFeedback,
      });
      currentUser = feedbackuser;
      currentUser.save();
      res.send(currentUser);

   }

   async function deleteFeedHandler(req, res) {
      const index = Number(req.params.index);
      let id = {};
      let allFeeds = await userFeedbackModel.find({} , (err,data)=> {
         data.map((item,idx) => {
            if(idx == index) {
               id = item._id;
            }
         })
         
      })
      
      userFeedbackModel.findByIdAndDelete(id , (err) => {
         if(err) {
            console.log(err)
         }
      });
      res.send(allFeeds);
   }




// ContactUsseed();

// userName: String,
// userEmail: String,
// userNumber: String,
// userFeedback: String,
