const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();

const userRoutes = require('./routes/users.routes');
const projectRoutes = require('./routes/project.routes');

// Set up PORT
const PORT = process.env.PORT || 8080

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Routes API
app.use("/api/v1", userRoutes);
app.use("/api/v1", projectRoutes)


app.use((req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});


// connection with MongoDB - database
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
    process.exit(1); // Terminate the application with a non-zero exit code
  });


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});