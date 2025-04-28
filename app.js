const express = require("express");
const connectDB = require("./config/server");
const bookRoutes = require("./routes/bookRoutes");
const bookConsumer = require("./consumers/bookConsumer");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", bookRoutes);

// Start MongoDB connection
connectDB();

// Start the consumer in the background
bookConsumer.consumeMessage(); // This is your consumer method that starts listening to RabbitMQ

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
