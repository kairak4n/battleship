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
        expect(ship.isSunk()).toStrictEqual(false)
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
    let ship1;
    beforeEach(() => {
        gameboard = new Gameboard();
        ship1 = gameboard.placeShip([5, 5], 0, 4)
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

    describe("receiving attacks", () => {
        test("successful - shot missed", () => {
            expect(gameboard.receiveAttack([0,0])).toStrictEqual(false);
        })
        test("successful - shot hit", () => {
            expect(gameboard.receiveAttack([6,5])).toStrictEqual(true);
        })
        test("succesful - after getting hit as many times as its length, ship is sunk", () => {
            gameboard.receiveAttack([5,5])
            gameboard.receiveAttack([6,5])
            expect(ship1.isSunk()).toStrictEqual(true);
        })
    })

    describe("reporting if all ships have sunk", () => {
        beforeEach(() => {
            gameboard.placeShip([5, 6], 0, 3);
        })
        test("successful - not all ships are sunk", () => {
            gameboard.receiveAttack([5,5]) 
            expect(gameboard.isAllSunk()).toStrictEqual(false);
        })
        test("successful - all ships are sunk", () => {
            gameboard.receiveAttack([5,5]) 
            gameboard.receiveAttack([6,5]) 
            gameboard.receiveAttack([5,6]) 
            gameboard.receiveAttack([6,6]) 
            gameboard.receiveAttack([7,6]) 
            expect(gameboard.isAllSunk()).toStrictEqual(true);
        })
    })
})
