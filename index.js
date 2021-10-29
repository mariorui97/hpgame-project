let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';



let spell = new Image();
spell.src = './images/34.gif'

let harry = new Image();
harry.src = './images/harry.png'

let voldemort = new Image();
voldemort.src = './images/voldemort.png'

let background = new Image();
background.src = './images/hogwarts.png';

let spellX = 600, spellY = 400;
let incX = 2, incY = 2;

let harryX = 0; harryY = 300;
let isUp = false; isDown = false;

let backgroundMusic = new Audio('./sounds/harrypotter-theme.mp3')


let intervalId = 0;
let isGameOver = false;
let score = 0;



const draw = () => {
    ctx.drawImage(background, 0, 0, 1000, 800)
    
    ctx.drawImage(harry, harryX, harryY, 200, 200)

    ctx.drawImage(spell, spellX, spellY)

    ctx.drawImage(voldemort, 750, 280, 200, 200) 

    backgroundMusic.play()
    backgroundMusic.volume = 1
}

const collision = () => {
    if(harryX + harry.width == spellX + spell.width + incX){ //collisions still not right 
        isGameOver = true
    }
}

const animation = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    draw()
    spellX = spellX - incX

    if (isUp){
        harryY = harryY - 10
    } else if (isDown){
        harryY = harryY + 10
    }
    
    collision()

    if (isGameOver){
        backgroundMusic.pause()
        cancelAnimationFrame(draw)
    } else {
        intervalId = requestAnimationFrame(animation)
    } 
}

animation()

window.addEventListener('load', () => {
    draw() 
    

    document.addEventListener('keydown', (event) => {
        if (event.key == 'ArrowDown' || event.key == 's'){
            isUp = false;
            isDown = true;
        } else if (event.key == 'ArrowUp' || event.key == 'w'){
            isUp = true;
            isDown = false;
        }

    })

    document.addEventListener('keyup', () => {
        isUp = false;
        isDown = false;
    })
    
})