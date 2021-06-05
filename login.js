// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const mongoose = require('mongoose');

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect('mongodb://localhost:27017',
//     { useNewUrlParser: true, useUnifiedTopology: true });

//     const userInfoSchema = new mongoose.Schema({
//         name: String,
//         email: String,
//         image_url: String,
//         interests:String,
//         favCurrency:[currencySchema]
//     });

// const currencySchema = new mongoose.Schema({
//     name:String,
//     price:Number
// })


// const userInfoModel = mongoose.model('info', userInfoSchema);
// const currencyModel = mongoose.model('currency', currencySchema);


// function currencySeed() {
//     const USD = new currencyModel({
//         name:'US Dollar',
//         price:1    })
//     const EUR = new currencyModel({
//         name:'Euro',
//         price:1.13
//     })

//     const GPB = new currencyModel({
//         name:'British Pound',
//         price:1.25
//     })

//     USD.save();
//     EUR.save();
//     GPB.save();
// }
// currencySeed();
// function infoSeed() {
//     const mohammed = new userInfoModel({
//         name: 'Mohammed Mohiesen',
//         email: 'mmohiesen996@gmail.com',
//         image_url: 'image.com',
//         interests:'Sleeping',
//         favCurrency:[
//             {
//                 name:'USD',
//                 price:1
//             },
//             {
//                 name:'EUR',
//                 price:1.13
//             },
//             {
//                 name:'GBP',
//                 price:1.25
//             }
//         ]
//     })
//     mohammed.save();
// }

// infoSeed();