var sequelize = require('../../libs/database');
var crypto = require("crypto");

var Sequelize = sequelize.Sequelize;
var db = sequelize.db;

var User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.STRING.BINARY
  },
  password: {
    type: Sequelize.STRING
  },
  created_at: {
    type: Sequelize.DATE,
    default: new Date
  },
  updated_at: {
    type: Sequelize.DATE,
    default: new Date
  }
}, {
  freezeTableName: true
});

User.sync().then(() => {
});

User.login = (userId, password) => {
  return new Promise((res, rej) => {
    User.findOne({
      userId: userId
    })
    .then((user) => {
      if (user == null) {
        return rej({message: 'User is not found.'});
      }
      console.log(user);
      var pass = User.generate_password(password);
      if (user.password === pass) {
        res(user);
      }else{
        return rej({message: 'Password is wrong.'});
      }
    },
    (err) => {
      return rej(err);
    });
  })
}

User.generate_password = (password) => {
  var sha512 = crypto.createHash('sha512');
  sha512.update(password);
  return sha512.digest('hex')
}

User.hook('afterValidate', (user, options) => {
  if (user.password && user.password != '') {
    user.password = User.generate_password(user.password);
  }
});

User.role = 'User';
module.exports = User;
