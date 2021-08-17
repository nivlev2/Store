const jwt = require("jsonwebtoken");
exports.authToken = (req, res, next) => {
  let token = req.header("x-auth-token");
  if (!token) {
    res.status(404).json({ msg: "no token" });
  }
  try {
    let decodedToken = jwt.verify(token, "secretData");
    req.tokenData = decodedToken;
    next();
  } catch (error) {
    try {
      let decodedToken = jwt.verify(token, "admin");
      req.tokenData = decodedToken;
      next();
    } catch (error) {
      res.status(401).json(error);
    }
  }
};
exports.authAdminToken = (req, res, next) => {
  let token = req.header("x-auth-token");
  if (!token) {
    res.status(404).json({ msg: "no token" });
  }
  try {
    let decodedToken = jwt.verify(token, "admin");
    req.tokenData = decodedToken;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};
