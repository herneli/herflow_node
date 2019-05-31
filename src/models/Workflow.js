import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import _ from "lodash";

/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataType
 */
export default function(sequelize, dataType) {
  let Workflow = sequelize.define("workflow", {
    name: dataType.STRING
  });

  Workflow.associate = function(models) {
    models.Workflow.hasMany(models.Activity);
    models.Workflow.belongsTo(models.Organization);
  };

  Workflow.prototype.toApi = function() {
    let workflowApi = _.omit(this.dataValues, "activities");
    let mainActivity = _.find(this.activities, { parentActivityId: null });
    if (mainActivity) {
      mainActivity = mainActivity.toApi();
      mainActivity.childrenActivities = getChildren(
        mainActivity.id,
        this.activities
      );
      workflowApi.mainActivity = mainActivity;
    }
    return workflowApi;
  };

  return Workflow;
}

function getChildren(parentId, activityList) {
  let apiChildren = [];
  let children = _.filter(activityList, { parentActivityId: parentId });
  if (children && children.length > 0) {
    children.forEach(child => {
      let apiChild = child.toApi();
      apiChild.childrenActivities = getChildren(child.id, activityList);
      apiChildren.push(apiChild);
    });
    return sortChildren(apiChildren);
  } else {
    return null;
  }
}

function sortChildren(linkedList) {
  var sortedList = [];
  var map = new Map();
  var currentId = null;

  // index the linked list by previousActivityId
  for (var i = 0; i < linkedList.length; i++) {
    var item = linkedList[i];
    if (item.previousActivityId === null) {
      // first item
      currentId = item.id;
      sortedList.push(item);
    } else {
      map.set(item.previousActivityId, i);
    }
  }

  while (sortedList.length < linkedList.length) {
    // get the item with a previous item ID referencing the current item
    var nextItem = linkedList[map.get(currentId)];
    sortedList.push(nextItem);
    currentId = nextItem.id;
  }

  return sortedList;
}
