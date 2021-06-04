
const axios = require('axios');
const EXCHANGE_API_KEY=process.env.EXCHANGE_API_KEY;

function  gettingDataExchange(request,response) {
    let req=request.query.latest;
    let exchangeUrl=`http://api.exchangeratesapi.io/v1/latest?access_key=1e160b3d9e41713270565254eab2730b`
    axios
    .get(exchangeUrl)
    .then(item=>{
        let result=item.data;
        console.log('result',result);
        response.status(200).send(result);

    })
    .catch(err=>{
        response.status(500).send(`error in getting data ==> ${err}`)
    })
}

module.exports = gettingDataExchange;
