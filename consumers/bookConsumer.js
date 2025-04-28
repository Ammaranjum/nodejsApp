const amqp = require("amqplib");
const bookService = require("../services/bookServices");

const consumeMessage = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const queue = "task_queue";

    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (message) => {
      const { action, data } = JSON.parse(message.content.toString());
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

      console.log(`Processed message: ${action}`);
      channel.ack(message);

      // You can send a response back to the publisher or client here if needed.
      console.log(response);
    });

    console.log("Consumer is waiting for messages...");
  } catch (error) {
    console.error("Error in consumer:", error);
  }
};

consumeMessage();
module.exports = { consumeMessage };
