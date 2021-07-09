require('dotenv').config()

const pg = require('pg')

if (process.env.DATABASE_URL) {
  // pg.defaults.ssl = { rejectUnauthorized: false }
}

const sharedConfig = {
  client: 'pg',
  migrations: { directory: './database/data/migrations' },
  seeds: { directory: './database/data/seeds' },
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
		connectionString: process.env.DEV_DATABASE_URL
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