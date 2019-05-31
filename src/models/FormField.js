import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataType
 */
export default function(sequelize, dataType) {
  let FormField = sequelize.define("formField", {
    name: { type: dataType.STRING, unique: true },
    row: dataType.SMALLINT,
    column: dataType.SMALLINT,
    width: { type: dataType.SMALLINT, validate: { min: 1, max: 12 } },
    readOnly: dataType.BOOLEAN
  });

  FormField.associate = function(models) {
    models.FormField.belongsTo(models.EntityField);
  };

  return FormField;
}
