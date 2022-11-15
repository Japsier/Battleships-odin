//import "./style.css"

const ship = (lengthShip) => {
    let length = lengthShip
    let hits = 0
    let hit = () => {
        hits++
    }
    let isSunk = () => (length - hits == 0) ? true : false

    return {isSunk, hit}
}

const gameBoard = () => {

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

    return {placeShip, recieveAttack, isWinner, gameBoardArray}
}

const Player = (type, opponentGameBoard) => {
    let playerType = type
    let gameBoard = opponentGameBoard

    const turn = () => {

        let move = null
        if (playerType == "human") {
            move = prompt("coordinates")
        } else if (playerType == "computer") {
            move = Math.floor(Math.random() * 101)
            while(gameBoard.gameBoardArray[move].hasHit) {
                move = Math.floor(Math.random() * 101)
            }
        }
        return move    
    }
    return {turn}
}

const DOMController = (() => {

})()

function gameController () {
    const userGameBoard = gameBoard()
    const computerGameBoard = gameBoard()

    const user = Player("human", computerGameBoard)
    const computer = Player("computer", userGameBoard)

    const userDOMGameBoard = document.querySelector(".gameBoard1")
    const computerDOMGameBoard = document.querySelector(".gameBoard2")

    let userGameboardTiles = []
    let computerGameboardTiles = []

    function createGameBoard (board, boardArray) {
        for (let i = 0; i < 100; i++) {
            let tile = document.createElement("tile")
            tile.classList.add("tile")
            board.appendChild(tile)

            //push tile to array so we can find
            //the index and add listeners later on
            boardArray.push(tile)
        }
    }
    createGameBoard(userDOMGameBoard, userGameboardTiles)
    createGameBoard(computerDOMGameBoard, computerGameboardTiles)

    function placeComputerShips() {
        let shipLength = 5 
        let doubleThreeChecker = false
        let location;
        for (let i = 0; i < 5; i++) {
            let doubleChecker = false
            while(!doubleChecker) {
                let row = Math.floor(Math.random() * 10)
                let column = Math.floor(Math.random() * (10 - (shipLength - 1)))
                location = parseInt(`${row}${column}`)
                doubleChecker = true
                for(let j = location; j < (location + shipLength); j++) {
                    if(computerGameBoard.gameBoardArray[j].hasShip) {
                        doubleChecker = false
                    }
                }
                
            }
            console.log(location)
            computerGameBoard.placeShip(location, shipLength)
            if(!shipLength == 3 && doubleChecker == false) {
                doubleThreeChecker = true
            } else {
                shipLength--
            }

            
        }
        console.log(computerGameBoard.gameBoardArray)
    }
    let shipsPlaced = 0
    let length = 5
    let doubleThreeCheck = false
    function placeShip () {
        let hoveredTile;

        console.log("ships: " + shipsPlaced)
        userGameboardTiles.forEach(item => {
            item.addEventListener("mouseover", (e) => {
                userGameboardTiles.forEach(element => {
                    element.classList.remove("hovered")
                });
                //e.target.classList.add("hovered")
                hoveredTile = userGameboardTiles.indexOf(e.target)
                checkValidity(hoveredTile)
            })
            item.addEventListener("click", (e) => {
                console.log("hello")
                let clickedTile = userGameboardTiles.indexOf(e.target)
                if(checkValidity(clickedTile)) {
                    for(let i = clickedTile; i < (clickedTile + length); i++) {
                        userGameboardTiles[i].classList.add("selected")
                        
                    }
                    userGameBoard.placeShip(clickedTile, length)
                    shipsPlaced++
                    if (length == 3 && doubleThreeCheck == false) {
                        doubleThreeCheck = true
                    } else {
                        length--
                    }
                    if (length < 2) {
                        userGameboardTiles.forEach(element => {
                            element.replaceWith(element.cloneNode())
                        })
                    }
                }
            })   
        });
        function checkValidity (hoveredTile) {
            let coordinates = hoveredTile
            let check = coordinates + length
            let valid = false

            //check if ship fits on vertical line
            let temp1 = 0
            let temp2 = 10
            for(let i = 0; i < 10; i++) {
                if(temp1 < check && temp2 >= check && temp1 <= coordinates && temp2 > coordinates) {
                    valid = true
                }
                temp1 = temp1 + 10
                temp2 = temp2 + 10
            }

            //checks if ship is not on top of other ship 
            for (let i = coordinates; i < check; i++) {
                if (i >= 100) {
                    valid = false
                } else if(userGameBoard.gameBoardArray[i].hasShip) {
                    valid = false
                }
            }
            console.log(valid)
            if (!valid) {
                return false
            }
            userGameboardTiles.forEach(item => {
                item.classList.remove("hovered")
            })
            for (let i = coordinates; i < check; i++) {
                userGameboardTiles[i].classList.add("hovered")
            }
            return true

        }

    }
    placeComputerShips()
    placeShip(5)

}
gameController()


