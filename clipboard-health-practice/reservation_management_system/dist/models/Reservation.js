"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
// type ReservationTime = Date
class Reservation {
    constructor(time, guests, customer, table) {
        this.id = this.generateId();
        this.time = time;
        this.guests = guests;
        this.customer = customer;
        this.table = table;
    }
    generateId() {
        return `res-${Date.now()}`;
    }
    confirm() {
        this.table.setStatus('reserved');
    }
    checkIn() {
        this.table.setStatus('occupied');
    }
    checkOut() {
        this.table.setStatus('available');
    }
}
exports.Reservation = Reservation;
