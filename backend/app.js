const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan"); //better debugging
const cors = require("cors");
//allow using a .env file
require("dotenv").config();   

//creates a new instance of express application
const app = express();

// add cors header to the server
app.use(cors({
  origin: '*'
}));

//sets up mongoose for the mongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

//declare port number for the api
const PORT = process.env.PORT || 3000;

//setup
app.use(express.json());
app.use(morgan("dev"));

//import routes
const primaryDataRoute  = require('./routes/primaryData');
const eventsDataRoute  = require('./routes/eventsData');

//2 months ago
let date = new Date();
(date.setMonth(date.getMonth() - 2));
let dateInput = date.toLocaleDateString();

//setup middle ware for routes
app.use('/primaryData', primaryDataRoute);
app.use('/eventData', eventsDataRoute)

app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});
//endpoint that creates Event Document with how many attendees that signed up for each individual event in last 2 months
app.get('/eventSignUp', (res, next) => {
  eventsDataRoute.aggregate([
    { $match : { $gte: [{ $toDate: dateInput }, "$date"]}},
    { $project : { _id : 0, eventName : 1, services : 0, date : 1, address : 0, description:0, count : {$size: '$attendees'}}},
  ], (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data);
    }
  });
});


//error handler
app.use(function (err, req, res, next) {
  // logs error and error code to console
  console.error(err.message, req);
  if (!err.statusCode)
    err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});