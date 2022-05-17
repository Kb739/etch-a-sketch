
const colorGrid = document.querySelector('#colorBox');
const grid = document.querySelector('#grid-container');
const root = document.querySelector(':root');
const sizeButton = document.querySelector('#sizeButton');
const alphaButton = document.querySelector('#palette>button');

let colorPick = [0, 0, 0];
let alpha = 1;
generatePalette(3);


let mouseDown = 0;
window.onmousedown = ((e) => {
    mouseDown = 1;
    //if clicked on grid block then fill it
    if (e.target.classList.contains('square'))
        shade(e);
});
window.onmouseup = (() => mouseDown = 0);

sizeButton.addEventListener('click', inputGridSize);
alphaButton.addEventListener('click', inputAlpha);

function inputGridSize(e) {
    let input = prompt('input grid size');
    if (input) {
        input = Number(input);
        if (input) {
            deleteOldGrid();
            createGrid(input);
        }
        else {
            alert('invalid input');
        }
    }
}
function inputAlpha(e) {
    let input = prompt('enter alpha value (0-1)');

    if (input) {
        input = Number(input);
        console.log(input);
        if (input != NaN)
            alpha = input;
        else
            alert('invalid input');
    }
}

function generatePalette(size) {
    root.style.setProperty('--p-width', `${100 / size}%`);
    root.style.setProperty('--p-height', `${100 / size}%`);
    const blockCount = size * size;
    for (let i = 0; i < blockCount; i++) {
        const block = document.createElement('div');
        block.style.backgroundColor = i < blockCount - 1 ? genreateRandomColor() : 'rgb(0,0,0)';
        block.onclick = (e => colorPick = rgbToArray(e.target.style.backgroundColor));
        block.classList.add('color-square');
        colorGrid.appendChild(block);
    }
}

function createGrid(gridSize) {
    root.style.setProperty('--width', `${100 / gridSize}%`);
    root.style.setProperty('--height', `${100 / gridSize}%`);
    const blockCount = gridSize * gridSize;
    for (let i = 0; i < blockCount; i++) {
        const square = document.createElement('div');

        square.style.backgroundColor = 'rgb(255,255,255)';
        square.onmouseover = (e => mouseDown && shade(e));

        square.classList.add('square');
        grid.appendChild(square);
    }
}

function deleteOldGrid() {
    if (grid.hasChildNodes()) {
        const blocks = document.querySelectorAll('#grid-container>div');
        blocks.forEach(node => node.remove());
    }

}

function shade(event) {

    let blockColor = rgbToArray(event.target.style.backgroundColor);
    console.log(blockColor);
    for (let i = 0; i < 3; i++) {
        blockColor[i] = lerp(colorPick[i], blockColor[i], alpha);
    }
    event.target.style.backgroundColor = 'rgb(' + blockColor.toString() + ')';
}

function rgbToArray(color) {
    return color.slice(color.indexOf('(') + 1, color.indexOf(')')).split(',');
}

function lerp(a, b, alpha) {
    return Math.floor((b - b * alpha) + (a * alpha));
}
function genreateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

