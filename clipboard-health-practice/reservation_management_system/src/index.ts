// Creating instances and making a reservation.
import { Customer } from './models/Customer'
import { Table } from './models/Table'
import { ReservationManager } from './services/ReservationManager'

const manager = new ReservationManager()
manager.addTable(new Table(1, 4))
manager.addTable(new Table(2, 2))

const customer = new Customer('John Doe')
const reservation = manager.createReservation(customer, '7:00 PM', 1, 4)

if (reservation) {
  console.log('Reservation confirmed for table', reservation.table.number)
  reservation.checkIn()
  console.log('Table status:', reservation.table.status) // Expected "occupied"
  reservation.checkOut()
  console.log('Table status:', reservation.table.status) // Expected "available"
} else {
  console.log('No available tables.')
}
