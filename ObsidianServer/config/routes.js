var express = require('express');
var router = express.Router();

router.route('/') // index
  .get(function(req,res) {
  	console.log("hit");
  	var obj = {
  		'names': [{id:1, name: 'Ethereum', amount: 65.72, shares: 32}, {id:2, name: 'Bitcoin',  amount: 125.32, shares: 42}, {id:3, name: 'NXT', amount: 140.52, shares: 25},{id:2344, name: 'NXT', amount: 140.52, shares: 25},{id:4, name: 'NXT', amount: 140.52, shares: 25},{id:5, name: 'NXT', amount: 140.52, shares: 25},{id:6, name: 'NXT', amount: 140.52, shares: 25},{id:7, name: 'NXT', amount: 140.52, shares: 25},{id:8, name: 'NXT', amount: 140.52, shares: 25},{id:9, name: 'NXT', amount: 140.52, shares: 25},{id:11, name: 'NXT', amount: 140.52, shares: 25},{id:12, name: 'NXT', amount: 140.52, shares: 25},{id:14, name: 'NXT', amount: 140.52, shares: 25},{id:55, name: 'NXT', amount: 140.52, shares: 25},{id:66, name: 'NXT', amount: 140.52, shares: 25},{id:77, name: 'NXT', amount: 140.52, shares: 25},{id:525, name: 'NXT', amount: 140.52, shares: 25},{id:23427, name: 'NXT', amount: 140.52, shares: 25},{id:7723, name: 'NXT', amount: 140.52, shares: 25}]
  	}
  	res.json(obj)
  });

// Export Router
module.exports = router;