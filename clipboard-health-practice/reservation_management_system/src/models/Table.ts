export class Table {
  id: string
  number: number
  capacity: number
  status: 'available' | 'reserved' | 'occupied'

  constructor(number: number, capacity: number) {
    this.id = this.generateId()
    this.number = number
    this.capacity = capacity
    this.status = 'available'
  }

  generateId() {
    return `table-${Date.now()}`
  }

  setStatus(newStatus: 'available' | 'reserved' | 'occupied'): void {
    this.status = newStatus
  }
}
