var express = require('express');
var router = express.Router();

var _ = require('underscore');

var WellData = require('../../server/model').WellData;

router.get('/data', function(req, res, next){
  WellData.forge().fetchAll()
  .then(function(wellData){
    res.status(200).send({
      success: true,
      data: wellData
    });
  })
  .catch(function(err){
    res.status(200).send({
      success: false,
      data: err.toString()
    });
  })
});

router.post('/data', function(req, res, next){
  var requiredProps = ['level', 'battery', 'temp', 'record_at', 'mac_address', 'stat1', 'stat2', 'pg'];
  var payload = {};

  _.each(requiredProps, function(prop){
    if(req.body.hasOwnProperty(prop)){
      payload[prop] = req.body[prop];
    }
    else {
      res.status(200).send({
        success: false,
        msg: "Invalid Request Body"
      });
    }
  });

  WellData.forge(payload).save()
  .then(function(wellData){
    res.status(200).send({
      success: true,
      data: wellData
    })
  })
  .catch(function(err){
    res.status(200).send({
      success: false,
      msg: err.toString()
    });
  });
});

module.exports = router;
