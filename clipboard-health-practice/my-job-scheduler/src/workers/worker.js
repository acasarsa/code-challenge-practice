"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
var Worker = /** @class */ (function () {
    function Worker(id) {
        this.currentJob = null;
        this.id = id || this.generateId();
    }
    Worker.prototype.generateId = function () {
        // Generate a unique identifier for the worker
        return "worker-".concat(Math.random().toString(36).substr(2, 9));
    };
    Worker.prototype.assignJob = function (job) {
        this.currentJob = job;
        console.log("Worker assigned to job ".concat(job.id, " with payload: ").concat(JSON.stringify(job.payload)));
        job.status = 'running';
    };
    Worker.prototype.completeJob = function () {
        if (this.currentJob) {
            this.currentJob.status = 'completed';
            console.log("Job ".concat(this.currentJob.id, " completed"));
            this.currentJob = null;
        }
        else {
            console.log('No job to complete');
        }
    };
    Worker.prototype.isAvailable = function () {
        return this.currentJob === null;
    };
    return Worker;
}());
exports.Worker = Worker;
