

const grid = document.querySelector('#grid-container');
const root = document.querySelector(':root');
const button = document.querySelector('button');

let colorPick = [0, 0, 0];
const alpha = 0.25;

button.addEventListener('click', inputGridSize);

let mouseDown = 0;
window.onmousedown = ((e) => {
    mouseDown = 1;
    //if clicked on grid block then fill it
    if (e.target.classList.contains('square'))
        shade(e);
});
window.onmouseup = (() => mouseDown = 0);


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
    root.style = `--width:${100 / gridSize}%;--height:${100 / gridSize}%`;
    const blockCount = gridSize * gridSize;
    for (let i = 0; i < blockCount; i++) {
        const square = document.createElement('div');

        square.style.backgroundColor = 'rgb(255,255,255)';
        square.onmouseover = ((e) => mouseDown && shade(e));

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

    let rgb = event.target.style.backgroundColor;
    let colorArr = rgb.slice(rgb.indexOf('(') + 1, rgb.indexOf(')')).split(',');

    for (let i = 0; i < colorArr.length; i++) {
        colorArr[i] = lerp(colorPick[i], colorArr[i], alpha);
    }
    rgb = 'rgb(' + colorArr.toString() + ')';
    event.target.style.backgroundColor = rgb;
}

function lerp(a, b, alpha) {
    return Math.floor((b - b * alpha) + (a * alpha));
}


