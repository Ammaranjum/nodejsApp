const express = require("express");
const router = express.Router();
const bookPublisher = require("../publishers/bookPublisher");

// Create a new book
router.post("/books", async (req, res) => {
  try {
    const bookData = req.body;

    // Publish the message to RabbitMQ
    await bookPublisher.publishMessage("create", bookData);

    // Simulate immediate response with the created book data
    res.status(201).json({
      message: "Book creation request sent to RabbitMQ.",
      book: bookData, // Include the book data in the response
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get all books
router.get("/books", async (req, res) => {
  try {
    await bookPublisher.publishMessage("read", { action: "getAllBooks" });
    res.json({ message: "Books fetch request sent to RabbitMQ." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get book by ID
router.get("/books/:id", async (req, res) => {
  try {
    await bookPublisher.publishMessage("read", { id: req.params.id });
    res.json({ message: "Fetch book request sent to RabbitMQ." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update book by ID
router.put("/books/:id", async (req, res) => {
  try {
    await bookPublisher.publishMessage("update", {
      id: req.params.id,
      ...req.body,
    });
    res.json({ message: "Update book request sent to RabbitMQ." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete book by ID
router.delete("/books/:id", async (req, res) => {
  try {
    await bookPublisher.publishMessage("delete", { id: req.params.id });
    res.json({ message: "Delete book request sent to RabbitMQ." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
