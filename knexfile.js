// knexfile 
require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
    development: {
        client: "mysql2",
        connection: {
        host: process.env.DB_LOCAL_HOST,
        database: process.env.DB_LOCAL_DBNAME,
        user: process.env.DB_LOCAL_USER,
        password: process.env.DB_LOCAL_PASSWORD,
        charset: "utf8"
        },
        migrations: {
        directory: __dirname + '/migrations',
        },
        seeds: {
        directory: __dirname + '/seeds',
        }
    },

    // Add other environments like production here...

    // production: {
    //   client: 'mysql2',
    //   connection: process.env.DATABASE_URL,
    //   // Additional production settings...
    // }
};
