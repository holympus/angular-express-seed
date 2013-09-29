/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};

exports.staticJSON =  function(req, res){
    path = req.params[0];
    res.sendfile(path, {root: './public/json'});
};
