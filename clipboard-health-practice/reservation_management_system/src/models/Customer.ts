import { Reservation } from './Reservation'

export class Customer {
  id: string
  name: string
  reservations: Reservation[]

  constructor(name: string) {
    this.id = this.generateId()
    this.name = name
    this.reservations = []
  }

  makeReservation(reservation: Reservation): void {
    this.reservations.push(reservation)
    reservation.confirm()
  }

  generateId() {
    return `cu-${Date.now()}`
  }
}
