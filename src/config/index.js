require("dotenv").config();

export default {
  app: {
    app: process.env.APP || "development",
    port: process.env.PORT || "2001"
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
    database: process.env.DB_NAME || "herflow",
    username: process.env.DB_USER || "herflow",
    password: process.env.DB_PASSWORD || "nald3aep",
    dialect: "mysql",
    operatorsAliases: false
    // logging: false
  },

  jwt: {
    secret: process.env.JWT_SECRET || "jwt_please_change",
    issuer: process.env.JWT_ISSUER || "http://www.herneli.com",
    expiration: process.env.JWT_EXPIRATION || "10000"
  }
};
