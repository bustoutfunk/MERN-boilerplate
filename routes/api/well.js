var express = require('express');
var router = express.Router();

var _ = require('underscore');

var WellData = require('../../server/model').WellData;
var Well = require('../../server/model').Well;

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

  // Find Well ID from the Mac Address
  Well.forge().fetch({mac_address: payload.mac_address})
  .then(function(wellInfo){
    if(wellInfo.hasOwnProperty('well_id')){
      payload.well_id = wellInfo.well_id;

      return WellData.forge(payload).save();
    }
    else {
      throw new Error("Well ID Property not found from Well Info entry with Mac Address " + mac_address);
    }
  })
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
