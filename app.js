// filepath: e:\RabbitMQ\app.js
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

// Start multiple consumer instances
const consumerCount = 3; // Number of consumers
for (let i = 1; i <= consumerCount; i++) {
  bookConsumer.consumeMessage(`Consumer-${i}`);
}

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
