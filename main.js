import { isCollusion } from "./validators";


const BOARD_SIZE = 10
export const SHIP_LENGTHS = [5, 4, 3, 3, 2];
export const SHIP_TYPES = ["CARRIER", "BATTLESHIP", "CRUISER", "SUBMARINE", "DESTROYER"]


export class Ship {
    constructor(type) {
        this.type = type
        this.length = SHIP_LENGTHS[type]
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

export class Gameboard {
    constructor() {
        this.tiles = 
            Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE));
        this.ships = []
        this.totalHits = 0
        this.shotRecords = [];
    }

    placeShip(coord, direction, type) {
        const length = SHIP_LENGTHS[type];

        if (this.ships.some(s => s.type === type)) {
            throw Error("This ship is already placed on the board")
        } else if (isCollusion(this, coord, direction, length)) {
            throw Error("This placement is causing collusion")
        } else if (direction !== 0 && direction !== 1) {
            throw Error("Invalid direction");
        }

        const ship = new Ship(type)
        this.ships.push(ship)
        if (direction === 0) {
            for (let i = 0; i < length; i++) {
                this.tiles[coord[0] + i][coord[1]] = ship;
            }
        } else if (direction === 1) {
            for (let i = 0; i < length; i++) {
                this.tiles[coord[0]][coord[1] + i] = ship;
            }
        }
        return ship
    }

    receiveAttack(coord) {
        if (this.tiles[coord[0]][coord[1]] !== undefined) {
            this.tiles[coord[0]][coord[1]].hit()
            this.shotRecords.push([coord, true]);
            return true;
        }
        this.shotRecords.push([coord, false]);
        return false;
    }

    isAllSunk() {
        for (const ship of this.ships) {
            if (ship.isSunk() === false) {
                return false;
            }
        }
        return true;
    }
}
