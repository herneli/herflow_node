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

    validate(workflow)
    {
        throw { message: "this.options is not an object" }
        if (_.isObject(this.options)) throw "this.options is not an object";
    }

    execute(workflow){

    }
}

export default TaskBase;