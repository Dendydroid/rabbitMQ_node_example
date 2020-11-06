require('dotenv').config()

const express = require('express');
const app = express();
const amqp = require('amqplib');
const PORT = process.env.APP_PORT || 1234;

app.use(express.json());

const RABBIT = {
    HOST: process.env.RABBIT_HOST || 'rabbit-1',
    PORT: process.env.RABBIT_PORT || '5672',
    USER: process.env.RABBIT_USERNAME || 'guest',
    PASSWORD: process.env.RABBIT_PASSWORD || 'guest',
};

app.get('/message', async (req, res) => {
    if (req.body.data)
        console.log("Message Data received: ", req.body.data);
    res.end(await rabbitSendMessage(req.body.data) ?? "Error");
});

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
});

async function rabbitSendMessage(data) {
    const connection = await amqp.connect(`amqp://${RABBIT.USER}:${RABBIT.PASSWORD}@${RABBIT.HOST}:${RABBIT.PORT}`);
    
    let channel;
    let channelData;
    let success;

    if(connection) {
        channel = await connection.createChannel();
    }else {
        console.log("Connection problem!", connection);
    }

    if (!(data.queue && data.msg))
        return `Invalid data!`;

    if(channel)
    {
        channelData = await channel.assertQueue(data.queue, {
            durable: false
        });
    
        success = await channel.sendToQueue(data.queue, Buffer.from(data.msg));
        
        await channel.close();
        await connection.close();
    }else {
        console.log("Channel problem!", channel);
    }

    
    return JSON.stringify({channelData, success});
}