'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const server = express();
server.use(cors());
server.get('/', (req, res) => {
   res.status(200).send('Home');
})
server.listen(3001, () => {
   console.log(`Listening on PORT http://localhost:3001/`);
})
