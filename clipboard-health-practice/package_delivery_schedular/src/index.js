// import { Package } from './models/package.js'
// import { DeliveryScheduler } from './services/DeliverySchedular.js'
// import { DeliveryAgent } from './workers/deliveryAgent.js'
export class Package {
  constructor({ destination, size, weight }) {
    this.id = this.generateId()
    this.destination = destination
    this.size = size
    this.weight = weight
    this.status = 'waiting'
  }

  generateId() {
    return `pkg-${Date.now()}`
  }
}

export class DeliveryScheduler {
  constructor() {
    this.id = this.generateId()
    this.agents = []
    this.packages = []
  }

  generateId() {
    return `worker-${Math.random().toString(36).substr(2, 9)}`
  }

  addPackage(currentPackage) {
    this.packages.push(currentPackage)
    this.assignPackages()
  }

  addAgent(agent) {
    this.agents.push(agent)
    this.assignPackages()
  }

  assignPackages() {
    // updates the arrays
    const availableAgents = this.agents.filter((agent) => agent.isAvailable())
    const waitingPackages = this.packages.filter(
      (currentPackage) => currentPackage.status === 'waiting'
    )

    waitingPackages.forEach((currentPackage) => {
      const agent = availableAgents.shift()
      if (agent) {
        agent.putPackageInTransit(currentPackage)
      }
    })
  }

  getPackagesByStatus(status) {
    console.log(this.packages)
    return this.packages.filter(
      (currentPackage) => currentPackage.status === status
    )
  }
}

export class DeliveryAgent {
  constructor() {
    this.id = this.generateId()
    this.currentPackage = null
  }

  generateId() {
    return `da-${Math.random().toString(36).substr(2, 9)}`
  }

  putPackageInTransit(currentPackage) {
    // updates status
    this.currentPackage = currentPackage
    currentPackage.status = 'in transit'
  }

  updateDeliveryStatus(status) {
    this.currentPackage.status = status
  }

  deliverPackage() {
    if (this.currentPackage) {
      this.currentPackage.status = 'delivered'
      this.currentPackage = null
    } else {
      console.log('No delivery agents available.')
    }
  }

  isAvailable() {
    return this.currentPackage === null
  }
}

const package1 = new Package({
  destination: '123 Maple St',
  size: 'medium',
  weight: '10kg',
})
const package2 = new Package({
  destination: '456 Oak St',
  size: 'small',
  weight: '5kg',
})

const agent1 = new DeliveryAgent()
const agent2 = new DeliveryAgent()

const scheduler = new DeliveryScheduler()

scheduler.addPackage(package1)
scheduler.addPackage(package2)

scheduler.addAgent(agent1)
scheduler.addAgent(agent2)

scheduler.assignPackages() // Automatically assigns packages to available agents

// agent1.updateDeliveryStatus('in transit')
agent2.deliverPackage('in transit')

const waitingPackages = scheduler.getPackagesByStatus('waiting')
const transitPackages = scheduler.getPackagesByStatus('in transit')
const deliveredPackages = scheduler.getPackagesByStatus('delivered')

console.log('Waiting packages:', waitingPackages)
console.log('In transit packages:', transitPackages)
console.log('Delivered packages:', deliveredPackages)
