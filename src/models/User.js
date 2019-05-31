import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import _ from "lodash";
import bcrypt from "bcrypt";
/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataType
 */
export default function(sequelize, dataType) {
  let User = sequelize.define("user", {
    email: { type: dataType.STRING, unique: true },
    name: dataType.TEXT,
    password: dataType.STRING,
    language: dataType.STRING
  });

  User.associate = function(models) {
    models.User.belongsToMany(models.Organization, {
      through: models.UserOrganization
    });
  };

  User.prototype.toApi = function() {
    return _.pick(this.dataValues, ["id", "name", "language", "email"]);
  };

  User.hashPassword = function(password) {
    return bcrypt.hashSync(this.password, 3);
  };

  User.prototype.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
}
