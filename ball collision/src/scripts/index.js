import { Ball } from "./ball.js"
import * as constants from './constants.js'




constants.numberBall
const balls = []
for(let i=0; i<constants.numberBall; i++){
    balls.push(new Ball(Math.random() * constants.canvas.width, Math.random() * constants.canvas.height, constants.RADIUS+Math.random()*5))
}

console.log(balls)

function animationLoop(){
    constants.ctx.clearRect(0, 0, constants.canvas.width, constants.canvas.height)
    balls.forEach(function(ballItem, index){
        const color = constants.COLORS[index]
        ballItem.drawBall(constants.ctx, color)
        ballItem.moveBall(balls, constants.numberBall)
    })

    

    requestAnimationFrame(animationLoop)
}

animationLoop()