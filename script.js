let outerGrid = document.querySelector("#outerGrid");

let letters = ["a","b","c","d","e","f","g","h"];
let selectedPiece = "";

let activeColour = "-"
let halfmoveClockCount = "-";
let fullmoveClockCount = "-";

let startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

document.getElementById("startNewButton").addEventListener("click", () => {
    decodeFen(startingFen);
});
document.getElementById("saveButton").addEventListener("click", () => {
    console.log("saved")
});
document.getElementById("loadButton").addEventListener("click", () => {
    console.log("saved")
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

function decodeFen(fen) {//piecePlacement[0] activeColour[1] Castling[2] EnPassant[3] HalfmoveClock[4] FullmoveNumber[5]
    const fenArr = fen.split(" ");
    
    let piecePlacement = transformPieceArrayFen(fenArr[0]);
    let actCol = fenArr[1];
    let castlingRights = fenArr[2];
    let enPassantTarget = fenArr[3];
    let HalfmoveClock = fenArr[4];
    let fullmoveNum = fenArr[5];

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