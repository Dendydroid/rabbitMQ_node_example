require('dotenv').config()

const amqp = require('amqplib');

const RABBIT = {
    HOST: process.env.RABBIT_HOST || 'rabbit-1',
    PORT: process.env.RABBIT_PORT || '5672',
    USER: process.env.RABBIT_USERNAME || 'guest',
    PASSWORD: process.env.RABBIT_PASSWORD || 'guest',
    CHANNEL: process.env.RABBIT_CHANNEL || 'test-queue',
};

async function receiveMessages() {
    const connection = await amqp.connect(`amqp://${RABBIT.USER}:${RABBIT.PASSWORD}@${RABBIT.HOST}:${RABBIT.PORT}`);

    let channel;
    let channelData;

    if (connection) {
        channel = await connection.createChannel();
    } else {
        console.log("Connection problem!", connection);
    }

    if (channel) {
        channelData = await channel.assertQueue(RABBIT.CHANNEL, {
            durable: false
        });

        channel.consume(RABBIT.CHANNEL, function (msg) {

            console.log(`Got message: `, msg.content.toString());

        }, {
            noAck: true
        });

    } else {
        console.log("Channel problem!", channel);
    }
}

receiveMessages();


