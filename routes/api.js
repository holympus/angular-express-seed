var User = require('../models/user'),
Candidate = require('../models/candidate'),
Position = require('../models/position');
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
exports.staticJson =  function(req, res){
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
exports.register = function(req,res,next){
   User.register(new User({ username : req.query.username, first_name: req.query.first_name }), req.query.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.json({ "success": false, "errorMsg": err.message })
        }
    var email_verification_code = Math.random().toString(36).substr(2,16);
    user.email_verification_code = email_verification_code;
    user.save(function (err) {
        if (err) {
          console.log(err);
          return res.json({ "success": "false", "errorMsg": "User could not be saved." });
        }
      });
    //postmark.send({
        //"From": "notifications@crushthewod.com", 
        //"To": user.username, 
        //"Subject": "Email Confirmation", 
        //"TextBody": "Hello! Please confirm your email by clicking this link: http://54.241.9.166:3000/verifyemail/?v=" + email_verification_code
    //});
        //res.json({ "success": "true" })
        next();
    });
};



//Candidates
exports.candidates = function(req,res){
  if(req.user){
    Candidate.find({'company':req.user.company}).populate('position').exec(function(err, candidates) {
    res.json({'candidates': candidates});  
    });
  }else{
    res.sendfile('candidates.json', {root: './public/json'});
  }
};
exports.candidate =  function(req,res){
  if(req.user){
    //req.params['candidate_id'];
    Candidate.findOne({ '_id': req.params['candidate_id']}).populate('position').exec(function(err, candidate) {
    res.json({'candidate': candidate});  
    });
  }else{
    res.sendfile('candidate.json', {root: './public/json'});
  }
};

exports.positions = function(req,res){
  if(req.user){
    Position.find({'company':req.user.company}).populate('questions').exec(function(err, positions) {
    res.json({'positions': positions});  
    });
  }else{
    res.sendfile('positions.json', {root: './public/json'});
  }
};
exports.position =  function(req,res){
  if(req.user){
    //req.params['position_id'];
    Position.findOne({ '_id': req.params['position_id']}).populate('questions').exec(function(err, position) {
    res.json({'position': position});  
    });
  }else{
    res.sendfile('position.json', {root: './public/json'});
  }
};