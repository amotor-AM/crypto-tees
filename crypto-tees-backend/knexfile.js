require('dotenv').config()

const pg = require('pg')

const db = 'www.google.com' //change

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
}

const sharedConfig = {
  client: 'pg',
  migrations: { directory: './database/api/data/migrations' },
  seeds: { directory: './database/api/data/seeds' },
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
		connectionString: db,
		ssl: {rejectUnauthorized: false}
	  },
  },
  testing: {
    ...sharedConfig,
    connection: process.env.TESTING_DATABASE_URL,
  },
  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    // connectionString: pgConnection
    connection: {
      connectionString: process.env.DATABASE_URL || db,
      ssl: {rejectUnauthorized: false}
    }
  },
}