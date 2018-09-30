import moment from "moment";
import _ from "lodash";
import BaseRepository from "./BaseRepository";

export default class UserRepository extends BaseRepository {
  constructor(uow) {
    super(uow, "users");
  }

  getByUserCode(userCode) {
    return this.uow
      .query("select * from ?? where userCode = ?", [this.table, userCode])
      .then(result => result[0]);
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
