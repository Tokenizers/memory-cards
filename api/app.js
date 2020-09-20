const dotenv = require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");


//create an express http server
const app = express();

//we take port from environment variable
const port = process.env.PORT || 80;

// express middlewares

app.use(cors())

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(helmet());

//declaration des routes à associer.
require("./routes/score.routes.js")(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
