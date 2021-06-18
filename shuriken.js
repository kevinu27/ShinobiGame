class Shuriken {
    constructor(ctx, shinobiPosX, shinobiPosY, shinobiPosY0, shinobiWidth, shinobiHeight, shinobiDirection) {
        this.ctx = ctx
        this.shinobiPosX = shinobiPosX
        this.shurikenPosX = shinobiPosX + shinobiWidth/2;
        this.shurikenPosY = shinobiPosY + shinobiHeight / 4;
        this.shurikenSize = { w: 50, h: 50 }
        this.shinobiPosY0 = shinobiPosY0;
        this.shinobiHeight = shinobiHeight;
        this.shinobiWidth = shinobiWidth
        this.shinobiHeight = shinobiHeight
        this.shurikenImage = 'shuriken.png'
        this.imageInstance = undefined
        this.direction = shinobiDirection

        this.velX = 60;
        this.velY = 0, 6;

        this.gravity = 2;

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.shurikenImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.shurikenPosX, this.shurikenPosY, this.shurikenSize.w, this.shurikenSize.h)
        this.move()
        /*this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.arc(this.shurikenPosX, this.shurikenPosY, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        */
    }

    move() {
        if (this.direction === true) {
            this.shurikenPosX += this.velX;
            this.shurikenPosY += this.velY;
            this.velY += this.gravity;
        } else {
            //this.shurikenPosX = this.shinobiPosX
            this.shurikenPosX -= this.velX;
            this.shurikenPosY += this.velY;
            this.velY += this.gravity;

        }
   
    }
}