const { body } = require("express-validator");

const sendMessageValidationRules = () => {
  console.log("body",body);

  return [
    body("content", "Content is required").notEmpty(),
    body("receiverId", "Recivier is required").notEmpty(),
    
  ];
};

module.exports = {
  sendMessageValidationRules,
};
