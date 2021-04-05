const { isFalsy, isTruthy, isLessThan, isEmailInvalid } = require('./helpers');

module.exports = (newUser, emailIsUsed) => {
  switch (true) {
    case isTruthy(emailIsUsed): throw new Error('C_ERR_EMAIL_IN_USE');
    case isFalsy(newUser): throw new Error('C_ERR_NOT_FOUND');
    case isFalsy(newUser.email): throw new Error('C_ERR_EMAIL_REQ');
    case isFalsy(newUser.name): throw new Error('C_ERR_NAME_REQ');
    case isFalsy(newUser.password): throw new Error('C_ERR_PASS_REQ');
    case isEmailInvalid(newUser.email): throw new Error('C_ERR_EMAIL_INVALID');
    case isLessThan(newUser.name.length, 8): throw new Error('C_ERR_NAME_INVALID');
    case isLessThan(newUser.password.length, 6): throw new Error('C_ERR_PASS_INVALID');
    default: break;
  }
};