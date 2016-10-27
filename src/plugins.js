var fs = require('fs');

class Plugins {
  constructor() {
    this.plugins = [];
  }
  getPlugins() {
    var me = this;
    return new Promise(function(res, rej) {
      try {
        fs.readdir(`${__dirname}/plugins`, (error, files) => {
          for (var i in files) {
            let dir = files[i];
            if (dir.indexOf('.') == 0) {
              continue;
            }
            var plugin = require(`${__dirname}/plugins/${dir}`);
            me.plugins.push(plugin);
          }
          res();
        });
      } catch(e) {
        rej(e);
      }
    });
  }
  
  find(role) {
    var results = [];
    for (var i in this.plugins) {
      var plugin = this.plugins[i];
      if (plugin.role == role) {
        results.push(plugin);
      }
    }
    return results;
  }
};


var plugins = new Plugins;
plugins.getPlugins().then(() => {
}, 
(e) => {
  console.error(e);
});

module.exports = plugins;
