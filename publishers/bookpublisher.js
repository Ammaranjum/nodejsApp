const amqp = require("amqplib");

const publishMessage = async (action, data) => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const queue = "task_queue";

    await channel.assertQueue(queue, { durable: true });

    const message = { action, data };

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });

    console.log(`Sent message to queue: ${action}`);
  } catch (error) {
    console.error("Error publishing message:", error);
  }
};

module.exports = { publishMessage };
