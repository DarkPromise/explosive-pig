import { Sequelize } from 'sequelize';

/** For clarification, I am using default values here
 *  but in a production environment, these values should be obtained
 *  directly from the environment variables.
 */

if(!process.env.POSTGRES_CONNECTION_STRING) {
  throw new Error("[Database] POSTGRES_CONNECTION_STRING environment variable is not set. Please set it to connect to the database.");
}

const sequelize = new Sequelize(
  process.env.POSTGRES_CONNECTION_STRING,
  {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false
})

export default sequelize;