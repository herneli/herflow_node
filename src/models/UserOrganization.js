import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataType
 */
export default function(sequelize, dataType) {
  let UserOrganization = sequelize.define("userOrganization", {
    role: { type: dataType.STRING }
  });

  return UserOrganization;
}
