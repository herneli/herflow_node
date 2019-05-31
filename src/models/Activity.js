import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import AssignmentType from "./AssignmentType";
import ActivityType from "./ActivityType";

/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataType
 */
export default function(sequelize, dataType) {
  let Activity = sequelize.define("activity", {
    name: dataType.STRING,
    isMain: dataType.BOOLEAN,
    type: {
      type: dataType.STRING,
      validate: {
        isIn: {
          args: [Object.values(ActivityType)],
          msg: "Type not valid"
        }
      }
    },
    assignmentType: {
      type: dataType.STRING,
      validate: {
        isIn: {
          args: [Object.values(AssignmentType)],
          msg: "Assignment type not valid"
        }
      }
    },
    assignmentObject: dataType.STRING
  });

  Activity.associate = function(models) {
    models.Activity.belongsTo(models.Workflow, {
      as: "workflow",
      foreignKey: "workflowId"
    });
    models.Activity.belongsTo(models.Activity, {
      as: "parentActivity",
      foreignKey: "parentActivityId"
    });
    models.Activity.belongsTo(models.Activity, {
      as: "previousActivity",
      foreignKey: "previousActivityId"
    });
    models.Activity.hasMany(models.Activity, {
      as: "childrenActivities",
      foreignKey: "parentActivityId"
    });
  };

  return Activity;
}
