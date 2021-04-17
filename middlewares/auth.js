const { validateToken } = require('../security');

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;
  validateToken(req, token, next);
  next();
};