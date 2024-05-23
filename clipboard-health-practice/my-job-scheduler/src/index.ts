/*

You are tasked with designing a simplified background job scheduler system.
You need to create classes for Jobs, Workers, and the JobScheduler.

Job class:
Represents a job to be processed in the background.
Can have an associated payload containing data required for job processing.
Can be in 3 different states: "queued", "running", or "completed".

Worker class:
Represents a worker that can process a job.
Can be assigned a job to work on.
Provides a method to complete the assigned job, changing its status.

JobScheduler class:
Manages a collection of jobs and workers.
Allows adding new jobs and workers to the scheduler.
Distributes queued jobs to available workers.
Provides methods to retrieve queued, running, and completed jobs.
*/

import { Job } from './models/Job'
import { JobScheduler } from './services/JobScheduler'
import { Worker } from './workers/worker'

const job1 = new Job({ type: 'data_processing', file: 'data.txt' })
const job2 = new Job({ type: 'report_generation', format: 'pdf' })

const worker1 = new Worker()
const worker2 = new Worker()

const jobScheduler = new JobScheduler()

jobScheduler.addJob(job1)
jobScheduler.addJob(job2)

jobScheduler.addWorker(worker1)
jobScheduler.addWorker(worker2)

jobScheduler.assignJobs()

worker1.completeJob()

const queuedJobs = jobScheduler.getJobsByStatus('queued')
const runningJobs = jobScheduler.getJobsByStatus('running')
const completedJobs = jobScheduler.getJobsByStatus('completed')

console.log('Queued jobs:', queuedJobs)
console.log('Running jobs:', runningJobs)
console.log('Completed jobs:', completedJobs)
