

const grid = document.querySelector('#grid-container');
const root = document.querySelector(':root');
const button = document.querySelector('button');

button.addEventListener('click', inputGridSize);

function inputGridSize(e) {
    let input = prompt('input grid size');
    if (input) {
        input = Number(input);
        if (input) {
            deleteOldGrid();
            createGrid(input);
        }
        else {
            alert('invalid input : enter a number');
        }
    }
}

function createGrid(gridSize) {
    root.style = `--width:${100.0 / gridSize}%;--height:${100.0 / gridSize}%`;
    const blockCount = gridSize * gridSize;
    for (let i = 0; i < blockCount; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
    }
}
function deleteOldGrid() {
    if (grid.hasChildNodes()) {
        const blocks=document.querySelectorAll('#grid-container>div');
        blocks.forEach(node=>node.remove());
    }
    
}
