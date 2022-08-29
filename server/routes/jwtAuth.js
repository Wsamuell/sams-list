const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validateInfo = require("../middleware/validateInfo");

router.post("/register", validateInfo, async (req, res) => {
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

    // bcrypt if user does'nt exist

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    // enter user to db

    const newUser = await pool.query(
      "INSERT INTO users(username, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, first_name, last_name, email, bcryptPassword]
    );
    // generate jwt token

    const token = jwtGenerator(newUser.rows[0].id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/login", validateInfo, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rowCount === 0) {
      return res.status(401).json("Username or Password incorrect");
    }

    const validatePassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    if (!validatePassword) {
      return res.status(401).json("Username or Password incorrect");
    }

    // generate jwt token

    const token = jwtGenerator(user.rows[0].id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
