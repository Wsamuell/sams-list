const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();
const port = 9000;

// middleware
app.use(cors());
app.use(express.json());

//  Route plans for the list //

// create a user

app
  .route("/user")
  .get(async (req, res) => {
    // res.send("Getting user");
    try {
      console.log(req.body);
    } catch (error) {
      console.log(error.message);
    }
  })
  .post(async (req, res) => {
    // res.send("creating new user");
    try {
      const { username, first_name, last_name, email, password } = req.body;
      const newUser = await pool.query(
        "INSERT INTO USERS(username, first_name, last_name, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [username, first_name, last_name, email, password]
      );
      res.json(newUser.rows);
    } catch (error) {
      console.error(error.message);
    }
  })
  .put(async (req, res) => {
    // res.send("updating user user");
    try {
      console.log(req.body);
    } catch (error) {
      console.log(error.message);
    }
  });

// get all user amount owed

// get a single amount owed

// update an amount owed

// delete an amount owed

// update user info

//  delete user

app.listen(port, () => {
  console.log(`Sam's List Server now running on ${port}`);
});
