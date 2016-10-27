exports.index = function(req, res) {
  console.log('req.session.currentUser', req.session.currentUser);
  res.render('index', {currentUser: req.session.currentUser});
}
