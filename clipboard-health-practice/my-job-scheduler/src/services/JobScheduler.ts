import { Job } from '../models/Job'
import { Worker } from '../workers/Worker'

export class JobScheduler {
  private jobs: Job[] = []
  private workers: Worker[] = []

  addJob(job: Job): void {
    this.jobs.push(job)
    this.assignJobs()
  }

  addWorker(worker: Worker): void {
    this.workers.push(worker)
    this.assignJobs()
  }

  assignJobs(): void {
    const queuedJobs = this.jobs.filter((job) => job.status === 'queued')
    const availableWorkers = this.workers.filter((worker) =>
      worker.isAvailable()
    )

    queuedJobs.forEach((job) => {
      const worker = availableWorkers.shift()
      if (worker) {
        worker.assignJob(job)
      }
    })
  }

  getJobsByStatus(status: 'queued' | 'running' | 'completed'): Job[] {
    return this.jobs.filter((job) => job.status === status)
  }
}
