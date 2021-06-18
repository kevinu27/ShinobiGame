class Platform {

    constructor(ctx, platformPosX, platformPosY, platformWidth, canvasSize) {
        this.ctx = ctx
        this.platformPos = { x: platformPosX, y: platformPosY}
        this.platformSize = { w: platformWidth, h: 75 }
        this.platformImage = 'box.png'
        this.imageInstance = undefined
        this.canvasSize = canvasSize

        this.init()
    }

    init() {
        this.imageInstance = new Image() 
        this.imageInstance.src = `img/${this.platformImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)
    }

    movePlatformLeft() {
        // if (this.posX <= -this.width) {
        //   this.posX = 0;
        // }
        this.platformPos.x -= 10 //this.backgroundVelX
      }
          
      movePlatformRight() {
        this.platformPos.x += 10 //this.backgroundVelX
      }
    



}