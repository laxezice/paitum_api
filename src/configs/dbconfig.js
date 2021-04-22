const { Sequelize } = require("sequelize");
const env = require("../../secret.json");
// const sequelize = new Sequelize(
//   `postgres://${env.user}:${env.password}@${env.host}:${env.port}/${env.database}`
// );
const sequelize = new Sequelize(env.database, env.user, env.password, {
  host: env.host,
  dialect: "postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
