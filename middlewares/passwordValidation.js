const { validatePassword } = require('../utils');
const statusCode = require('../dicts/statusCodesHTTP');

function passwordValidation(request, response, next) {
  const { password } = request.body;
  const validation = validatePassword(password);
  if (validation.result === 'missing') {
    return next({
      code: statusCode.BAD_REQUEST,
      message: '"password" is required',
    });
  }
  if (validation.result === 'empty') {
    return next({
      code: statusCode.BAD_REQUEST,
      message: '"password" is not allowed to be empty',
    });
  }
  if (validation.result === 'invalid') {
    return next({
      code: statusCode.BAD_REQUEST,
      message: `"password" length must be ${validation.minLength} characters long`,
    });
  }

  return next();
}

module.exports = passwordValidation;