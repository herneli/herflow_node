import _ from 'lodash'
import debug from 'debug';

const TaskType = { Maual: "Manual", Auto: "Auto"}
/**
 * TaskBase task
 *
 * @class TaskBase
 */
class TaskBase {
    constructor(){
        this.type = TaskType.Auto;
        this.options = {};
    }

    clearOptions(){
        this.options = "";
    }

    validate(workflow)
    {
        if (!_.isObject(this.options)) throw new Error("'options' property is not an object.")
    }

    execute(workflow){

    }
}

export default TaskBase;