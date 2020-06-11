require('dotenv').config();

module.exports = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: process.env.DB_ENABLE_LOGGING === 'true',
    define: {
      underscored: true,
      underscoredAll: true,
      paranoid: true,
      timestamps: true,
    },
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data'
};
