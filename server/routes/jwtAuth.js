const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    // destructure return value (name, email, password)
    const { username, first_name, last_name, email, password } = req.body;

    // check if user exist
    const checkUniqueEmail = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (checkUniqueEmail.rows.length !== 0) {
      return res.status(401).send("User already exist");
    }

    const checkUniqueUsername = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (checkUniqueUsername.rows.length !== 0) {
      return res.status(401).send("User already exist");
    }

    // bcrypt if user doesnt exist

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    // enter user to db

    const newUser = await pool.query(
      "INSERT INTO users(username, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, first_name, last_name, email, bcryptPassword]
    );
    res.json(newUser.rows[0]);
    // generate jwt token
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
