import amqp from 'amqplib';

let channel: amqp.Channel | null = null;

export const connectRabbitMQ = async () => {
    try {
		const connection = await amqp.connect('amqp://localhost:5672');
        channel = await connection.createChannel();
        await channel.assertQueue('orderQueue', { durable: true });
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
    }
};

export const getChannel = () => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized');
    }
    return channel;
};