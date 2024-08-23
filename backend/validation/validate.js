const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  //console.log("validate req",req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
