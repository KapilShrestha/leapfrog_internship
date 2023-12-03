let board;
let boardWidth = 360;
let boardHeight = 576;
let context;


//doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = boardWidth/2 - doodlerWidth/2
let doodlerY = boardHeight*7/8 - doodlerHeight;
let doodlerRightImg;
let doodlerLeftImg;

let doodler = {
    img: null,
    x : doodlerX,
    y : doodlerY,
    width : doodlerWidth, 
    height : doodlerHeight

}


// physics
let velocityX = 0;
let velocityY = 0; //character jump speed in above
let initialVelocityY = -8 // starting velocity Y
let gravity = 0.4 




// platforms
let platformArray = [];
let platformWidth = 70;
let platformHeight = 18;
let platformImg


let score = 0;



window.onload = function(){
    board = document.getElementById("board");
    board.width = boardWidth
    board.height = boardHeight;
    context = board.getContext("2d")

    // load doodler images
    doodlerRightImg =  new Image();
    doodlerRightImg.src = "/src/img/doodler-right.png"
    doodler.img = doodlerRightImg
    doodlerRightImg.onload = function(){
        context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height)
    }

    doodlerLeftImg = new Image();
    doodlerLeftImg.src = "/src/img/doodler-left.png"

    
    platformImg = new Image();
    platformImg.src = "/src/img/platform.png"

    velocityY = initialVelocityY
    
    placePlatforms()
    
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveDoodler)
    }

function update(){
    requestAnimationFrame(update);
    context.clearRect(0,0, board.width, board.height)

    // doodler movement in left and right out of the board

    doodler.x += velocityX
    if(doodler.x > boardWidth){
        doodler.x = 0
    }
    else if (doodler.x + doodler.width < 0){
        doodler.x = boardWidth
    }

    velocityY += gravity

    doodler.y += velocityY

    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height)

    // draw platform
    for(let i=0; i< platformArray.length; i++){
        let platform = platformArray[i];
        if (velocityY < 0 && doodler.y < boardHeight *3/4){
            platform.y -= initialVelocityY
        }
        if(detectCollision(doodler, platform) && velocityY >=0){
            velocityY = initialVelocityY; // jump from platform
        }
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height)
    }
    // add new platform and clear previous

    while(platformArray.length > 0 && platformArray[0].y >= boardHeight){
        platformArray.shift() //removes first element 
        newPlatform()
    }

    // for score

    updateScore()
    context.fillStyle = "black";
    context.font = " 16 px sans-serif"
    context.fillText(score, 5 , 20)
    

}

function moveDoodler(pressed){
    if (pressed.code == "ArrowRight" || pressed.code == "KeyD") {// to move right 
        velocityX = 2
        doodler.img = doodlerRightImg
    } 
    else if (pressed.code == "ArrowLeft" || pressed.code == "KeyA"){
        velocityX = -2
        doodler.img = doodlerLeftImg

    }

}

function placePlatforms(){
    platformArray = []

    // starting platform

    let platform = {
        img: platformImg,
        x : boardWidth/2,
        y : boardHeight - 50,
        width: platformWidth,
        height : platformHeight
    }

    platformArray.push(platform)

    for(let i = 0; i<6; i++){
        let randomX = Math.floor(Math.random()* boardWidth * 3/4);
        let platform = {
            img: platformImg,
            x : randomX,
            y : boardHeight - 75 * i -150,
            width: platformWidth,
            height : platformHeight
        }
    
        platformArray.push(platform)
        
    }
}

function newPlatform(){
    let randomX = Math.floor(Math.random()* boardWidth * 3/4);
        let platform = {
            img: platformImg,
            x : randomX,
            y : -platformHeight,
            width: platformWidth,
            height : platformHeight
        }
    
        platformArray.push(platform)

}



function detectCollision(doodler, platform){
    return doodler.x < platform.x + platform.width &&
            doodler.x + doodler.width > platform.x &&
            doodler.y < platform.y + platform.height &&
            doodler.y + doodler.height > platform.y;
}


// function updateScore(){
//     let points = Math.floor(50*Math.random())
//     score+=points
// }