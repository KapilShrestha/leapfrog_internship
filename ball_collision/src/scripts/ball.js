import * as constants from './constants.js'

const ctx=constants.canvas.getContext("2d")

export class Ball{
    constructor(posX, posY, radius){
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;

        // for movement
        this.dx = 2 + Math.random()*2
        this.dy = 2 + Math.random()*2
    }
    drawBall (ctx, color) {
        ctx.beginPath()
        ctx.arc(this.posX, this.posY, this.radius, 0, 2*Math.PI)
        ctx.fillStyle = color
        ctx.fill()
        ctx.closePath()  
    }

    moveBall(_balls, _numberBall){
        this.posX += this.dx
        this.posY += this.dy
        if (this.posX + this.dx > constants.canvas.width - this.radius || this.posX + this.dx < this.radius) {
            this.dx = -this.dx;
          }
          if (this.posY + this.dy > constants.canvas.height - this.radius || this.posY + this.dy < this.radius) {
            this.dy = -this.dy;
        }

          for(let i=0; i<_numberBall; i++){
            if(i!==_balls.indexOf(this)){
                const otherBall = _balls[i]
                const dx = this.posX - otherBall.posX;
                const dy = this.posY - otherBall.posY;
                const distance = Math.sqrt(dx * dx + dy * dy);
              
                const colliding = distance < this.radius + otherBall.radius;
    
                if(colliding){
                    const tempDx = this.dx
                    const tempDy = this.dy
                    this.dx = otherBall.dx
                    this.dy = otherBall.dy
                    otherBall.dx = tempDx
                    otherBall.dy = tempDy
                    ctx.fillStyle= constants.COLORS[Math.round(Math.random()*50)]
                }

            }
        }
        
        
        
          
    }
}


