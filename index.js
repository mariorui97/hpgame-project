let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let spell = new Image();
spell.src = './images/spell.png'

let harry = new Image();
harry.src = './images/harry.png'

let voldemort = new Image();
voldemort.src = './images/voldemort.png'

let background = new Image();
background.src = './images/hogwarts.png';

let spellX = 1150, spellY = 350;
let incX = 5;

let harryX = 0; harryY = 300;
let isUp = false; isDown = false;

let backgroundMusic = new Audio('./sounds/harrypotter-theme.mp3')

let spells = [
    {x: spellX, y: spellY},
    {x: spellX, y: spellY + 200}
]

let intervalId = 0;
let isGameOver = false;
let score = 0;



const draw = () => {
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

    //backgroundMusic.play()
    backgroundMusic.volume = 1
}

const collision = () => {
    for (let i = 0; i<spells.length; i++){
        if((harryX + harry.width >= spells[i].x + 60) && (harryY < spells[i].y && harryY + harry.height > spells[i].y + spell.height)){  //checking (X) checking (Y)
            isGameOver = true
        }
    }

}



const animation = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    draw()       


    for (let i = 0; i<spells.length; i++){
        //let increasing = setInterval((incX = incX++), 1000)
        spells[i].x = spells[i].x - incX
    }
  

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