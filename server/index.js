const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

//  Route plans for the list

// create a user

// get all user amount owed

// get a single amount owed

// update an amount owed

// delete an amount owed

// update user info

//  delete user

app.listen(port, () => {
  console.log(`Sam's List Server now running on ${port}`);
});
