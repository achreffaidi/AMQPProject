const CONN_URL = 'amqp://localhost';


var amqp = require('amqplib/callback_api') ;
let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
   conn.createChannel(function (err, channel) {

      ch = channel;
    ch.assertExchange('notifier', 'fanout', {durable: false})

   });
});

exports.alertUsers =  async () =>{
   console.log("alerting user") ; 
   ch.publish('notifier', '', Buffer(JSON.stringify({text:"new_User",change:-2}))) ;   
}

 exports.publishToQueue = async (queueName, data) => {
    ch.publish('notifier', '', new Buffer(data)) ;   
    //ch.sendToQueue(queueName, new Buffer(data));
 }

 process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
 });