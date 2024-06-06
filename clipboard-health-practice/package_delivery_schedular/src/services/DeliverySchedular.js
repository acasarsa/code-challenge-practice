export class DeliveryScheduler {
  constructor(id) {
    this.id = id
    this.agents = []
    this.packages = []
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
