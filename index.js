let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let startButton = document.querySelector("#start")
let restartButton = document.querySelector("#restart")
let infoButton = document.querySelector("#info")
let body = document.querySelector('body')


let spell = new Image();
spell.src = './images/spell.png'

let harry = new Image();
harry.src = './images/harry.png'

let voldemort = new Image();
voldemort.src = './images/voldemort.png'

let background = new Image();
background.src = './images/hogwarts.png';

let gameOverBg = new Image();
gameOverBg.src = './images/asd.png';

let startBg = new Image();
startBg.src = './images/start-background.jpg'

let spellX = 1150, spellY = 350;
let incX = 10;

let harryX = 0; harryY = 300;
let isUp = false; isDown = false;

let backgroundMusic = new Audio('./sounds/harrypotter-theme.mp3')

let spells = [
    {x: spellX, y: spellY},
    {x: spellX, y: spellY + 200}
]

let intervalId = 0;
let isGameOver = false;


const startScreen = () => {
    ctx.drawImage(startBg, 0, 0, 1500, 800)
    startButton.style.display = 'block'
    body.style.backgroundColor = 'rgba(4,2,4,255)'     
    restartButton.style.display = 'none'  
    infoButton.style.display = 'block'     
    
    backgroundMusic.play()
    backgroundMusic.volume = 1
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.length)
    ctx.drawImage(background, 0, 0, 1500, 800)
    
    ctx.drawImage(harry, harryX, harryY)

    ctx.drawImage(voldemort, 1300, 280, 200, 200) 
    
    for (let i = 0; i<spells.length; i++){
        ctx.drawImage(spell, spells[i].x, spells[i].y)  
        
        if (spells[i].x + spell.width < 0){
            spells[i].x = 1150
            spells[i].y = Math.floor(Math.random() * canvas.height)
        }
    }
    
    body.style.backgroundColor = 'white'
    startButton.style.display = 'none'
    restartButton.style.display = 'none'    
    infoButton.style.display = 'none' 
}


const collision = () => {
    for (let i = 0; i<spells.length; i++){
        if((harryX + harry.width >= spells[i].x + 60) && (harryY < spells[i].y && harryY + harry.height > spells[i].y + spell.height)){  //checking (X) checking (Y)
            isGameOver = true            
        }
    }

}

const score = () => { //still not working
    let score = 0;
    let counter = setInterval(score++, 1000) // kinda weird but works 
    let points = document.getElementById('score').innerHTML = Math.floor(counter / 100)    
} 


const gameOverScreen = () =>{
    collision()
    
    if (isGameOver){
        backgroundMusic.pause()
        cancelAnimationFrame(draw) 
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(gameOverBg, 0, 0, 1500, 800)
        restartButton.style.display = 'block'
        
    } else {
        intervalId = requestAnimationFrame(animation)
    } 
}


const animation = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    score()
    draw()   

    //score()    
    // let speed = setInterval((incX+=2), 1000) // speed function

    for (let i = 0; i<spells.length; i++){        
        spells[i].x = spells[i].x - incX //implement 'speed' here when its fixed
    }
  
    if (isUp){
        harryY = harryY - 10
    } else if (isDown){
        harryY = harryY + 10
    }    

    gameOverScreen()
}

window.addEventListener('load', () => {    
    startScreen()

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

    startButton.addEventListener('click' , () => {  
        draw()
        animation()
    })

    restartButton.addEventListener('click' , () => {       
        ctx.clearRect(0, 0, canvas.width, canvas.height) 
        isGameOver = false;
        spells = [
            {x: spellX, y: spellY},
            {x: spellX, y: spellY + 200}
        ]
        startScreen()
        
        
    })    
})