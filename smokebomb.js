class Shuriken {
    constructor(ctx, shinobiPosX, shinobiPosY, shinobiPosY0, shinobiWidth, shinobiHeight) {
        this.ctx = ctx
        this.shurikenPosX = shinobiPosX + shinobiWidth;
        this.shurikenPosY = shinobiPosY + shinobiHeight / 2;
        this.shinobiPosY0 = shinobiPosY0;
        this.shinobiHeight = shinobiHeight;
        this.shinobiWidth = shinobiWidth
        this.shinobiHeight = shinobiHeight

        this.radius = 10;

        this.velX = 10;
        this.velY = 1;

        this.gravity = 1;



    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.arc(this.shurikenPosX, this.shurikenPosY, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.move()
      }

    move() {
       this.shurikenPosX += this.velX;
       this.shurikenPosY += this.velY;
    
       this.velY += this.gravity;
    
        if (this.shurikenPosY >= this.shinobiPosY0 + this.shinobiHeight) {
          this.velY *= -1;
        }
    }
}

    /*init() {
        this.imageInstance = new Image()
       // this.imageInstance.src = `img/${this.shinobiImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.shinobiPos.x, this.shinobiPos.y, this.shinobiSize.w, this.shinobiSize.h)
    }

    moveRight() {
        // this.shinobiPos.x += this.shinobiVel.x
        // this.shinobiVel.y += this.shinobiPhysics.gravity
        // this.shinobiPos.y += this.shinobiVel.y

        // this.shinobiPos.y >= this.canvasSize.h - this.shinobiSize.h ? this.shinobiVel.y *= -1 : null
        // this.shinobiPos.x >= this.canvasSize.w - this.shinobiSize.w ? this.shinobiVel.x *= -1 : null
    }
    moveLeft() {

    }
    moveUP() {

    }
    moveDown() {

    }
    attack_shuriken() {

    }
    attack_sword() {

    }
}*/