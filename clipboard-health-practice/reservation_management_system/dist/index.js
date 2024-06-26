"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Creating instances and making a reservation.
const Customer_1 = require("./models/Customer");
const Table_1 = require("./models/Table");
const ReservationManager_1 = require("./services/ReservationManager");
const manager = new ReservationManager_1.ReservationManager();
manager.addTable(new Table_1.Table(1, 4));
manager.addTable(new Table_1.Table(2, 2));
const customer = new Customer_1.Customer('John Doe');
const reservation = manager.createReservation(customer, '7:00 PM', 1, 4);
if (reservation) {
    console.log('Reservation confirmed for table', reservation.table.number);
    reservation.checkIn();
    console.log('Table status:', reservation.table.status); // Expected "occupied"
    reservation.checkOut();
    console.log('Table status:', reservation.table.status); // Expected "available"
}
else {
    console.log('No available tables.');
}
