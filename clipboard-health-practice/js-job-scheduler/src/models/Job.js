/*
 * Represents a job to be processed in the background.
 * Can have an associated payload containing data required for job processing.
 * Can be in 3 different states: "queued", "running", or "completed".
 */

export class Job {
  constructor(id, payload) {
    this.id = id || this.generateId()
    this.status = 'queued' // status can be 'queued' or 'running' or 'completed'
    this.payload = payload
  }

  generateId() {
    return `job-${Date.now()}`
  }
}
