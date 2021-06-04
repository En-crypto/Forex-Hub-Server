'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const server = express();
server.use(cors());
const PORT =process.env.PORT;

server.get('/', (req, res) => {
   res.status(200).send('Home');
})
server.listen(PORT, () => {
   console.log(`Listening on PORT ${PORT}`);
})

const exchange = require('./exchange');
server.get('/rate',exchange)


server.get('*',(req,res)=>{
   
    res.status(404).send('invalid request to backend')
});
