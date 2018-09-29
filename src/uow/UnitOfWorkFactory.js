import mysql from "mysql";
import config from "../config";
import MySqlUnitOfWork from "./MysqlUnitOfWork";

let connectionPool = mysql.createPool({
  connectionLimit: config.db.connectionLimit,
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});
connectionPool.on("release", function(connection) {
  console.log("Connection %d released", connection.threadId);
});

/**
 * Factory abstraction for creating database connection:
 * Use create method in the client and connection will be
 * chosen based on config.
 */
class UnitOfWorkFactory {
  static create() {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          console.log("ERROR: getConnection failed: err = " + err);
          reject(Error("Error connection to database"));
        }
        console.log("Connection %d acquired", connection.threadId);
        let uow = new MySqlUnitOfWork(connection);
        resolve(uow);
      });
    });
  }
}

export default UnitOfWorkFactory;
