const validator = require('validator');
const passwordValidator = require('password-validator');

function validateEmail(email) {
  if (!validator.isEmail(email)) {
    return false;
  }
  return true;
}

function validatePassword(password) {
  const schema = new passwordValidator();
  schema
    .is().min(8) // Minimum length 8
    .is().max(100) // Maximum length 100
    .has().uppercase() // Must have uppercase letters
    .has().lowercase() // Must have lowercase letters
    .has().digits(1) // Must have at least 1 digit
    .has().not().spaces(); // Should not have spaces

  return schema.validate(password, { list: true });
}

module.exports ={
  validateEmail,
  validatePassword
}
