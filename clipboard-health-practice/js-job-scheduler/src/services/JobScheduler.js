export class JobScheduler {
  constructor() {
    this.jobs = []
    this.workers = []
  }

  addJob(job) {
    this.jobs.push(job)
    this.assignJobs()
  }

  addWorker(worker) {
    this.workers.push(worker)
  }

  assignJobs() {
    // get jobs that are queued
    // match with workers that are available
    const queuedJobs = this.jobs.filter((job) => job.status === 'queued')
    const availableWorkers = this.workers.filter((worker) =>
      worker.isAvailable()
    )

    queuedJobs.forEach((job) => {
      // check if there is a worker from available workers
      const worker = availableWorkers.shift()
      if (worker) {
        worker.assignJob(job)
      }
    })
  }

  getJobsByStatus(status) {
    return this.jobs.filter((job) => job.status === status)
  }
}
