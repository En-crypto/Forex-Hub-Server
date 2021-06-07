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
        let AUD  =   final[final.length-1].AUD - final[final.length-2].AUD;
        let CAD  =   final[final.length-1].CAD - final[final.length-2].CAD;
        let EGP  =   final[final.length-1].EGP - final[final.length-2].EGP;
        let EUR  =   final[final.length-1].EUR - final[final.length-2].EUR;
        let GBP  =   final[final.length-1].GBP - final[final.length-2].GBP;
        let JOD  =   final[final.length-1].JOD - final[final.length-2].JOD;
        let USD  =   final[final.length-1].USD - final[final.length-2].USD;
        resultArr.push(Math.sign(AUD));
        resultArr.push(Math.sign(CAD));
        resultArr.push(Math.sign(EGP));
        resultArr.push(Math.sign(EUR));
        resultArr.push(Math.sign(GBP));
        resultArr.push(Math.sign(JOD));
        resultArr.push(Math.sign(USD));
        console.log(final);
        console.log('final', AUD);
        res.status(200).send(resultArr);

    })
    .catch(err=>{
        res.status(500).send(`error in getting data ==> ${err}`)
    })
}

module.exports = gethistoricalData;
