'use strict';
import crypto from "crypto";

/** @type {import('sequelize-cli').Migration} */
export function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('UserFiles', [{
    UserId: '61ad624c-7233-4839-8ece-49fe0e3041ce',
    FileId: '62ad624c-7233-4839-8ece-49fe0e3041ce',
    FileSize: 5000,
    FileType: "pdf",
    DropDate: new Date(),
    CreatedAt: new Date(),
    UpdatedAt: new Date()
  }]);
}
export function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('UserFiles', null, {});
}