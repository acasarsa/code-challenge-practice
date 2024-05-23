export class Worker {
  constructor(id) {
    this.id = id || this.generateId()
    this.currentJob = null
  }

  generateId() {
    return `worker-${Math.random().toString(36).substr(2, 9)}`
  }

  assignJob(job) {
    this.currentJob = job
    job.status = 'running'
  }

  completeJob() {
    if (this.currentJob) {
      this.currentJob.status = 'completed'
    }
  }

  isAvailable() {
    return this.currentJob === null
  }
}
