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

describe("Gameboard", () => {
    let gameboard;
    beforeEach(() => {
        gameboard = new Gameboard();
        gameboard.placeShip([5, 5], 0, 4)
    })

    describe("placing ships", () => {
        test("unsuccessful - trying to place a ship on an occupied square", () => {
            expect(() => gameboard.placeShip([6, 4], 1, 0)).toThrow(Error)
        })
        test("unsuccessful - trying to place a ship on an invalid coordinate", () => {
            expect(() => gameboard.placeShip([8, 4], 0, 0)).toThrow(Error)
        })
        test("unsuccessful - trying to place a ship more than its allowed", () => {
            expect(() => gameboard.placeShip([5, 7], 0, 4)).toThrow(Error);
        })
        test("unsuccessful - invalid direction", () => {
            expect(() => gameboard.placeShip([5, 7], 2, 0)).toThrow(Error);
        })
    })

})
