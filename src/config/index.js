require("dotenv").config();

export default {
  app: {
    app: process.env.APP || "development",
    port: process.env.PORT || "2011"
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
    database: process.env.DB_NAME || "herflow",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 5
  },
  jwt: {
    secret: process.env.JWT_SECRET || "jwt_please_change",
    issuer: process.env.JWT_ISSUER || "http://www.herneli.com",
    expiration: process.env.JWT_EXPIRATION || "10000"
  }
};
