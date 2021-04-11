const { Users } = require('../models');

const create = async ({ displayName, email, password, image }) => {
  const user = { displayName, email, password, image };

  const userCreated = await Users.create(user);
  return userCreated;
};

const getAll = async () => {
  const users = await Users.findAll();
  return users;
};

const getById = async (id) => {
  const user = await Users.findByPk(id);
  return user;
};

const getByEmail = async (email) => {
  const user = await Users.findOne({ where: { email } });
  return user;
};

const remove = async (id) => {
  const removeUser = await Users.destroy({ where: { id } });
  if (!removeUser) return { message: 'Usuário não existe' };

  return {};
};

module.exports = {
  create,
  getAll,
  getById,
  getByEmail,
  remove,
};