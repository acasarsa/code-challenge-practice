/*
 * Represents a reservation made by a customer.
 * Contains details such as the
 * reservation time,
 * number of guests, and
 * associated customer and
 * table.
 */
import { Customer } from './Customer'
import { Table } from './Table'
// type ReservationTime = Date

export class Reservation {
  id: string
  time: string
  guests: number
  customer: Customer
  table: Table

  constructor(time: string, guests: number, customer: Customer, table: Table) {
    this.id = this.generateId()
    this.time = time
    this.guests = guests
    this.customer = customer
    this.table = table
  }

  private generateId() {
    return `res-${Date.now()}`
  }

  confirm(): void {
    this.table.setStatus('reserved')
  }

  checkIn(): void {
    this.table.setStatus('occupied')
  }

  checkOut(): void {
    this.table.setStatus('available')
  }
}
