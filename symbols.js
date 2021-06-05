const axios = require('axios');

function  gettingSymbols(req,res) {
    let symbolsUrl=`https://api.exchangerate.host/symbols`;
    axios
    .get(symbolsUrl)
    .then(item=>{
        let result=item.data;
        console.log('result',result);
        res.status(200).send(result);

    })
    .catch(err=>{
        res.status(500).send(`error in getting data ==> ${err}`)
    })
}

module.exports = gettingSymbols;