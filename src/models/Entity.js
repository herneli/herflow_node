import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import { builtinModules } from "module";
/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataType
 */
export default function(sequelize, dataType) {
  let Entity = sequelize.define("entity", {
    name: { type: dataType.STRING, unique: true }
  });

  Entity.associate = function(models) {
    models.Entity.belongsTo(models.Organization);
    models.Entity.hasOne(models.Form);
  };

  return Entity;
}
