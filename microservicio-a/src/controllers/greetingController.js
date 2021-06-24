const greetingController = {}
const amqp = require('amqplib/callback_api');
const rabbitController = require('./rabbitController')
const {v4: uuidv4} = require('uuid');

const queue_name = 'greeting_queue';

greetingController.greeting = async (req, res) => {
    // Get value of param
    let {name} = req.query;
    if (!name){
        name = '';
    }
    // Generate uuid value
    const uuid = uuidv4();

    // add msg to queue and get response
    const message_response = await rabbitController.sendMessage(queue_name, uuid, name);

    return res.json({'message': message_response})
}

module.exports = greetingController