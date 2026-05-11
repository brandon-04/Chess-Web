let outerGrid = document.querySelector("#outerGrid");

let letters = ["","a","b","c","d","e","f","g","h"];
let boardCells = [];

let startPos = {
    "a1": "white-rook", "a2": "white-pawn", "a7": "black-pawn", "a8": "black-rook",
    "b1": "white-knight", "b2": "white-pawn", "b7": "black-pawn", "b8": "black-knight",
    "c1": "white-bishop", "c2": "white-pawn", "c7": "black-pawn", "c8": "black-bishop",
    "d1": "white-queen", "d2": "white-pawn", "d7": "black-pawn", "d8": "black-queen",
    "e1": "white-king", "e2": "white-pawn", "e7": "black-pawn", "e8": "black-king",
    "f1": "white-bishop", "f2": "white-pawn", "f7": "black-pawn", "f8": "black-bishop",
    "g1": "white-knight", "g2": "white-pawn", "g7": "black-pawn", "g8": "black-knight",
    "h1": "white-rook", "h2": "white-pawn", "h7": "black-pawn", "h8": "black-rook"
}

startingBoardSetUp();
















function startingBoardSetUp() {
    gridGeneration();
    placePieces();
}

function gridGeneration() {
    for(let i = 8; i > 0; i--) {
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        outerGrid.appendChild(row);
    
        for(let x = 1; x < 9; x++) {
            let cellCoord = `${letters[x]}${i}`;
    
            let cell = document.createElement("div");
            
            cell.setAttribute("id", cellCoord);

            cell.style.backgroundImage = `url('/img/pieces/${startPos[cellCoord]}.png')`
            
            boardCells.push(cell);
            
            if(i % 2 == 0 && x % 2 == 0) {
                cell.setAttribute("class", "cellColoured");
            }
            else if (i % 2 != 0 && x % 2 != 0){
                cell.setAttribute("class", "cellColoured");
            }
            else {
                cell.setAttribute("class", "cell");
            }
        
            row.appendChild(cell);
        }
    }
}
