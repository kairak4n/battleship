import { Ship, Gameboard } from "./main"

describe("Ship", () => {
    let ship;
    const length = 3
    beforeEach(() => {
        ship = new Ship(length)
    })

    test("Ship is initiated without any hits and with given length", () => {
        expect(ship.hitTimes).toBe(0)
        expect(ship.length).toBe(length)
    })

    test("Ship gets hit once", () => {
        ship.hit()
        expect(ship.hitTimes).toBe(1)
    })

    test("Ship is sunk when it gets hit as many times as its length", () => {
        for (let i = 0; i < length; i++) {
            ship.hit();
        }
        expect(ship.isSunk()).toStrictEqual(true)
    })
})

