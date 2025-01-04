const BOARD_SIZE = 10

export class Ship {
    constructor(length) {
        this.length = length
        this.hitTimes = 0
        this.sunk = false
    }

    hit() {
        this.hitTimes++
    }

    isSunk() {
        return this.hitTimes === this.length
    }
}

