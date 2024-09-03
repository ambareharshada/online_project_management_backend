const jwt = require("jsonwebtoken");
const SECRET_KEY = "auth123";

const authenticateToken = async (req, res, next) => {
  try {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders;

    if (token == null) res.status(401).json("Access Denied....");

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        if (err) return res.status(403).json({ message: 'Invalid Token ' });

      }
      req.user = user;
      next();
    });
  } catch (error) {
    throw {
      status: 500,
      message: "Error in Authentication",
    };
  }
};

module.exports = authenticateToken;