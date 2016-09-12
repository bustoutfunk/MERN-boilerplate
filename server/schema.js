var Schema = {
  users: {
    id: {type: 'increments', nullable: false, primary: true},
    username: {type: 'string', maxlength: 20, nullable: false, unique: true},
    password: {type: 'string', maxlength: 150, nullable: false},
    first_name: {type: 'string', nullable: false},
    last_name: {type: 'string', nullable: false},
    address1: {type: 'string', nullable: false},
    address2: {type: 'string', nullable: true},
    city: {type: 'string', nullable: false},
    state: {type: 'string', maxlength: 2, nullable: true},
    zip: {type: 'string', maxlength: 5, nullable: false},
    phone: {type: 'string', nullable: false},
    email: {type: 'string', nullable: false},
    role: {type: 'string', nullable: false},
    record_date: {type: 'date', nullable: false},
    record_time: {type: 'time', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true},
    device_token: {type: 'string', nullable: false}
  },

  logs: {
    id: {type: 'increments', nullable: false, primary: true},
    error_message: {type: 'string', maxlength: 150, nullable: false},
    ip_address: {type: 'string', maxlength: 15, nullable: false},
    created_at: {type: 'dateTime', nullable: false}
  },

  servicers: {
    id: {type: 'increments', nullable: false, primary: true},
    user_id: {type: 'integer', nullable: false, unsigned: true},
    company_name: {type: 'string', nullable: false},
    first_name: {type: 'string', nullable: false},
    last_name: {type: 'string', nullable: false},
    address1: {type: 'string', nullable: false},
    address2: {type: 'string', nullable: true},
    city: {type: 'string', nullable: false},
    state: {type: 'string', maxlength: 2, nullable: true},
    zip: {type: 'string', maxlength: 5, nullable: false},
    phone: {type: 'string', nullable: false},
    email: {type: 'string', nullable: false},
    record_date: {type: 'date', nullable: false},
    record_time: {type: 'time', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },

  wellData: {
    id: {type: 'increments', nullable: false, primary: true},
    level: {type: 'string', nullable: false}, //H, M, L, C
    battery: {type: 'float', nullable: false},
    temp: {type: 'float', nullable: false},
    well_id: {type: 'integer', nullable: false, unsigned: true},
    record_at: {type: 'dateTime', nullable: false},
    mac_address: {type: 'string', nullable: false},
    stat1: {type: 'string', nullable: false}, //Debugging
    stat2: {type: 'string', nullable: false}, //Debugging
    pg: {type: 'string', nullable: false}, //Debugging
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true},
    send_push: {type: 'boolean', nullable: false}
  },

  wells: {
    id: {type: 'increments', nullable: false, primary: true},
    mac_address: {type: 'string', nullable: false},
    user_id: {type: 'integer', nullable: false, unsigned: true},
    installer_id: {type: 'integer', nullable: false, unsigned: true},
    tank_name: {type: 'string', nullable: false},
    size: {type: 'integer', nullable: false},
    location: {type: 'string', nullable: false},
    inletStatus: {type: 'boolean', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  }


}

module.exports = Schema;
