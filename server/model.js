var db = require('./db').db;

var User = db.Model.extend({
  tableName: 'users',
  idAttribute: 'id'
});

var Log = db.Model.extend({
  tableName: 'logs'
});

var Servicer = db.Model.extend({
  tableName: 'servicers'
});

var WellData = db.Model.extend({
  tableName: 'wellData',
  hasTimestamps: ['created_at']
});

var Well = db.Model.extend({
  tableName: 'wells'
});

module.exports = {
  User: User,
  Log: Log,
  Servicer: Servicer,
  WellData: WellData,
  Well: Well
}
