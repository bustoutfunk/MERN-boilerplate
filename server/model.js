var db = require('./db').db;

var User = db.Model.extend({
  tableName: 'users',
  idAttribute: 'id'
});

var Log = db.Model.extend({
  tableName: 'logs',
  idAttribute: 'id'
});

var Servicer = db.Model.extend({
  tableName: 'servicers',
  users: function() {
    return this.belongsTo(User, 'user_id');
  }
});

var WellData = db.Model.extend({
  tableName: 'wellData',
  hasTimestamps: ['created_at'],
  wells: function() {
    return this.belongsToMany(Well, 'well_id');
  }
});

var Well = db.Model.extend({
  tableName: 'wells',
  users: function() {
    return this.belongsTo(User, 'user_id');
  },
  servicers: function() {
    return this.belongsTo(Servicer, 'installer_id');
  }
});

module.exports = {
  User: User,
  Log: Log,
  Servicer: Servicer,
  WellData: WellData,
  Well: Well
}
