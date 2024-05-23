/*
 * Represents a worker that can process a job.
 * Can be assigned a job to work on.
 * Provides a method to complete the assigned job, changing its status.
 */
import { Job } from '../models/Job'

export class Worker {
  id: string
  currentJob: Job | null = null

  constructor(id?: string) {
    this.id = id || this.generateId()
  }

  private generateId(): string {
    // Generate a unique identifier for the worker
    return `worker-${Math.random().toString(36).substr(2, 9)}`
  }

  assignJob(job: Job): void {
    this.currentJob = job
    console.log(
      `Worker assigned to job ${job.id} with payload: ${JSON.stringify(
        job.payload
      )}`
    )
    job.status = 'running'
  }

  completeJob(): void {
    if (this.currentJob) {
      this.currentJob.status = 'completed'
      console.log(`Job ${this.currentJob.id} completed`)
      this.currentJob = null
    } else {
      console.log('No job to complete')
    }
  }

  isAvailable(): boolean {
    return this.currentJob === null
  }
}
