"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
class Customer {
    constructor(name) {
        this.id = this.generateId();
        this.name = name;
        this.reservations = [];
    }
    makeReservation(reservation) {
        this.reservations.push(reservation);
        reservation.confirm();
    }
    generateId() {
        return `cu-${Date.now()}`;
    }
}
exports.Customer = Customer;
