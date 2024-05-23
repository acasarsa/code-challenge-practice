"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
var Job = /** @class */ (function () {
    function Job(payload, id) {
        this.id = id || this.generateId();
        this.status = 'queued';
        this.payload = payload;
    }
    Job.prototype.generateId = function () {
        return "job-".concat(Date.now());
    };
    return Job;
}());
exports.Job = Job;
