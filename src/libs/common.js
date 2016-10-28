module.exports = {
  exclude_authentication: (ary, req, res, redirect) => {
    for (var i in ary) {
      var opt = ary[i];
      if (req.url == opt.url && req.method == opt.method && req.session.currentUser) {
        return res.redirect(redirect || '/' );
      }
    }
    return false;
  }
}