let outerGrid = document.querySelector("#outerGrid");

let letters = ["A","B","C","D","E","F","G","H"]

for(let i = 0; i < 8; i++) {
    let rowNum = i;
    let row = document.createElement("div");
    row.setAttribute("class", "row");

    outerGrid.appendChild("row");

    for(let x = 0; x < 8; x++) {
        let colLetter = letters[x];
        let cellCoord = `${colLetter}${rowNum}`;

        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("id", cellCoord);

        cell.addEventListener(() => {

        });

        row.appendChild("cell");
    }
}