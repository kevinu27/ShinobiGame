class Coin {
    constructor(ctx, shinobiPosX, shinobiPosY, shinobiPosY0, shinobiWidth, shinobiHeight, shinobiDirection) {
        this.ctx = ctx
        this.shinobiPosX = shinobiPosX
        this.shurikenPosX = shinobiPosX + shinobiWidth+800;
        this.shurikenPosY = shinobiPosY + shinobiHeight -400;
        this.shurikenSize = { w: 50, h: 50 }
        this.shinobiPosY0 = shinobiPosY0;
        this.shinobiHeight = shinobiHeight;
        this.shinobiWidth = shinobiWidth
        this.shinobiHeight = shinobiHeight
        this.shurikenImage = 'popino.png'
        this.imageInstance = undefined
        this.direction = shinobiDirection

        this.velX = 20;
        this.velY = 0, 6;

        this.gravity = 0;

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.shurikenImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.shurikenPosX, this.shurikenPosY, this.shurikenSize.w, this.shurikenSize.h)
        this.move()
    }

    move() {
            this.shurikenPosX -= this.velX;
            this.shurikenPosY += this.velY;
            this.velY += this.gravity;
    }
}