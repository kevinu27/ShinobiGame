class Enemy {
    constructor(ctx, enemyPosX, enemyPosY, canvasSize, enemyPosX0, enemyWidth, enemyHeight, shinobi, enemyImg, enemyMusic) {
        this.ctx = ctx
        this.enemyPos = { x: enemyPosX, y: enemyPosY, pos0: enemyPosX0 }
        this.enemySize = { w: enemyWidth, h: enemyHeight}
        this.enemyImage = enemyImg
        this.imageInstance = undefined
        this.enemySpeed = 10
        this.canvasSize = canvasSize
        this.enemyAlive = true
        this.limitePatrol= 0
        this.shinobi = shinobi
        this.enemyMusic = enemyMusic

        this.init()
    }

    init() {
        this.imageInstance = new Image() 
        this.imageInstance.src = `img/${this.enemyImage}`
        this.imageInstance.frames = 4;
        this.imageInstance.framesIndex = 0;
    }

    draw(shinobi, framesCounter) {
        this.walk(framesCounter)
        this.moveBasic(shinobi)
        //this.musicEnemyMoment(shinobi)
    }

    walk(framesCounter) {
        this.ctx.drawImage(
          this.imageInstance,
          this.imageInstance.framesIndex * Math.floor(this.imageInstance.width / this.imageInstance.frames),
          0,
          Math.floor(this.imageInstance.width / this.imageInstance.frames),
          this.imageInstance.height,
          this.enemyPos.x,
          this.enemyPos.y,
          this.enemySize.w,
          this.enemySize.h
        )
        this.animateSprite(framesCounter)
    }

    animateSprite(framesCounter) {
        if (framesCounter % 4 == 0) {
          this.imageInstance.framesIndex++;
        }
        if (this.imageInstance.framesIndex >= this.imageInstance.frames) {
          this.imageInstance.framesIndex = 0;
        }
    }

    moveBasic(shinobi) {
        if(this.enemyPos.x <= shinobi.shinobiPos.x + 400 && this.enemyPos.x >= shinobi.shinobiPos.x+200) {
            this.enemyPos.x -= 10
            this.enemyPos.x === shinobi.shinobiPos.x ? this.enemySpeed = 0 : null
        } else if (this.enemyPos.x >= shinobi.shinobiPos.x - 400 && this.enemyPos.x <= shinobi.shinobiPos.x-100) {
            this.enemyPos.x += 10
            if (this.enemyPos.x === shinobi.shinobiPos.x +400) {
                    this.enemySpeed = 0
            }
        }
    }


    musicEnemyMoment(shinobi) {
        if (this.enemyPos.x >= shinobi.shinobiPos.x + 600 && this.enemyMusic === true) {
            this.finalBoss()
        }
    }

    backgroundMovementEnemyLeft() {
        this.enemyPos.x += 10
    }
            
    backgroundMovementEnemyRight() {
        this.enemyPos.x -= 10
    }

    turn() {
        this.enemySpeed *= -1
    }

}