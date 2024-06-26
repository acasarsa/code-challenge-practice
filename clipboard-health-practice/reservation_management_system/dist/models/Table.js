"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
class Table {
    constructor(number, capacity) {
        this.id = this.generateId();
        this.number = number;
        this.capacity = capacity;
        this.status = 'available';
    }
    generateId() {
        return `table-${Date.now()}`;
    }
    setStatus(newStatus) {
        this.status = newStatus;
    }
}
exports.Table = Table;
