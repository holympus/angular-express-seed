
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { user : req.user });
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.subpartials = function (req, res) {
  var name = req.params.name;
  var subfolder = req.params.subfolder;
  res.render('partials/' +subfolder + '/' + name);
};