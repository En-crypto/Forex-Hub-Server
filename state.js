
const axios = require('axios');
const { json } = require('body-parser');

function  gethistoricalData(req,res) {
    let currencies = 'GBP,EUR,JOD,CAD,USD,EGP,TKL,AUD,RAS';
    let base = req.query.base;
    let historyUrl=`https://api.exchangerate.host/timeseries?start_date=2021-06-01&end_date=2021-06-05&base=${base}&symbols=${currencies}`;
    axios
    .get(historyUrl)
    .then(item=>{
        let result=item.data;
        let final = Object.values(result.rates);
        let resultArr = [];
        let AUD  =   final[0].AUD - final[final.length-1].AUD;
        let CAD  =   final[0].CAD - final[final.length-1].CAD;
        let EGP  =   final[0].EGP - final[final.length-1].EGP;
        let EUR  =   final[0].EUR - final[final.length-1].EUR;
        let GBP  =   final[0].GBP - final[final.length-1].GBP;
        let JOD  =   final[0].JOD - final[final.length-1].JOD;
        let USD  =   final[0].USD - final[final.length-1].USD;

        resultArr.push(Math.sign(AUD));
        resultArr.push(Math.sign(CAD));
        resultArr.push(Math.sign(EGP));
        resultArr.push(Math.sign(EUR));
        resultArr.push(Math.sign(GBP));
        resultArr.push(Math.sign(JOD));
        resultArr.push(Math.sign(USD));

        console.log('final', AUD);
        res.status(200).send(resultArr);

    })
    .catch(err=>{
        res.status(500).send(`error in getting data ==> ${err}`)
    })
}

module.exports = gethistoricalData;
