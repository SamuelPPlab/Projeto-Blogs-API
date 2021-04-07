const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { createToken, validateToken, secret } = require('../auth');
const { UserValidate } = require('../middlewares/UserValidate');

const models = require('../models');

const RouterUser = Router();
const Success = 200;
const GeneralConflict = 409;
const Created = 201;
const NotFound = 404;
const NoContent = 204;

RouterUser.get('/', validateToken, async (_req, res) => {
  const users = await models.User.findAll({});
  return res.status(Success).json(users);
});

RouterUser.post('/', UserValidate, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const userExists = await models.User.findOne({ where: { email } });
  if (userExists) return res.status(GeneralConflict).json({ message: 'Usuário já existe' });

  const user = await models.User.create({ displayName, email, password, image });
  const token = await createToken(user);

  return res.status(Created).json({ token });
});

RouterUser.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const user = await models.User.findOne({ where: { id } });
  if (!user) return res.status(NotFound).json({ message: 'Usuário não existe' });
  return res.status(Success).json(user);
});

RouterUser.delete('/me', validateToken, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const tokenVerify = jwt.verify(token, secret);
    const { id } = tokenVerify.data;
    models.User.destroy({ where: { id } });
    return res.send(NoContent);
  } catch (err) {
    return res.status(NoContent).json({ message: err.message });
  }
});

module.exports = RouterUser;
