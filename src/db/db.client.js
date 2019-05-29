const config = require('config');
const Bookshelf = require('bookshelf');

const MYSQL_HOST = config.get('MYSQL.HOST');
const MYSQL_DB = config.get('MYSQL.DB');
const MYSQL_USER = config.get('MYSQL.USER');
const MYSQL_PASSWORD = config.get('MYSQL.PASSWORD');
const MYSQL_CONNECTION_LIMIT = config.get('MYSQL.CONNECTION_LIMIT');

const Knex = require('knex');

const knex = Knex({
  client: 'mysql',
  connection: {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB,
  },
  pool: { min: 0, max: Number(MYSQL_CONNECTION_LIMIT) },
});

const bookshelf = Bookshelf(knex);

const model = tableName => bookshelf.Model.extend({ tableName });

module.exports = {
  bookshelf,
  knex,
  model,
};
