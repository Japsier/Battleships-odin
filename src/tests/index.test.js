import * as myObj from "../index"


test("ship sunk after enough hits", () => {
    let hits = 4
    let testShip = myObj.ship(4)
    for(let i = 0; i < hits; i++) {
     testShip.hit()   
    }
    expect(testShip.isSunk()).toBe(true)
})

test("ship placement", () => {
    let board = myObj.gameBoard()
    expect(board.placeShip(26, 3)).toBe("succes")
})
test("attack hit", () => {
    let board = myObj.gameBoard()
    board.placeShip(26, 3)
    expect(board.recieveAttack(28)).toBe("hit")
})
test("attack miss", () => {
    let board = myObj.gameBoard()
    board.placeShip(26, 3)
    board.placeShip(41, 4)
    expect(board.recieveAttack(32)).toBe("missed")
})
test("attack invalid", () => {
    let board = myObj.gameBoard()
    board.placeShip(26, 3)
    board.placeShip(41, 4)
    board.recieveAttack(32)
    expect(board.recieveAttack(32)).toBe("invalid")
})