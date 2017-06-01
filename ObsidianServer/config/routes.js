var express = require('express');
var router = express.Router();

var request = require('request');

router.route('/') // index
  .get(function(req,res) {
  	console.log("hit");
  	var obj = [{name: 'USDT_XRP',
    data: { id: 127,
      last: '0.22200001',
      lowestAsk: '0.22417645',
      highestBid: '0.22200100',
      percentChange: '0.01834852',
      baseVolume: '5745093.69417453',
      quoteVolume: '25956413.44663011',
      isFrozen: '0',
      high24hr: '0.23750000',
      low24hr: '0.19800000' },
      shares: 35},
{name: 'XMR_BCN',
  data: { id: 129,
    last: '0.00006805',
    lowestAsk: '0.00006805',
    highestBid: '0.00006662',
    percentChange: '-0.07891174',
    baseVolume: '226.42542194',
    quoteVolume: '3298832.34431225',
    isFrozen: '0',
    high24hr: '0.00007533',
    low24hr: '0.00006400' },
    shares: 35}];
  	// request('https://poloniex.com/public?command=returnTicker', function (error, response, body) {
  	//   var data = JSON.parse(body);
  	//   var currencies = [];
  	//   var keys = Object.keys(data);
  	//   var values = Object.values(data);
  	//   // console.log(Object.values(data));
  	//   // console.log(Object.keys(data));

  	//   keys.forEach(function(key, index){
  	//   	// console.log(key);
  	//   	// console.log(values[index]);
  	//   	var obj = {
  	//   		name: key,
  	//   		data: values[index]
  	//   	}
  	//   	currencies.push(obj);
  	//   });
  	// });
    res.json(obj);
  });

// Export Router
module.exports = router;