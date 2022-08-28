const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Sam's List Server now running on ${port}`);
});