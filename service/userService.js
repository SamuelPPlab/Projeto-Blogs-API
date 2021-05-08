const { User } = require('../models');
const { createToken } = require('../utils/token');

const validateCreateUser = async (query) => {
  const isUserAlreadyExists = await User.findOne({
    attributes: ['email'],
    where: { email: query.email },
  });

  if (isUserAlreadyExists) return null;

  const userCreated = await User.create(query);
  const { password, email, ...user } = userCreated;
  console.log(user);
  const token = createToken(user);

  return token;
};

const getAllUsers = async () => {
  const allUsers = await User.findAll();
  return allUsers;
};

const getUSerById = async (id) => {
  const userByID = await User.findOne({ where: { id } });
  if (!userByID) return null;

  return userByID;
};

module.exports = {
  validateCreateUser,
  getAllUsers,
  getUSerById,
};
