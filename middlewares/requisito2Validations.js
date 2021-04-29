const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (email === '') {
    return res
      .status(400)
      .json({ message: '"email" is not allowed to be empty' });
  }

  if (!email) {
    return res
      .status(400)
      .json({ message: '"email" is required' });
  }

  if (!regexEmail.test(email)) {
    return res
      .status(400)
      .json({ message: '"email" must be a valid email' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res
      .status(400)
      .json({ message: '"password" is not allowed to be empty' });
  }

  if (!password) {
    return res
      .status(400)
      .json({ message: '"password" is required' });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

module.exports = {
  validateEmail,
  validatePassword,
};