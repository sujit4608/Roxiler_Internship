const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
const TaskOneRouter = require('./Task_1'); 
const TaskTwoRouter = require('./Task_2'); 
const TaskThreeRouter = require('./Task_3'); 
const TaskFourRouter=require('./Task_4'); 
const TaskFiveRouter=require('./Task_5'); 
const TaskSixRouter=require('./Task_6'); 



app.use(express.json());

const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/productDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use('/task_one/', TaskOneRouter);

app.use('/task_one/', TaskOneRouter);

app.use("/task_two/",TaskTwoRouter);
app.use("/task_three/",TaskThreeRouter);
app.use("/task_four/",TaskFourRouter);
app.use("/task_five/",TaskFiveRouter);
app.use("/task_six/",TaskSixRouter);




