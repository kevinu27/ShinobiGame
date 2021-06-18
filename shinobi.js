class Shinobi {
    constructor(ctx, shinobiWidth, shinobiHeight, shinobiPosX, shinobiPosY, canvasSize) {
        this.ctx = ctx
        this.shinobiSize = { w: shinobiWidth, h: shinobiHeight }
        this.shinobiPos = { x: shinobiPosX, y: shinobiPosY }
        this.shinobiPosY0 = this.shinobiPos.y
        this.canvasSize = canvasSize
        this.shinobiImage = 'ninja walking.png'
        this.faviconImage = 'favicon.png'
        this.imageInstance = undefined
        this.imageFavicon = undefined
        this.lifeBar = 300

        this.shinobiDirection = true

        this.shinobiVel = 1 //{ x: 10, y: 1 }
        this.shinobiVelDelante = 10 //{ x: 10, y: 1 }

        this.shinobiPhysics = { gravity: 9.8 }

        this.a = false
        this.floorHeight = this.canvasSize.h - 300 // altura del salto
        this.jumpHeight = this.floorHeight - 200

        //this.shurikensArrayAttack = [];

        this.temp = 0
        // ================== caminar ================

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.shinobiImage}`

        this.imageFavicon = new Image()
        this.imageFavicon.src = `img/${this.faviconImage}`

        this.imageInstance.frames = 3;
        this.imageInstance.framesIndex = 0;
    }

    damageMusic() {
        let audioDamage = new Audio('img/dañoenemigo.mp3');
        audioDamage.play();
    }

    // ======================================= DRAW ALL SHINOBI ============================
    drawAll(framesCounter) {
        this.drawLife()
        this.walk(framesCounter)
    }
    // -----------------------------------------DRAW Shinobi -------------------------------
    drawLife() {
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(80, 30, this.lifeBar, 40)
        this.ctx.strokeStyle = 'white'
        this.ctx.strokeRect(80, 30, 300, 40)
        this.ctx.lineWidth = 5
        this.ctx.strokeStyle = 'black'
        this.ctx.strokeRect(80, 30, 300, 40)
        this.ctx.lineWidth = 7
        this.ctx.drawImage(this.imageFavicon, 30, 30, 40, 40)

    }
    // ======================================== shinobi caminar ===========================
    walk(framesCounter) {
        this.ctx.drawImage(
            this.imageInstance,
            this.imageInstance.framesIndex * Math.floor(this.imageInstance.width / this.imageInstance.frames),
            0,
            Math.floor(this.imageInstance.width / this.imageInstance.frames),
            this.imageInstance.height,
            this.shinobiPos.x,
            this.shinobiPos.y,
            this.shinobiSize.w,
            this.shinobiSize.h
        )
        this.animateSprite(framesCounter)
    }
    animateSprite(framesCounter) {
        framesCounter % this.imageInstance.frames == 0 ? this.imageInstance.framesIndex++ : null
        this.imageInstance.framesIndex >= this.imageInstance.frames ? this.imageInstance.framesIndex = 0 : null
    }
    // ======================================== SHINOBI ACTIONS =============================
    moveRight() {
        this.shinobiPos.x += 30
    }
    moveBack() {
        this.imageInstance.src = 'img/ninja izq.png'
        this.imageInstance.frames = 3;
        this.shinobiDirection = false
    }
    moveLeft() {
        this.shinobiPos.x -= 30
    }
    moveUp() {
        this.a = true
    }
    moveDown() {
        this.shinobiPos.y += 10
    }
    grav() {
        this.shinobiPos.y < this.canvasSize.h - 200 ? this.shinobiPos.y += this.shinobiPhysics.gravity : null
    }
    jumping() {   /// jumping() se ejecuta en el interval para que cada vez que se quiera hacer un salto apretando la tecla de saltar nos lleve a
        // la funcion moveUp() y ponga a true, entonces a partir de ahi los siguientes condicionals
        if (this.a === true && this.shinobiPos.y > this.jumpHeight === true) {   //si this.a === true (se ha querdo saltar) y el shinobi no ha llegado a la altura del salto (100 px)
            this.shinobiPos.y -= 26;//entonces sumale 26 pixeles, y continua la iteracion del interval
        } else if (this.a === true && this.shinobiPos.y > this.jumpHeight === false) {// entonces cuando hayan pasado 4 iteraciones y la posY del shinobi sea la del la altura de salto
            /// entonces ya hemos llegado a donde tenia que llegar this.a es false y ya no volvera a subir en las
            ///siguientes iteraciones y la gravedad hara el resto
            this.a = false
        }
    }
    attackPunch(enemyArrayList) {
        this.shinobiDirection === true ? this.imageInstance.src = 'img/puño ninja.png' : this.imageInstance.src = 'img/asset ninja2.png'
        this.imageInstance.frames = 2;
        for (let i = 0; i < enemyArrayList.length; i++) {
            this.shinobiPos.x + this.shinobiSize.w >= enemyArrayList[i].enemyPos.x ? (enemyArrayList.splice(i, 1), this.damageMusic()) : 0
        }
    }
    attackPunch2() {
        this.imageInstance.src = 'img/ninja walking.png'
        this.imageInstance.frames = 3;
        this.shinobiDirection = true
    }
}