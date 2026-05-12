let outerGrid = document.querySelector("#outerGrid");

let letters = ["a","b","c","d","e","f","g","h"];
let selectedPiece = "";
let gameState = [];

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


let startingPos = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"// w KQkq - 0 1;

decodeFen(startingPos);

function decodeFen(fen) {//piecePlacement[0] activeColour[1] Castling[2] EnPassant[3] HalfmoveClock[4] FullmoveNumber[5]
    const fenArr = fen.split(" ");

    
    let activeColour = fenArr[1];
    let castlingRights = fenArr[2];
    let enPassantTarget = fenArr[3];
    let HalfmoveClock = fenArr[4];
    let fullmoveNum = fenArr[5];
    
    let piecePlacement = fenArr[0];
    let rowArray = piecePlacement.split("/");

    for(let i = 8; i > 0; i--) {
        let curRow = rowArray[i-1].split("");

        for(let x = 0; x < 8; x++) {
            let cellCoord = `${letters[x]}${i}`;
            let curChar = curRow[x];
            // console.log(cellCoord)
            // console.log(curChar)

            if(isNaN(curChar) == false) {
                for(let i = 0; i < parseInt(curChar); i++ ) {

                }
            }

            


        }
    }
}

function sortRows(PiecePlacementArr) {
    
}

function addFenPiece(piece) {
    let pieceAssetDirectory = {
        "p" : "/img/pieces/black-pawn.png", "P" : "/img/pieces/white-rook.png",
        "r" : "/img/pieces/black-rook.png", "R" : "/img/pieces/white-rook.png",
        "b" : "/img/pieces/black-bishop.png", "B" : "/img/pieces/white-rook.png",
        "q" : "/img/pieces/black-queen.png", "Q" : "/img/pieces/white-rook.png",
        "k" : "/img/pieces/black-king.png", "K" : "/img/pieces/white-rook.png",
        "n" : "/img/pieces/black-knight.png", "N" : "/img/pieces/white-rook.png",
    }


}