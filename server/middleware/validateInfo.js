module.exports = function (req, res, next) {
  const { username, first_name, last_name, email, password } = req.body;

  const validEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };
  const validUsername = (username) => {
    return /^[a-zA-Z0-9]+$/.test(username);
  };

  if (req.path === "/register") {
    if (![username, first_name, last_name, email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    } else if (!validUsername(username)) {
      return res.status(401).json("Invalid Username");
    }
  } else if (req.path === "/login") {
    if (![username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validUsername(username)) {
      return res.status(401).json("Invalid Username");
    }
  }

  next();
};
