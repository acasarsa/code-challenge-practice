"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobScheduler = void 0;
var JobScheduler = /** @class */ (function () {
    function JobScheduler() {
        this.jobs = [];
        this.workers = [];
    }
    JobScheduler.prototype.addJob = function (job) {
        this.jobs.push(job);
        this.assignJobs();
    };
    JobScheduler.prototype.addWorker = function (worker) {
        this.workers.push(worker);
        this.assignJobs();
    };
    JobScheduler.prototype.assignJobs = function () {
        var queuedJobs = this.jobs.filter(function (job) { return job.status === 'queued'; });
        var availableWorkers = this.workers.filter(function (worker) {
            return worker.isAvailable();
        });
        queuedJobs.forEach(function (job) {
            var worker = availableWorkers.shift();
            if (worker) {
                worker.assignJob(job);
            }
        });
    };
    JobScheduler.prototype.getJobsByStatus = function (status) {
        return this.jobs.filter(function (job) { return job.status === status; });
    };
    return JobScheduler;
}());
exports.JobScheduler = JobScheduler;
