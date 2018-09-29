import moment from "moment";
import _ from "lodash";

export default class UserRepository {
  constructor(uow) {
    this.uow = uow;
  }

  getAll() {
    return this.uow.query("select * from users", []);
  }

  getById(id) {
    return this.uow
      .query("select * from users where id = ?", [id])
      .then(users => users[0]);
  }

  getByUserCode(userCode) {
    return this.uow
      .query("select * from users where userCode = ?", [userCode])
      .then(users => users[0]);
  }

  insert(user) {
    user.createdAt = moment().toDate();
    user.updatedAt = moment().toDate();
    return this.uow.query("INSERT INTO users SET ?", user).then(result => {
      this.uow.save();
      user.id = result.insertId;
      return user;
    });
  }

  update(id, user) {
    return this.getById(id).then(userDb => {
      if (userDb) {
        Object.assign(userDb, user);
        return this.uow
          .query("UPDATE users SET ? WHERE id = ?", [userDb, id])
          .then(results => {
            if (results.affectedRows === 1) {
              this.uow.save();
              return userDb;
            } else {
              return null;
            }
          });
      } else {
        return null;
      }
    });
  }

  apiProperties() {
    return ["id", "userCode", "name", "password"];
  }

  cleanApiUser(user) {
    return _.pick(user, this.apiProperties());
  }

  toApi(dbUser) {
    return _.omit(dbUser, ["password"]);
  }
}
