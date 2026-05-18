let outerGrid = document.querySelector("#outerGrid");
let movesList = document.querySelector("#mainMoveContent");

let startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
let letters = ["a","b","c","d","e","f","g","h"];

let blackPieces = ["r","n","b","q","k","p"];
let whitePieces = ["R","N","B","Q","K","P"];

let activeColour = "-"
let halfmoveClockCount = 0;
let fullmoveClockCount = 1;

let selectedCoord = "";
let selectedCoordColor = "";

let isPieceSelected = false;

let gameState = {};//populated by gridGeneration();
let moves = [];

boardSetup();

//start of fen decoder functions
function decodeFen(fen) {//piecePlacement[0] activeColour[1] Castling[2] EnPassant[3] HalfmoveClock[4] FullmoveNumber[5]
    const fenArr = fen.split(" ");
    
    let piecePlacement = transformPieceArrayFen(fenArr[0]);
    let actCol = fenArr[1];
    let castlingRights = fenArr[2];
    let enPassantTarget = fenArr[3];
    let HalfmoveClock = fenArr[4];
    let fullmoveNum = fenArr[5];

    updateFenGameState(piecePlacement);
    updateActiveColour(actCol);
    updateHalfMoveClock(HalfmoveClock);
    updateFullMoves(fullmoveNum);

    clearMoveNotation();
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
    activeColourText.innerHTML = `active colour: ${activeColour == "w" ? "white" : "black"}`;
}

function updateHalfMoveClock(newVal) {
    let clock = document.getElementById("halfmoveClock");
    clock.innerHTML = `half move clock: ${newVal}`

    halfmoveClockCount = parseInt(newVal);
}

function updateFullMoves(newVal) {
    let clock = document.getElementById("fullmoveCounter");
    clock.innerHTML = `full moves: ${Math.round(newVal)}`;
    fullmoveClockCount = parseInt(newVal);
}

function updateFenGameState(piecePlacementArray) {
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
                gameState[cellCoord] = "1";
                cell.style.backgroundImage = "";
                continue;
            }
            else {
                gameState[cellCoord] = curChar;
                cell.style.backgroundImage = `url('img/pieces/${curChar}.png')`;
            }
        }
    }
}

//start of piece moving functions
function updateSelectedCoord(cellCoord) {
    let cell = document.getElementById(cellCoord);

    if(selectedCoord == cellCoord) {
        clearSelectedPiece(cell);
    }
    else if(!isPieceSelected) {
        highlightSelectedPiece(cell,cellCoord);
    }
    else {
        let startingCell = document.getElementById(selectedCoord);

        movePieces(selectedCoord, cellCoord);
        clearSelectedPiece(startingCell);
    }
}

function clearSelectedPiece(cellDomObject) {
    isPieceSelected = false;
    selectedCoord = "";
    cellDomObject.style.backgroundColor = "";
}

function highlightSelectedPiece(cellDomObject,cellCoord) {
    selectedCoord = cellCoord;
    isPieceSelected = true;
    cellDomObject.style.backgroundColor = "lightpink";

}

function movePieces(startingCoord, targetCoord) {
    let startPiece = gameState[startingCoord];
    let targetPiece = gameState[targetCoord];

    let startCell = document.getElementById(startingCoord);
    let targetCell = document.getElementById(targetCoord);

    let startPieceColor = getPieceColor(startingCoord);
    let targetPieceColor = getPieceColor(targetCoord);

    let isCapture = targetPiece != "1" ? true : false;

    if(startPiece == "p" || startPiece == "P" || targetPiece != "1") {
        updateHalfMoveClock(0)
    }
    else {
        updateHalfMoveClock(halfmoveClockCount + 1)
    }
    
    if(startPieceColor != targetPieceColor && startPieceColor == activeColour) {
        handleMoveValidation(startingCoord, targetCoord)
        
        gameState[startingCoord] = "1";
        gameState[targetCoord] = startPiece;

        startCell.style.backgroundImage = "";
        targetCell.style.backgroundImage = `url('img/pieces/${startPiece}.png')`;

        updateFullMoves(activeColour == "b"? fullmoveClockCount + 1 : fullmoveClockCount);
        updateActiveColour(activeColour == "w" ? "b" : "w");
    }
}

function createMoveNotation(startingCoord, targetCoord, isCapture) {
    let gamePiece = gameState[startingCoord];

    let curObj = document.createElement("h1");
    curObj.setAttribute("class", "moveText"); 
    curObj.textContent = `${isCapture == true ? "x" : ""}${targetCoord}`;

    let curImg = document.createElement("div");
    curImg.setAttribute("class", "figurine");
    curImg.style.backgroundImage = `url('img/pieces/${gamePiece}.png')`;

    curObj.appendChild(curImg);
    movesList.appendChild(curObj);
}

//utility functions
function boardSetup() {//generates coloured and non coloured cells for board, and event listeners for buttons.
    for(let i = 8; i > 0; i--) {
        let row = document.createElement("div");
        row.setAttribute("class", "row");

        outerGrid.appendChild(row);
        
        for(let x = 0; x < 8; x++) {
            let cellCoord = `${letters[x]}${i}`;
            let cell = document.createElement("div");
            
            gameState[cellCoord] = "1";
            
            cell.setAttribute("id", cellCoord)
            cell.setAttribute("class", (i % 2 != 0 && x % 2 == 0)||(i % 2 == 0 && x % 2 != 0) ? "cellColoured" : "cell");

            cell.addEventListener("click", () => {
                updateSelectedCoord(cellCoord);
            })
            
            row.appendChild(cell);
        }
    }
    
    document.getElementById("startNewButton").addEventListener("click", () => {
        decodeFen(startingFen);
    });
    document.getElementById("saveButton").addEventListener("click", () => {
    
    });
    document.getElementById("loadButton").addEventListener("click", () => {
        console.log("loaded")
    });

    decodeFen(startingFen)
}

function getPieceColor(coord) {
    if(blackPieces.includes(gameState[coord])) {
        return "b";
    }
    else if(whitePieces.includes(gameState[coord])) {
        return "w";
    }
    else {
        return "1";
    }
}

function handleMoveValidation(startingCoord, targetCoord) {
    let targetPiece = gameState[targetCoord];
    let isCapture = targetPiece != "1" ? true : false;

    checkMoveIsValid(startingCoord, targetCoord);
    checkMoveIsBlocked(startingCoord, targetCoord);

    if(checkMoveIsValid() && checkMoveIsBlocked()) {
        console.log("piece moved!")
    }
    createMoveNotation(startingCoord, targetCoord, isCapture);
}

function checkMoveIsBlocked(startingCoord, targetCoord) {
    let startingFile = letters.indexOf(startingCoord[0]);
    let startingY = parseInt(startingCoord[1]);

    let targetFile = letters.indexOf(targetCoord[0]);
    let targetY = parseInt(targetCoord[1]);

    let diffY = Math.max(startingY, targetY) - Math.min(startingY, targetY);

    let arr = [];
    const allEqual = arr => arr.every(val => val === arr[0]);

    if(startingFile == targetFile) {//for same file
        for(let i = Math.min(startingY,targetY) + 1; i <= Math.max(startingY,targetY) - 1; i++) {
            arr.push(gameState[`${letters[startingFile]}${i}`]);
        }
        console.log(allEqual(arr) == true ? "not blocked" : "blocked");
    }
    else if(startingY == targetY) {//for same row
        for(let i = Math.min(startingFile, targetFile) + 1; i <= Math.max(startingFile, targetFile) - 1; i++) {
            arr.push(gameState[`${letters[i]}${startingY}`]);
        }
        console.log(allEqual(arr) == true ? "not blocked" : "blocked"); 
    }
    else if(startingFile < targetFile && startingY < targetY) {//top right diag
        for(let i = 1; i < diffY; i ++) {
            let checkFile = letters[startingFile + i];
            let checkY = startingY + i;

            if(checkFile == "h" || checkY == 8){
                break;
            }

            arr.push(gameState[`${checkFile}${checkY}`]);
            console.log(gameState[`${checkFile}${checkY}`])
        }
        console.log(allEqual(arr) == true ? "not blocked" : "blocked");
    }
    else if(startingFile > targetFile && startingY < targetY) {//top left diag
        for(let i = 1; i < diffY; i ++) {
            let checkFile = letters[startingFile - i];
            let checkY = startingY + i;

            if(checkFile == "h" || checkY == 8){
                break;
            }

            arr.push(gameState[`${checkFile}${checkY}`]);
            console.log(gameState[`${checkFile}${checkY}`])
        }
        console.log(allEqual(arr) == true ? "not blocked" : "blocked");
    }
    else if(startingFile > targetFile && startingY > targetY) {//bottom left diag
        for(let i = 1; i < diffY; i ++) {
            let checkFile = letters[startingFile - i];
            let checkY = startingY - i;

            if(checkFile == "h" || checkY == 8){
                break;
            }

            arr.push(gameState[`${checkFile}${checkY}`]);
            console.log(gameState[`${checkFile}${checkY}`])
        }
        console.log(allEqual(arr) == true ? "not blocked" : "blocked");
    }
    else if(startingFile < targetFile && startingY > targetY) {//bottom right diag
        for(let i = 1; i < diffY; i ++) {
            let checkFile = letters[startingFile + i];
            let checkY = startingY - i;

            if(checkFile == "h" || checkY == 8){
                break;
            }

            arr.push(gameState[`${checkFile}${checkY}`]);
            console.log(gameState[`${checkFile}${checkY}`])
        }
        console.log(allEqual(arr) == true ? "not blocked" : "blocked");
    }
}

function checkMoveIsValid(startingCoord, targetCoord) {
    let startingPiece = gameState[startingCoord];
    let targetPiece = gameState[targetCoord];

    let isCapture = targetPiece != "1" ? true : false;

    let color = getPieceColor(startingCoord, targetCoord);

    let startingFile = letters.indexOf(startingCoord[0])
    let startingY = startingCoord[1];

    let targetFile = letters.indexOf(targetCoord[0])
    let targetY = targetCoord[1];

    let diffY = startingY - targetY;
    let diffX = startingFile - targetFile;

    let PMaxMoves = startingY == 2 ? -3 : -2;
    let pMaxMoves = startingY == 7 ? 3 : 2;

    if(startingPiece == "P" && startingFile == targetFile && diffY > PMaxMoves) {//white pawn validation
        return true;
    }
    else if (startingPiece == "p" && startingFile == targetFile && diffY < pMaxMoves) {//black pawn validation
        return true;
    }
    else if((startingPiece == "r" || startingPiece == "R") && (startingFile == targetFile || startingY == targetY)) {//rook validation
        return true
    }
    else if(startingPiece == "b" || startingPiece == "B") {//bishop validation

    }
    else if(startingPiece == "q" || startingPiece == "Q") {

    }
}

function genDiagArray(startingCoord, direction) {
    let startingFile = letters.indexOf(startingCoord[0]);
    let startingY = parseInt(startingCoord[1]);

    let targetFile = letters.indexOf(targetCoord[0]);
    let targetY = parseInt(targetCoord[1]);

    let diffY = Math.max(startingY, targetY) - Math.min(startingY, targetY);

    let arr = [];
    const allEqual = arr => arr.every(val => val === arr[0]);

    if(startingFile < targetFile && startingY < targetY) {//top right diag
        for(let i = 1; i < diffY; i ++) {
            let checkFile = letters[startingFile + i];
            let checkY = startingY + i;

            if(checkFile == "h" || checkY == 8){
                break;
            }

            arr.push(gameState[`${checkFile}${checkY}`]);
            console.log(gameState[`${checkFile}${checkY}`])
        }
        console.log(allEqual(arr) == true ? "not blocked" : "blocked");
    }
    else if(startingFile > targetFile && startingY < targetY) {//top left diag
        for(let i = 1; i < diffY; i ++) {
            let checkFile = letters[startingFile - i];
            let checkY = startingY + i;

            if(checkFile == "h" || checkY == 8){
                break;
            }

            arr.push(gameState[`${checkFile}${checkY}`]);
            console.log(gameState[`${checkFile}${checkY}`])
        }
        console.log(allEqual(arr) == true ? "not blocked" : "blocked");
    }
    else if(startingFile > targetFile && startingY > targetY) {//bottom left diag
        for(let i = 1; i < diffY; i ++) {
            let checkFile = letters[startingFile - i];
            let checkY = startingY - i;

            if(checkFile == "h" || checkY == 8){
                break;
            }

            arr.push(gameState[`${checkFile}${checkY}`]);
            console.log(gameState[`${checkFile}${checkY}`])
        }
        console.log(allEqual(arr) == true ? "not blocked" : "blocked");
    }
    else if(startingFile < targetFile && startingY > targetY) {//bottom right diag
        for(let i = 1; i < diffY; i ++) {
            let checkFile = letters[startingFile + i];
            let checkY = startingY - i;

            if(checkFile == "h" || checkY == 8){
                break;
            }

            arr.push(gameState[`${checkFile}${checkY}`]);
            console.log(gameState[`${checkFile}${checkY}`])
        }
        console.log(allEqual(arr) == true ? "not blocked" : "blocked");
    }
}

function clearMoveNotation() {
    movesList.innerHTML = "";
}


//features to add
//move validation
//check if move is blocked
//adding move to move list 
//enforce 50 move rule -> draw
//threefold repetition
//check and check mate
//stale mate
//en passant
//sufficient material
//win, lose and draw screens
//saving and loading games -> fen encoder and local storage save
//||