const axios = require('axios');

function  gettingDataconvert(req,res) {
    let currencyOne = req.query.from;
    let currencyTwo = req.query.to;
    let convertUrl=`https://api.exchangerate.host/convert?from=${currencyOne}&to=${currencyTwo}`;
    axios
    .get(convertUrl)
    .then(item=>{
        let result=item.data;
        res.status(200).send(result);

    })
    .catch(err=>{
        res.status(500).send(`error in getting data ==> ${err}`)
    })
}

module.exports = gettingDataconvert;
