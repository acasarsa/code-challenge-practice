export class DeliveryAgent {
  constructor(id) {
    this.id = id
    this.currentPackage = null
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
