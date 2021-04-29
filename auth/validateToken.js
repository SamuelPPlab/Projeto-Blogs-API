const jwt = require('jsonwebtoken');

const SECRET = 'my&7Ip$xk6PIsDL';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Token não encontrado' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: 'Token expirado ou inválido' });
    }
    req.user = decoded;
  });
  next();
};

module.exports = validateToken;
