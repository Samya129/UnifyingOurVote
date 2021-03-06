const express = require("express");
const path = require("path");
// var cors = require('cors');

const mongoose = require("mongoose");
const routes = require("./routes/auth.routes");

const app = express();
const db = require("./models/index");

const PORT = process.env.PORT || 3001;


// var whitelist = ['http://localhost:3000', 'http://localhost:3001']
// var corsOptions = {
//   origin: function (origin, callback) {
//     console.log(origin)
//     if (whitelist.indexOf(origin) !== -1) {
//       console.log(origin);
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors(corsOptions));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
routes(app);


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/sourpatchDB", {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true, 
  useFindAndModify: false
})
.then(() => {
  console.log("Successfully connect to MongoDB.");
  initial();
})
.catch(err => {
  console.error("Connection error", err);
//  process.exit();
});

function initial() {
}

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
app.use("/api/events", require('./routes/api/events'))

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
