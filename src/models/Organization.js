import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataType
 */
export default function(sequelize, dataType) {
  let Organization = sequelize.define("organization", {
    name: { type: dataType.STRING, unique: true },
    code: { type: dataType.STRING, unique: true }
  });

  Organization.associate = function(models) {
    models.Organization.belongsToMany(models.User, {
      through: models.UserOrganization
    });
  };

  return Organization;
}
