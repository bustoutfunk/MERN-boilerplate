var express = require('express');
var router = express.Router();

var _ = require('underscore');

var WellData = require('../../server/model').WellData;
var Well = require('../../server/model').Well;

router.get('/:userId', function(req, res){
  Well.where({user_id: req.params.userId}).fetchAll()
  .then(function(wells){
    res.status(200).send({
      success: true,
      data: wells
    });
  })
  .catch(function(err){
    res.status(200).send({
      success: false,
      data: err.toString()
    });
  });
});

router.get('/data/:id', function(req, res){
  WellData.where({well_id: req.params.id}).fetchAll()
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
    })
  });
});

router.get('/data', function(req, res){
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
  });
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
        msg: "Invalid Request Body! Missing Property " + prop
      });
    }
  });

  // Request Body Checking
  var battery = parseInt(payload.battery);
  var temp = parseInt(payload.temp);
  payload.stat1 = parseInt(payload.stat1);
  payload.stat2 = parseInt(payload.stat2);
  payload.pg = parseInt(payload.pg);

  if(['H', 'M', 'L', 'C'].indexOf(payload.level) === -1){
    res.status(200).send({
      success: false,
      msg: "Property Level has an invalid value (Can only be H, M, L, C)"
    });
  }
  else if(battery < 0 || battery > 100){
    res.status(200).send({
      success: false,
      msg: "Invalid Battery Value (0-100 only)"
    });
  }
  else if(temp < 0 || temp > 200){
    res.status(200).send({
      success: false,
      msg: "Invalid Temperature Value (0-200 only)"
    });
  }
  else if(payload.stat1 != 1 && payload.stat1 != 0 || payload.stat2 != 1 && payload.stat2 != 0 || payload.pg != 1 && payload.pg != 0) {
    res.status(200).send({
      success: false,
      msg: "Invalid stat1, stat2, pg values"
    });
  }


  // Find Well ID from the Mac Address
  Well.forge({mac_address: payload.mac_address}).fetch()
  .then(function(wellInfo){
    if(!wellInfo) {
      throw new Error("Well Info not found for Mac Address " + payload.mac_address);
    }

    if(wellInfo.hasOwnProperty('id')){
      payload.well_id = wellInfo.id;

      return WellData.forge(payload).save();
    }
    else {
      throw new Error("Well ID Property not found from Well Info entry with Mac Address " + payload.mac_address);
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
