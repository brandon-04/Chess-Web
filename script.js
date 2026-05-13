let outerGrid = document.querySelector("#outerGrid");

let startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
let letters = ["a","b","c","d","e","f","g","h"];
let pieces = ["p","P","r","R","n","N","b","B","k","K","q","Q"];
let selectedPiece = "";

let activeColour = "-"
let halfmoveClockCount = "-";
let fullmoveClockCount = "-";

let gameState = {};

document.getElementById("startNewButton").addEventListener("click", () => {
    decodeFen(startingFen);
});
document.getElementById("saveButton").addEventListener("click", () => {
});
document.getElementById("loadButton").addEventListener("click", () => {
    console.log("loaded")
});

startingBoardSetUp();

function startingBoardSetUp() {
    gridGeneration();
}

function gridGeneration() {
    for(let i = 8; i > 0; i--) {
        let row = document.createElement("div");
        row.setAttribute("class", "row");

        outerGrid.appendChild(row);
    
        for(let x = 0; x < 8; x++) {
            let cellCoord = `${letters[x]}${i}`;
            let cell = document.createElement("div");

            gameState[`${letters[x]}${i}`] = "1";
            
            cell.setAttribute("id", cellCoord)
            cell.setAttribute("class", (i % 2 != 0 && x % 2 == 0)||(i % 2 == 0 && x % 2 != 0) ? "cellColoured" : "cell");

            cell.addEventListener("click", () => { updateSelectedPiece(cellCoord) });
        
            row.appendChild(cell);
        }
    }
}

function updateSelectedPiece(cellCoord) {
    let cell = document.querySelector(`#${cellCoord}`);

    if(cellCoord == selectedPiece) {
        cell.style.backgroundColor = "";
        selectedPiece = ""
    }
    else if (selectedPiece == "") {
        cell.style.backgroundColor = "lightpink"
        selectedPiece = cellCoord;
    }
}
//start of fen decoder functions
function decodeFen(fen) {//piecePlacement[0] activeColour[1] Castling[2] EnPassant[3] HalfmoveClock[4] FullmoveNumber[5]
    const fenArr = fen.split(" ");
    
    let piecePlacement = transformPieceArrayFen(fenArr[0]);
    let actCol = fenArr[1];
    let castlingRights = fenArr[2];
    let enPassantTarget = fenArr[3];
    let HalfmoveClock = fenArr[4];
    let fullmoveNum = fenArr[5];

    updateGameState(piecePlacement);
    updateActiveColour(actCol);
    updateHalfMoveClock(HalfmoveClock);
    updateFullMoves(fullmoveNum);
}

function transformPieceArrayFen(piecePlacementArray) {
    let indRows = piecePlacementArray.split("/");
    let piecePlacementNewArray = [];
    
    indRows.forEach(element => {
        let row = element.split("");transformPieceArrayFen
        let newRow = [];
        
        row.forEach(char => {
            let num = parseInt(char);
            if(isNaN(num) == false) {
                for(let i = 0; i < num; i++) { newRow.push("1") }
            }
            else {
                newRow.push(char);
            }
        });
        piecePlacementNewArray.push(newRow);
    });
    return piecePlacementNewArray;
}

function updateActiveColour(newColour) {
    let activeColourText = document.getElementById("activeColourCounter")
    activeColour = newColour;
    activeColourText.innerHTML = `Active Colour: ${activeColour == "w" ? "White" : "Black"}`;
}

function updateHalfMoveClock(newVal) {
    let clock = document.getElementById("halfmoveClock");
    clock.innerHTML = `Halfmove Clock: ${newVal}`

    halfmoveClockCount = parseInt(newVal);
}

function updateFullMoves(newVal) {
    let clock = document.getElementById("fullmoveCounter");
    clock.innerHTML = `Fullmove Clock: ${newVal}`;
    fullmoveClockCount = parseInt(newVal);
}

function updateGameState(piecePlacementArray) {
    let newArr = piecePlacementArray.reverse();

    for(let i = 8; i > 0; i--) {
        let curRow = newArr[i-1];
        let rowInd = i;
        
        for(let x = 0; x < 8; x++) {
            let letter = letters[x]
            let cellCoord = `${letter}${rowInd}`;
            let cell = document.querySelector(`#${cellCoord}`)
            let curChar = curRow[x]

            if(curChar == "1") {
                gameState[`${letter}${rowInd}`] = "1";
                continue;
            }
            else {
                gameState[`${letter}${rowInd}`] = curChar;
                cell.style.backgroundImage = `url('/img/pieces/${curChar}.png')`
            }
        }
    }
    console.log(gameState)
}
//end of fen decoder functions

//start of piece moving functions

//end of piece moving functions


//piece movements
//values = x()0()

//pawn : if not moved yet -> x()0(+1 or +2) // only forwards by one or two squares.
//rook : x(+ or - infinitely until blocked)0() or x()0(+ or - infinitely until blocked) -> only straight lines
//knight : 
