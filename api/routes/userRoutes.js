
'use strict';

module.exports = function(app) {
  var usersList = require('../controllers/usersController');
  var mq = require('../services/MQService.mjs'); 
  
  app.route('/users')
    .get(usersList.list_all_users)
    .post(usersList.create_a_user);


  app.route('/users/:userId')
    .get(usersList.read_a_user)
    .put(usersList.update_a_user)
    .delete(usersList.delete_a_user);

 
app.route('/msg').post(async (req, res)=>{
    let { queueName, payload } = req.body;
    await mq.publishToQueue(queueName, payload);
    res.statusCode = 200;
  
    res.json({"message-sent":true});
    
  })
  
};