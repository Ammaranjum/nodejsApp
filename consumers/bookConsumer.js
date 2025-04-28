// filepath: e:\RabbitMQ\consumers\bookConsumer.js
const amqp = require("amqplib");
const bookService = require("../services/bookServices");

const consumeMessage = async (consumerId) => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const queue = "task_queue";

    await channel.assertQueue(queue, { durable: true });

    console.log(`Consumer ${consumerId} is waiting for messages...`);

    channel.consume(queue, async (message) => {
      const { action, data } = JSON.parse(message.content.toString());
      console.log(`Consumer ${consumerId} processing message:`, {
        action,
        data,
      });

      let response;
      switch (action) {
        case "create":
          response = await bookService.createBook(data);
          break;
        case "read":
          response = await bookService.getBookById(data.id);
          break;
        case "update":
          response = await bookService.updateBook(data.id, data);
          break;
        case "delete":
          response = await bookService.deleteBook(data.id);
          break;
        default:
          response = { message: "Unknown action" };
      }

      console.log(`Consumer ${consumerId} finished processing:`, response);
      channel.ack(message);
    });
  } catch (error) {
    console.error(`Error in consumer ${consumerId}:`, error);
  }
};

module.exports = { consumeMessage };
