interface JobOptions {
  [key: string]: any // this is how you'd define that the options is some object
}

export class Job {
  id: string
  status: 'queued' | 'running' | 'completed'
  payload: JobOptions

  constructor(payload: JobOptions, id?: string) {
    this.id = id || this.generateId()
    this.status = 'queued'
    this.payload = payload
  }

  private generateId(): string {
    return `job-${Date.now()}`
  }
}
