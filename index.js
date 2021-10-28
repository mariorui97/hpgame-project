let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

// load all images

let spell = new Image();
spell.src = './images/35.gif'

let intervalId = 0;
let isGameOver = false;
let score = 0;

function draw(){


    ctx.drawImage(spell, 50, 50)

 }

window.addEventListener('load', () => {
    draw()

    document.addEventListener('mousedown', () => {

    })
    document.addEventListener('mouseup', () => {

    })
    
})