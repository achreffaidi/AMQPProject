'use strict';


var mongoose = require('mongoose'),
  Users = mongoose.model('Users');

exports.list_all_users = function(req, res) {
  Users.find({}, function(err, users) {
    if (err)
      res.send(err);
    res.json({"userList" : users});
  });
};



var mq = require('../services/MQService.mjs');
exports.create_a_user = async function(req, res) {
  var new_user = new Users(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
       mq.alertUsers();
  
    res.json(user);
  });
};


exports.read_a_user = function(req, res) {
  Users.findById(req.params.UserId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.update_a_user = function(req, res) {
  Users.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_a_user = async function(req, res) {


  Users.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
      mq.alertUsers();
    res.json({ message: 'User successfully deleted' });
  });
};