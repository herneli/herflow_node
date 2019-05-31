import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import FieldType from "./FieldType";
/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataType
 */
export default function(sequelize, dataType) {
  let EntityField = sequelize.define("entityField", {
    name: { type: dataType.STRING, unique: true },
    fieldType: {
      type: dataType.STRING,
      validate: {
        isIn: {
          args: [Object.values(FieldType)],
          msg: "Field type not valid"
        }
      }
    },
    required: dataType.BOOLEAN,
    unique: dataType.BOOLEAN,
    lenght: dataType.INTEGER,
    default: dataType.STRING,
    richText: dataType.BOOLEAN,
    selectValues: dataType.JSON,
    selectMultiple: dataType.BOOLEAN,
    selectButtons: dataType.BOOLEAN,
    minValue: dataType.DOUBLE,
    maxValue: dataType.DOUBLE,
    decimals: dataType.INTEGER
  });

  EntityField.associate = function(models) {
    models.EntityField.belongsTo(models.Entity, { as: "entity" });
    models.EntityField.belongsTo(models.Entity, { as: "entityValues" });
  };

  return EntityField;
}
