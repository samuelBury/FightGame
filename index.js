const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1200
canvas.height = 675

c.fillRect(0,0,canvas.width, canvas.height)

const gravity =0.7

const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc: 'images/backGround2.jpg'
})

const player = new Fighter({
    position :{
        x:0,
        y:100
    },
    velocity:{
        x:0,
        y:0
    },
    offset:{
        x:0,
        y:0
    }
    
})


const enemy = new Fighter({
    position:{
        x:400,
        y:100
    },

    velocity:{
        x:0,
        y:0
    },
    color:'blue',
    
    offset:{
        x:-50,
        y:0
    },
})




const keys = {
    q:{
        pressed:false
    },
    d:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
}

decreaseTimer()

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle= 'black'
    c.fillRect(0,0, canvas.width,canvas.height)

    background.update()
    player.update()
    enemy.update()
    

    player.velocity.x=0
    enemy.velocity.x=0

    if(keys.q.pressed && player.lastKey==='q'){
        player.velocity.x=-5
    }
    else if(keys.d.pressed && player.lastKey==='d'){
        player.velocity.x=5
    }

    if(keys.ArrowLeft.pressed && enemy.lastKey==='ArrowLeft'){
        enemy.velocity.x=-5
    }
    else if(keys.ArrowRight.pressed && enemy.lastKey==='ArrowRight'){
        enemy.velocity.x=5
    }

    if( 
        rectangularCollision({
            rectangle1 : player,
            rectangle2: enemy})
        && player.isAttacking)
    {
        player.isAttacking= false
        enemy.health-=20
        document.querySelector('#enemyHealth').style.width=enemy.health+'%'
    }   

    if( 
        rectangularCollision({
            rectangle1 : enemy,
            rectangle2: player})
        && enemy.isAttacking)
    {
        enemy.isAttacking= false
        player.health-=20
        document.querySelector('#playerHealth').style.width=player.health+'%'
    }   

    //fin du jeux par ko
    if(enemy.health<=0 || player.health<=0){
        determineWinner({player,enemy, timerId})
    }
}

animate()

window.addEventListener('keydown',(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed=true
            player.lastKey ='d'
            break
        case 'q':
            keys.q.pressed=true
            player.lastKey ='q'
            break
        case 'z':
            player.velocity.y=-20
            break
        case ' ':
            player.attack()
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed=true
            enemy.lastKey='ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=true
            enemy.lastKey ='ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y=-20
            break
        case 'ArrowDown':
            enemy.attack()
            break

    }
    
   
})
window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed=false
            break
        case 'q':
            keys.q.pressed=false
            break
    }

    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed=false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=false
            break
    }
   
})