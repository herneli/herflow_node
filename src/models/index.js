import Sequelize, { DataTypes } from "sequelize";
import configEnvironments from "../config";
import User from "./User";
import Client from "./Client";

const config = configEnvironments.db;
let db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Load entities
db.User = User(sequelize, DataTypes);
db.Client = Client(sequelize, DataTypes);

// Execute method "associate" for each entity
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Enums

// Add prototype functions
Sequelize.Model.prototype.toApi = function() {
  return this.dataValues;
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
