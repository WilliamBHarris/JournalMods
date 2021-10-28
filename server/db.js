const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:Hellowill1!@localhost:5432/eleven-journal');

module.exports = sequelize;