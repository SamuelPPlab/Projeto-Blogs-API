const jwt = require('jsonwebtoken');

const secret = 'fr4s3D3S3gur4nc4';

async function validateToken(req, res, next) {
  try {
    console.log('VALIDATE TOKEN');
    const token = req.headers.authorization;
    console.log('TOKEN', token);

    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token expirado ou inválido' });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = validateToken;
