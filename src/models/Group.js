import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataType
 */
export default function(sequelize, dataType) {
  let Group = sequelize.define("group", {
    name: { type: dataType.STRING, unique: true }
  });

  Group.associate = function(models) {
    models.Group.belongsTo(models.Organization);
    models.Group.belongsTo(models.Group, {
      as: "parentGroup",
      foreignKey: "parentGroupId"
    });
  };

  return Group;
}
