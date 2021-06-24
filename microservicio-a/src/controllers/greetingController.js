const rabbitController = require('./rabbitController')
const {v4: uuidv4} = require('uuid');
const greetingController = {}

const queue_name = 'greeting_queue';

greetingController.greeting = async (req, res) => {
    // Get params values of request
    let {name} = req.query;
    if (!name){
        name = '';
    }
    // Generate uuid value
    const uuid = uuidv4();

    // add msg to queue and get response
    await rabbitController.sendMessage(queue_name, uuid, name, async function (data) {
        return res.json({'message': data})
    });
}

module.exports = greetingController