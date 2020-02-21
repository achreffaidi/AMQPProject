'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userShema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the User'
  },
  username: {
    type: String,
    required: 'Kindly enter the name of the User'
  },
  
});

module.exports = mongoose.model('Users', userShema);