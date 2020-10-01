import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'root',
    password: 'root',
    database: 'ecoleta'
  }
});

export default connection;