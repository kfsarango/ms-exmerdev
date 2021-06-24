const amqp = require('amqplib/callback_api');

const rabbitController = {}
const rabbitUrl = process.env.URL_RABBITMQ | 'amqp:/s/localhost';


let my_channel = null;

// Set connection with RabbitMQ Server
amqp.connect(rabbitUrl, function (err, conn) {
    conn.createChannel(function (err, channel) {
        // Set channel
        my_channel = channel;
    });
});

// Sending message and receive response
rabbitController.sendMessage = async (queueName, identifier, data, callback) => {
    my_channel.assertQueue('', {
        exclusive: true
    }, function (error, q) {
        if (error) {
            throw error;
        }
        // Receive message using identifier
        my_channel.consume(q.queue, function (msg) {
            if (msg.properties.correlationId == identifier) {
                callback(msg.content.toString());
            }
        }, {
            noAck: true
        });

        // Send message to queue
        my_channel.sendToQueue(queueName,
            Buffer.from(data), {
                correlationId: identifier,
                replyTo: q.queue
            });
    });
}

// Clossing connection RabbitMQ
process.on('exit', (code) => {
    my_channel.close();
    console.log(`Closing rabbitmq channel`);
});

module.exports = rabbitController;