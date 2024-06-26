"use strict";
/*
 * Manages tables, reservations, and customers.
 * Handles the booking process, updating table statuses, and can pull reports on table usage.
 * Provides real-time updates on table availability and customer feedback.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationManager = void 0;
const Reservation_1 = require("../models/Reservation");
class ReservationManager {
    constructor() {
        this.tables = [];
        this.reservations = [];
        this.customers = [];
    }
    addTable(table) {
        this.tables.push(table);
    }
    createReservation(customer, resTime, tableNumber, guests) {
        const table = this.tables.find((t) => t.number === tableNumber && t.status === 'available');
        if (table) {
            const res = new Reservation_1.Reservation(resTime, guests, customer, table);
            this.reservations.push(res);
            customer.makeReservation(res);
            return res;
        }
    }
}
exports.ReservationManager = ReservationManager;
