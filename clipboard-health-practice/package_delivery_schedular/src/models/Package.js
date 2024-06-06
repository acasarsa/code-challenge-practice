export class Package {
  constructor(id, destination, size, weight) {
    this.id = id // for now i'll just pass the id. in a real app this would be linked to a db.
    this.destination = destination
    this.size = size
    this.weight = weight
    this.status = 'waiting'
  }
}
