const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const { token } = req.params || req.query.token || req.headers;

  if (!token) {
    return res
      .status(404)
      .json({ success: false, msg: "UnAuthorized access!" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.jwt_secret);

    req.body._id = token_decode.id;
    next();
  } catch (error) {
    return res.status(404).json({ success: false, msg: "Login again!" });
  }
};

module.exports = authMiddleware;
