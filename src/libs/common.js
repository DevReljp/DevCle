module.exports = {
  exclude_authentication: (ary, req, res, redirect) => {
    for (var i in ary) {
      var opt = ary[i];
      if (req.url == opt.url && req.method == opt.method && req.session.currentUser) {
        return res.redirect(redirect || '/' );
      }
    }
    return false;
  },
  require_authentication: (ary, req, res, redirect) => {
    for (var i in ary) {
      var opt = ary[i];
      if (req.url == opt.url && req.method == opt.method && !req.session.currentUser) {
        return res.redirect(redirect || '/' );
      }
    }
    return false;
  }
}

String.prototype.capitalize = function() {
  var ary = this.split(" ");
  me = this;
  if (ary.length == 1) {
    me = me.singularize();
    return me.charAt(0).toUpperCase() + me.slice(1);
  } else {
    for (var i in ary) {
      ary[i] = ary[i].capitalize();
    }
    return ary.join("");
  }
}


var pluralRules = {
  pluralRules : {
    '/(s)tatus$/i':'RegExp.$1+"tatuses"',
    '/^(ox)$/i':'RegExp.$1+"en"',
    '/([m|l])ouse$/i':'RegExp.$1+"ice"',
    '/(matr|vert|ind)ix|ex$/i':'RegExp.$1+"ices"',
    '/(x|ch|ss|sh)$/i':'RegExp.$1+"es"',
    '/(r|t|c)y$/i':'RegExp.$1+"ies"',
    '/(hive)$/i':'RegExp.$1+"s"',
    '/(?:([^f])fe|([lr])f)$/i':'RegExp.$1+RegExp.$2+"ves"',
    '/(.*)sis$/i':'RegExp.$1+"ses"',
    '/([ti])um$/i':'RegExp.$1+"a"',
    '/(buffal|tomat)o$/i':'RegExp.$1+"oes"',
    '/(bu)s$/i':'RegExp.$1+"ses"',
    '/(alias)/i':'RegExp.$1+"es"',
    '/(octop|vir)us$/i':'RegExp.$1+"i"',
    '/(.*)s$/i':'RegExp.$1+"s"',
    '/(.*)/i':'RegExp.$1+"s"'
  },
  singularRules : {
    '/(s)tatuses$/i':'RegExp.$1+"tatus"',
    '/^(ox)en$/i':'RegExp.$1',
    '/([m|l])ice$/i':'RegExp.$1+"ouse"',
    '/(matr)ices$/i':'RegExp.$1+"ix"',
    '/(vert|ind)ices$/i':'RegExp.$1+"ex"',
    '/(cris|ax|test)es$/i':'RegExp.$1+"is"', 
    '/(x|ch|ss|sh)es$/i':'RegExp.$1',
    '/(r|t|c)ies$/i':'RegExp.$1+"y"',
    '/(movie)s$/i':'RegExp.$1',
    '/(hive)s$/i':'RegExp.$1',
    '/([^f])ves$/i':'RegExp.$1+"fe"',
    '/([lr])ves$/i':'RegExp.$1+"f"',
    '/(analy|ba|diagno|parenthe|synop|the)ses$/i':'RegExp.$1+"sis"',
    '/([ti])a$/i':'RegExp.$1+"um"',
    '/(buffal|tomat)oes$/i':'RegExp.$1+"o"',
    '/(bu)ses$/i':'RegExp.$1+"s"',
    '/(alias)es/i':'RegExp.$1',
    '/(octop|vir)i$/i':'RegExp.$1+"us"',
    '/(.*)s$/i':'RegExp.$1',
    '/(.*)/i':'RegExp.$1'
  },
  uninflected : [
    'deer', 'fish', 'measles', 'ois', 'pox', 'rice', 'sheep', 'Amoyese', 'bison', 'bream', 'buffalo', 'cantus', 'carp', 'cod', 'coitus', 'corps', 'diabetes', 'elk', 'equipment', 'flounder', 'gallows', 'Genevese', 'Gilbertese', 'graffiti', 'headquarters', 'herpes', 'information', 'innings', 'Lucchese', 'mackerel', 'mews', 'moose', 'mumps', 'news', 'nexus', 'Niasese', 'Pekingese', 'Portuguese', 'proceedings', 'rabies', 'salmon', 'scissors', 'series', 'shears', 'siemens', 'species', 'testes', 'trousers', 'trout', 'tuna', 'whiting', 'wildebeest', 'Yengeese'
  ],
  pluralIrregular : {
    'atlas':'atlases',  'child':'children',
    'corpus':'corpuses', 'ganglion':'ganglions',
    'genus':'genera', 'graffito':'graffiti',
    'leaf':'leaves', 'man':'men', 
    'money':'monies', 'mythos':'mythoi', 
    'numen':'numina', 'opus':'opuses',
    'penis':'penises', 'person':'people',
    'sex':'sexes', 'soliloquy':'soliloquies',
    'testis':'testes', 'woman':'women', 
    'move':'moves'
  },
  singularIrregular : {
    'atlases':'atlas', 'children':'child',
    'corpuses':'corpus', 'ganglions':'ganglion',
    'genera':'genus', 'graffiti':'graffito',
    'leaves':'leaf', 'men':'man', 
    'monies':'money', 'mythoi':'mythos',
    'numina':'numen', 'opuses':'opus',
    'penises':'penises', 'people':'person',
    'sexes':'sex', 'soliloquies':'soliloquy',
    'testes':'testis', 'women':'woman',
    'moves':'move'
  }
}

String.prototype.pluralize = function() {
  var word = this;
  for(i in pluralRules['uninflected']) {
    if(word.toLowerCase() == pluralRules['uninflected'][i]){
      return word;
    }
  }
  for(i in pluralRules['pluralIrregular']) {
    if(word.toLowerCase() == i) {
      return word = pluralRules['pluralIrregular'][i];
    }
  }
  for(i in pluralRules['pluralRules']) {
    try{
      var rObj = eval("new RegExp(" +i+ ");");
      if(word.match(rObj)) {
        word = word.replace(rObj, eval(pluralRules['pluralRules'][i]));
        return word;
      }
    }catch(e){
      alert(e.description);
    }
  }
  return word;
}

String.prototype.singularize = function() {
  var word = this;
  for(i in pluralRules['uninflected']) {
    if(word.toLowerCase() == pluralRules['uninflected'][i]){
      return word;
    }
  }
  for(i in pluralRules['singularIrregular']) {
    if(word.toLowerCase() == i) {
      return word = pluralRules['singularIrregular'][i];
    }
  }
  for(i in pluralRules['singularRules']) {
    try{
      var rObj = eval("new RegExp(" +i+ ");");
      if(word.match(rObj)) {
        word = word.replace(rObj, eval(pluralRules['singularRules'][i]));
        return word;
      }
    }catch(e){
    }
  }
  return word;
}

