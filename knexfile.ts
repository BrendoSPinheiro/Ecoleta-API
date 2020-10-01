import path from 'path';

module.exports = {
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'root',
    password: 'root',
    database: 'ecoleta'
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  }
}