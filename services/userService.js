const { Users } = require('../models');

const dataValidate = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

  if (!email) return res.status(400).json({ message: '"email" is required' });
  if (!password) return res.status(400).json({ message: '"password" is required' });
  if (!image || !displayName) return res.status(400).json({ message: 'the field is required' });

  if (typeof displayName !== 'string' || displayName.length < 8) {
    return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  }

  if (!regex.test(email)) return res.status(400).json({ message: '"email" must be a valid email' });

  if (password.length !== 6) return res.status(400).json({ message: '"password" length must be 6 characters long' });

  const findEmailBD = await Users.findOne({ where: { email } });
  if (findEmailBD) return res.status(409).json({ message: 'Usuário já existe' });

  next();
};

const loginValidate = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === '') return res.status(400).json({ message: '"email" is not allowed to be empty' });
  if (password === '') return res.status(400).json({ message: '"password" is not allowed to be empty' });

  if (!email) return res.status(400).json({ message: '"email" is required' });
  if (!password) return res.status(400).json({ message: '"password" is required' });

  const findEmailBD = await Users.findOne({ where: { email } });
  if (!findEmailBD) return res.status(400).json({ message: 'Campos inválidos' });

  next();
};

module.exports = {
  dataValidate,
  loginValidate,
};
