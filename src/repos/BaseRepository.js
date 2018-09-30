import moment from "moment";
import _ from "lodash";
import MysqlUnitOfWork from "../uow/MysqlUnitOfWork";

export default class BaseRepository {
  constructor(uow, table) {
    /**
     * @type {MysqlUnitOfWork}
     */
    this.uow = uow;
    this.table = table;
  }

  getAll() {
    return this.uow.query("select * from ??", [this.table]);
  }

  getById(id) {
    return this.uow
      .query("select * from ?? where id = ?", [this.table, id])
      .then(result => result[0]);
  }

  insert(entity) {
    entity.createdAt = moment().toDate();
    entity.updatedAt = moment().toDate();
    return this.uow
      .query("INSERT INTO ?? SET ?", [this.table, entity])
      .then(result => {
        entity.id = result.insertId;
        return entity;
      });
  }

  update(id, entity) {
    return this.getById(id).then(entityDb => {
      if (entityDb) {
        Object.assign(entityDb, entity);
        return this.uow
          .query("UPDATE ?? SET ? WHERE id = ?", [this.table, entityDb, id])
          .then(results => {
            if (results.affectedRows === 1) {
              return entityDb;
            } else {
              return null;
            }
          });
      } else {
        return null;
      }
    });
  }
}
