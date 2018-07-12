'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskType = { Maual: "Manual", Auto: "Auto"
    /**
     * TaskBase task
     *
     * @class TaskBase
     */
};
var TaskBase = function () {
    function TaskBase() {
        _classCallCheck(this, TaskBase);

        this.type = TaskType.Auto;
        this.options = {};
    }

    _createClass(TaskBase, [{
        key: 'clearOptions',
        value: function clearOptions() {
            this.options = "";
        }
    }, {
        key: 'validate',
        value: function validate(workflow) {
            if (!_lodash2.default.isObject(this.options)) throw new Error("'options' property is not an object.");
        }
    }, {
        key: 'execute',
        value: function execute(workflow) {}
    }]);

    return TaskBase;
}();

exports.default = TaskBase;
//# sourceMappingURL=TaskBase.js.map