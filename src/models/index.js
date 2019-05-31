import Sequelize, { DataTypes } from "sequelize";
import configEnvironments from "../config";

// Import entities
import Activity from "./Activity";
import Client from "./Client";
import Entity from "./Entity";
import EntityField from "./EntityField";
import Form from "./Form";
import Group from "./Group";
import GroupUser from "./GroupUser";
import Organization from "./Organization";
import User from "./User";
import UserOrganization from "./UserOrganization";
import Workflow from "./Workflow";

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
db.Activity = Activity(sequelize, DataTypes);
db.Client = Client(sequelize, DataTypes);
db.Entity = Entity(sequelize, DataTypes);
db.EntityField = EntityField(sequelize, DataTypes);
db.Form = Form(sequelize, DataTypes);
db.Group = Group(sequelize, DataTypes);
db.GroupUser = GroupUser(sequelize, DataTypes);
db.Organization = Organization(sequelize, DataTypes);
db.User = User(sequelize, DataTypes);
db.UserOrganization = UserOrganization(sequelize, DataTypes);
db.Workflow = Workflow(sequelize, DataTypes);

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
