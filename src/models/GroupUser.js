import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataType
 */
export default function(sequelize, dataType) {
  let GroupUser = sequelize.define("groupUser", {
    name: { type: dataType.STRING, unique: true }
  });

  GroupUser.associate = function(models) {
    models.GroupUser.belongsTo(models.Organization);
    models.GroupUser.belongsTo(models.Group, {
      as: "parentGroup",
      foreignKey: "parentGroupId"
    });
  };

  return GroupUser;
}
