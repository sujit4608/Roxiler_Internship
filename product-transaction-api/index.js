const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
const TaskOneRouter = require('./Task_1'); 
const TaskTwoRouter = require('./Task_2'); 
const TaskThreeRouter = require('./Task_3'); 



// Middleware for parsing JSON
app.use(express.json());

const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/productDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use('/task_one/', TaskOneRouter);

app.use('/task_one/', TaskOneRouter);

app.use("/task_two/",TaskTwoRouter);
app.use("/task_three/",TaskThreeRouter);

