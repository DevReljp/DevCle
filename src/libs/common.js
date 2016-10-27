module.exports = {
  expected_login: (ary, req, res, redirect) => {
    for (var i in ary) {
      var opt = ary[i];
      if (req.url == opt.url && req.method == opt.method) {
        
        return res.redirect(redirect || '/' );
      }
    }
    return false;
  }
  
}