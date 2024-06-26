/*
 * Manages tables, reservations, and customers.
 * Handles the booking process, updating table statuses, and can pull reports on table usage.
 * Provides real-time updates on table availability and customer feedback.
 */

import { Customer } from '../models/Customer'
import { Reservation } from '../models/Reservation'
import { Table } from '../models/Table'

export class ReservationManager {
  private tables: Table[] = []
  private reservations: Reservation[] = []
  private customers: Customer[] = []

  addTable(table: Table) {
    this.tables.push(table)
  }

  createReservation(
    customer: Customer,
    resTime: string,
    tableNumber: number,
    guests: number
  ) {
    const table = this.tables.find(
      (t) => t.number === tableNumber && t.status === 'available'
    )
    if (table) {
      const res = new Reservation(resTime, guests, customer, table)
      this.reservations.push(res)
      customer.makeReservation(res)
      return res
    }
  }
}
