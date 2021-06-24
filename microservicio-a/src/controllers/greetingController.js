const greetingController = {}
const amqp = require('amqplib/callback_api');
const rabbitController = require('./rabbitController')
const {v4: uuidv4} = require('uuid');

const queue_name = 'greeting_queue';

greetingController.greeting = async (req, res) => {
    uuid = uuidv4();
    rabbitController.sendMessage(queue_name, uuid, 'klever');
    console.log('this.state.')


    return res.json({'msg': uuid})
}

module.exports = greetingController