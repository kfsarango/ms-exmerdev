require('dotenv').config()
const amqp = require('amqplib/callback_api');
amqp.connect(process.env.URL_RABBITMQ | "amqp://localhost", function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        const queue = 'greeting_queue';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.prefetch(1);

        console.log('ms-a: Awaiting RPC requests');
        
        // Received message
        channel.consume(queue, function reply(msg) {
            // get name
            const name = msg.content.toString();
            // building message of response
            let message = '';
            if (name === '' ) {
                message = 'Saludos desde el microservicio B'
            }else{
                message = `Hola ${name.toUpperCase()}, un saludo desde el microservicion B`
            }
            // set greeting message in queue
            channel.sendToQueue(msg.properties.replyTo,
                Buffer.from(message), {
                    correlationId: msg.properties.correlationId
                });
            channel.ack(msg);
        });
    });
});
