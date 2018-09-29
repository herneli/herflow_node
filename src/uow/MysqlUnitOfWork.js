export default class MysqlUnitOfWork {
  constructor(connection) {
    this.connection = connection;
    this.openTransaction = false;
  }

  query(query, params) {
    let executeQuery = (resolve, reject) => {
      this.connection.query(query, params, (err, result, fields) => {
        if (err) {
          this.connection.rollback();
          reject(err);
        }
        resolve(result);
      });
    };

    return new Promise((resolve, reject) => {
      if (!this.openTransaction) {
        this.connection.beginTransaction(err => {
          if (err) {
            return reject(err);
          }
          this.openTransaction = true;
          executeQuery(resolve, reject);
        });
      } else {
        executeQuery(resolve, reject);
      }
    });
  }

  save() {
    return new Promise((resolve, reject) => {
      this.connection.commit(err => {
        this.openTransaction = false;
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  release() {
    this.openTransaction = false;
    this.connection.release();
  }

  rollback() {
    this.openTransaction = false;
    this.connection.rollback();
  }
}
