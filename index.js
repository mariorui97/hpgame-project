let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let startButton = document.querySelector("#start")
startButton.style.display = 'none'

let restartButton = document.querySelector("#restart")
restartButton.style.display = 'none' 

let infoButton = document.querySelector("#info")
infoButton.style.display = 'none'

let toolTip = document.querySelector("#tooltip")
toolTip.style.display = 'none'

let mantle = document.querySelector("#mantle")
mantle.style.display = 'none'

let closeInfo = document.querySelector("#closeinfo")
closeInfo.style.display = 'none'

let body = document.querySelector('body')
let points = document.getElementById('score')


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

let invisHarry = new Image();
invisHarry.src = './images/harryInvisible.png'

let warning = new Image();
warning.src = './images/warning.png'

let spellX = 1250, spellY = 350;
let incX = 1;

let harryX = 0; harryY = 300, harryXInvis = 0;
let isUp = false; isDown = false;

let dead = new Audio('./sounds/dead.mp3')


let spells = [
    {x: spellX, y: spellY, speed: incX},
    {x: spellX, y: spellY + 200, speed: incX}
]

let intervalId = 0;
let isGameOver = false;
let score = 0;
let animationCount = 0;
let invisible = false;



const startScreen = () => {      
    ctx.drawImage(startBg, 0, 0, 1500, 800)
    startButton.style.display = 'block'
    body.style.backgroundColor = 'rgba(4,2,4,255)'
    canvas.style.boxShadow = 'none'
    canvas.style.border = 'none'
    restartButton.style.display = 'none' 
    infoButton.style.display = 'block'
    dead.pause();
    dead.currentTime = 0;
}

const pontuation = () => { 
    score = Math.floor(animationCount/50)
    points.innerHTML = score    
} 

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.length)
    ctx.drawImage(background, 0, 0, 1500, 800) 
    
    if ((points.innerHTML > 40) && (invisible == true)){
        ctx.drawImage(warning, 270, 150)
        if ((points.innerHTML > 50) && (invisible == true)){
            isGameOver = true
        }
    } 

    invisible ? ctx.drawImage(invisHarry, harryXInvis, harryY) : ctx.drawImage(harry, harryX, harryY) 

    ctx.drawImage(voldemort, 1200, 280)     
    
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
    toolTip.style.display = 'none'
    closeInfo.style.display = 'none'  
    canvas.style.border = '2px solid #00000080'
    canvas.style.boxShadow = '2px 2px 20px black';
}

const collision = () => {
    for (let i = 0; i<spells.length; i++){
        if((harryX + harry.width >= spells[i].x + 60) && (harryY < spells[i].y && harryY + harry.height > spells[i].y + spell.height)){  //checking (X) checking (Y)
            isGameOver = true            
        }
    }        
}


const gameOverScreen = () =>{
    collision()
    
    if (isGameOver){
        score = 0;
        cancelAnimationFrame(draw) 
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(gameOverBg, 0, 0, 1500, 800)
        restartButton.style.display = 'block'
        dead.play()
        mantle.style.display = 'none'
        invisible = false;
    } else {        
        intervalId = requestAnimationFrame(animation)
    }     
}

const animation = () => {
    animationCount++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    pontuation()
    draw()   

    for (let i = 0; i<spells.length; i++){           
        if (points.innerHTML < 5){
            spells[i].speed = 10
        }
        if (points.innerHTML >= 5){
            spells[i].speed = 15
        }
        if (points.innerHTML >= 10){
            spells[i].speed = 20
        }
        if (points.innerHTML >= 15){
            spells[i].speed = 25
        }
        if (points.innerHTML >= 20){
            spells[i].speed = 30
        }
        if (points.innerHTML >= 25){
            spells[i].speed = 35            
        }
        if (points.innerHTML >= 30){
            spells[i].speed = 40            
        }
        if (points.innerHTML >= 35){
            spells[i].speed = 45            
        }
        if (points.innerHTML >= 40){
            spells[i].speed = 50            
        }


        spells[i].x = spells[i].x - spells[i].speed 
    }
  
    if ((isUp) && (harryY>0)){
        harryY = harryY - 15
    } else if ((isDown) && (harryY+harry.height<canvas.height && harryY+invisHarry.height<canvas.height)){
        harryY = harryY + 15
    }       
    

    gameOverScreen()       
}

window.addEventListener('load', () => {     
    startScreen()

    document.addEventListener('keydown', (event) => {
        if (event.key == 'ArrowDown' || event.key == 's' || event.key == 'S' ){
            isUp = false;
            isDown = true;
        } else if (event.key == 'ArrowUp' || event.key == 'w' || event.key == 'W'){
            isUp = true;
            isDown = false;
        }
    })

    document.addEventListener('keyup', () => {
        isUp = false;
        isDown = false;
    })

    document.addEventListener('keydown', (event) => {
        if (event.key == 'h'){
            if ((points.innerHTML >= 30) && (points.innerHTML <= 40)){
                invisible = true;
                harryX = -500;
                mantle.style.display = 'block'
             }      
         }
    })

    document.addEventListener('keyup', (event) => {
        if (event.key == 'h'){
            invisible = false;
            harryX = 0;
            mantle.style.display = 'none'                       
        }
    })

    startButton.addEventListener('click' , () => {  
        draw()
        animation()
    })

    infoButton.addEventListener('click', () => {   
        toolTip.style.display = 'block'
        closeInfo.style.display = 'block'   
    })

    closeInfo.addEventListener('click', () => {
        toolTip.style.display = 'none'
        closeInfo.style.display = 'none'        
    })

    restartButton.addEventListener('click' , () => {       
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        animationCount = 0 
        isGameOver = false;
        spells = [
            {x: spellX, y: spellY},
            {x: spellX, y: spellY + 200}
        ]        
        startScreen()
    })   
})