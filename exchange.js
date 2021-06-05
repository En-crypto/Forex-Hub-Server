
const axios = require('axios');

function  gettingDataExchange(req,res) {
    let currencies = 'GBP,EUR,JOD,CAD,USD,EGP,TKL,AUD,RAS';
    let base = req.query.base;
    console.log(req.query);
    let exchangeUrl=`https://api.exchangerate.host/latest?base=${base}&symbols=${currencies}`;
    axios
    .get(exchangeUrl)
    .then(item=>{
        let result=item.data;
        res.status(200).send(result);

    })
    .catch(err=>{
        res.status(500).send(`error in getting data ==> ${err}`)
    })
}

module.exports = gettingDataExchange;
