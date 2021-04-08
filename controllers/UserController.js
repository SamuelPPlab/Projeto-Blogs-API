const UserController = require('express').Router();
const { regValidationRules, validateReg } = require('../middlewares/validateUserReg');
const UserServices = require('../services/UserServices');

UserController.post('/', regValidationRules(), validateReg, async (req, res) => {
  const userInfo = req.body;

  const { status, message, token } = await UserServices.registerUser(userInfo);

  return (!message) ? res.status(status).json({ token }) : res.status(status).json({ message });
});

module.exports = UserController;
