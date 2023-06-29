'use strict';
const crypto = require("crypto")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      Id : crypto.randomUUID(),
      AuthId : crypto.randomUUID(),
      Email : "emailtests@gmail.com",
      Name: 'John',
      LastName: 'Doe',
      SecondLastName: 'Doe2',
      Age : 50, 
      Address : "Address example",
      CreatedAt: new Date(),
      UpdatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};