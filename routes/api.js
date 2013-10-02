/*
 * Serve JSON to our AngularJS client
 */

//eg
exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};

//Sampledata
exports.staticJSON =  function(req, res){
    path = req.params[0];
    res.sendfile(path, {root: './public/json'});
};



//login
exports.login = {
 
  get: function(req,res){
    if(req.user)
        res.json({ "success": "true", "username": req.user.username, "first_name": req.user.first_name });
    else
        res.send(401, {status:401, message: 'Unauthorized'});
  },
  
  del:function(req, res) {
      req.logout();
      res.json({ "success": "true"});
  },
};


//Register
exports.register = function(req,res){
   User.register(new User({ username : req.body.username, first_name: req.body.first_name }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.json({ "success": "false", "errorMsg": err.message })
        }
    var email_verification_code = Math.random().toString(36).substr(2,16);
    user.email_verification_code = email_verification_code;
    user.save(function (err) {
       if (err) return handleError(err);
        return res.json({ "success": "false", "errorMsg": "User could not be saved." })
      });
    //postmark.send({
        //"From": "notifications@crushthewod.com", 
        //"To": user.username, 
        //"Subject": "Email Confirmation", 
        //"TextBody": "Hello! Please confirm your email by clicking this link: http://54.241.9.166:3000/verifyemail/?v=" + email_verification_code
    //});
        res.json({ "success": "true" })
    });
};



//Candidates
exports.candidates = function(req,res){
  if(req.user){
    //code to get the user co. candidate data
  }else{
    res.sendfile('candidates.json', {root: './public/json'});
  }
};
exports.candidate =  function(req,res){
  if(req.user){
    //req.params['candidate_id'];
    //code to get the user data
  }else{
    res.sendfile('candidate.json', {root: './public/json'});
  }
};