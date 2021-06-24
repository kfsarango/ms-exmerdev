var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'greeting_queue';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.prefetch(1);
        console.log(' [x] Awaiting RPC requests');
        channel.consume(queue, function reply(msg) {
            var name = msg.content.toString();

            console.log("Receive MSG", name);
            console.log(msg.properties.replyTo);
            console.log(msg.properties.correlationId);

            channel.sendToQueue(msg.properties.replyTo,
                Buffer.from("Response from ms-B"), {
                    correlationId: msg.properties.correlationId
                });
            channel.ack(msg);
        });
    });
});