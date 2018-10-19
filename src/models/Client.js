import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataType
 */
export default function(sequelize, dataType) {
  let Client = sequelize.define("client", {
    clientId: { type: dataType.STRING, unique: true },
    clientSecret: dataType.TEXT,
    redirectUris: dataType.STRING,
    grants: dataType.STRING
  });

  return Client;
}
