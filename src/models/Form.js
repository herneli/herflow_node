import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataType
 */
export default function(sequelize, dataType) {
  let Form = sequelize.define("form", {
    name: { type: dataType.STRING, unique: true }
  });

  Form.associate = function(models) {
    models.Form.belongsTo(models.Entity);
  };

  return Form;
}
