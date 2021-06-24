const rabbitController = {}
const amqp = require('amqplib/callback_api');
const rabbitUrl = 'amqp://localhost' | process.env.URL_RABBITMQ;

let ch = null;
amqp.connect(rabbitUrl, function (err, conn) {
    conn.createChannel(function (err, channel) {
        console.log('set channel');
        ch = channel;
    });
});

rabbitController.sendMessage = async (queueName, identifier, data) => {
    ch.assertQueue('', {
        exclusive: true
    }, function (error, q) {
        if (error) {
            throw error;
        }

        console.log(' [x] Requesting: ', data);

        ch.consume(q.queue, function (msg) {
            if (msg.properties.correlationId == identifier) {
                console.log(' [.] Got %s', msg.content.toString());
            }
        }, {
            noAck: true
        });

        ch.sendToQueue(queueName,
            Buffer.from(data), {
                correlationId: identifier,
                replyTo: q.queue
            });
    });
}
process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});

module.exports = rabbitController