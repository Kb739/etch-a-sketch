const grid = document.querySelector('#grid-container');
const count = 10;
let root = document.querySelector(':root');
root.style = `--width:${100 / count}%;--height:${100 / count}%`;

for (let i = 0; i < count * count; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
}