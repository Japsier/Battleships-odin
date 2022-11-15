import "./style.css"

export const ship = (lengthShip) => {
    let length = lengthShip
    let hits = 0
    let hit = () => {
        hits++
    }
    let isSunk = () => (length - hits == 0) ? true : false

    return {isSunk, hit}
}

export const gameBoard = () => {

    let gameBoardArray = []
    const tile = (coordinates) => {
        let location = coordinates
        let hasShip = false
        let shipID = null
        let hasHit = false

        return {location, hasShip, shipID, hasHit}
    }
    for (let i = 0; i < 100; i++) {
        gameBoardArray.push(tile(i))
    }

    let placeShip = (coordinates, lengthShip) => {
        let check = coordinates + lengthShip
        let valid = false

        //check if ship fits on vertical line
        let temp1 = 0
        let temp2 = 10
        for(let i = 0; i < 10; i++) {
            if(temp1 < check && temp2 > check && temp1 < coordinates && temp2 > coordinates) {
                valid = true
            }
            temp1 = temp1 + 10
            temp2 = temp2 + 10
        }

        //checks if ship is not on top of other ship 
        for (let i = coordinates; i < check; i++) {
            if(gameBoardArray[i].hasShip) {
                valid = false
            }
        }

        if (!valid) {
            return "invalid"
        }

        //create ship and put in onto board
        let shipType = ship(lengthShip)
        for (let i = coordinates; i < check; i++) {
            gameBoardArray[i].hasShip = true
            gameBoardArray[i].shipID = shipType
        }
        return "succes"
        
    }
    const isWinner = () => {
        for(let i = 0; i < 100; i++) {
            if (gameBoardArray[i].hasShip) {
                if (!gameBoardArray[i].hasHit) {
                    return false
                }
            }
        }
        return true
    }
    const recieveAttack = (coordinates) => {
        if(gameBoardArray[coordinates].hasHit) {
            return "invalid"
        }
        gameBoardArray[coordinates].hasHit = true
        if (gameBoardArray[coordinates].hasShip == true) {
            gameBoardArray[coordinates].shipID.hit()
            return "hit"
        }
        return "missed"
    }

    return {placeShip, recieveAttack}
}


