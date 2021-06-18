const game = {
    title: 'Shinobi',
    author: 'Jose y Kevin',
    license: undefined,
    version: '1.0.0',
    desciption: 'Ninja Game',
    canvasDom: undefined,
    ctx: undefined,
    myMusic: undefined,
    framesCounter: 0,
    FPS: 20,
    Temp: 0,
    puntos: 0,
    canvasSize: { w: undefined, h: undefined },
    keys: {
        SPACE: 'Space',
        UP_MOVE: 'ArrowLeft', //W
        DOWN_MOVE: 's',//S
        RIGHT_MOVE: 'D',//D
        LEFT_MOVE: 'A',//A
    },
    oneTime: true,
    oneTime2: true,

    // elementros creados
    shinobi: undefined,
    background: undefined,
    platformArrayList: [],
    enemyArrayList: [],     // enemy 
    enemyArrayListEnd: [],
    shurikensArrayAttack: [],
    monstersList: [],
    coins: [],

    intervalId: 0,
    audio: undefined,



    init() {
        this.setContext()
        this.setDimensions()
        this.setEventListeners()
        this.start()
        //  this.initMusic()
        this.finalbossMoment()
    },



    initMusic() {
        this.audio = new Audio('img/music.mp3');
        this.audio.play();
        this.audio.volume = 0.02;
        this.audio.loop = true
    },
    stopMusic() {
        this.audio.pause();
    },
    damageMusic() {
        let audioDamage = new Audio('img/dañoenemigo.mp3');
        audioDamage.play();
    },

    finalBoss() {
        let d = new Audio('img/finalboss music.mp3');
        d.play()
        d.loop = true
    },

    shurikenMusic() {
        let audioShuriken = new Audio('img/Shuriken.mp3')
        audioShuriken.play();
        audioShuriken.volume = 0.1;

    },

    setContext() {
        this.canvasDOM = document.querySelector('#myCanvasID')
        this.ctx = this.canvasDOM.getContext('2d')
    },
    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        this.canvasDOM.setAttribute('width', this.canvasSize.w)
        this.canvasDOM.setAttribute('height', this.canvasSize.h)
    },
    setEventListeners() {
        document.onkeypress = e => {
            e.key === 'a' ? this.movementLeft() : null
            e.key === 'd' ? this.movementRight() : null
            e.key === 'w' ? this.shinobi.moveUp() : null
            e.key === 's' ? this.shinobi.moveDown() : null
            e.key === " " ? this.attackShuriken() : null
        }
        document.onkeydown = e => {
            e.key === 'm' ? this.shinobi.attackPunch(this.enemyArrayList) : null
        }
        document.onkeyup = e => {
            e.key === 'm' ? this.shinobi.attackPunch2() : null
        }
    },
    start() {
        this.createAll() //enemy  dentro o fuera del set interval 


        intervalId = setInterval(() => {
            this.clearScreen()
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.drawAll()
            this.shinobi.lifeBar <= 1 ? this.gameOver() : null // GAME OVER
            this.background.backgroundPosX < -7000 ? this.youWin() : null
            this.background.backgroundPosX < -3000 && this.oneTime === true ? (this.stopMusic(), this.finalBoss(), this.oneTime = false) : null
            console.log(this.oneTime)
            this.shinobi.shinobiPos.x > 550 && this.oneTime2 === true ? (this.oneTime2 = false, this.initMusic(), console.log("entro en la condicion")) : null
            this.shinobi.grav()
            this.shinobi.jumping()
            this.allCollision()
            this.clearObstacles()
            //this.enemyArrayList.forEach(elm => elm.musicEnemyMoment())      
        }, 1000 / this.FPS)
    },
    finalbossMoment() {
        this.background.backgroundPosX < -1000 ? this.finalBoss() : null
    },
    clearScreen() { this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h) },

    drawText() {
        this.ctx.fillStyle = 'white'
        this.ctx.strokeStyle = 'black'
        this.ctx.font = '48px serif';
        this.ctx.strokeText(`Score ${this.puntos}`, 700, 80);
        this.ctx.fillText(`Score ${this.puntos}`, 700, 80);
    },

    drawAll() {
        this.background.draw()
        this.platformArrayList.forEach(elm => elm.draw(this.shinobi))
        this.shurikensArrayAttack.forEach(elm => elm.draw())
        this.enemyArrayList.forEach(elm => elm.draw(this.shinobi, this.framesCounter))
        this.shinobi.drawAll(this.framesCounter)
        //this.coins.forEach(elm => elm.draw())
        //console.log(this.coins)
        // this.generateCoins()
        this.drawText()
        //this.clearCoins()


    },

    // =============================CREACION DE ELEMENTOS===========================================
    createAll() {
        this.background = new Background(this.ctx, 8000, this.canvasSize.h, 'background.png')
        this.createPlatform()
        this.createEnemy()
        this.shinobi = new Shinobi(this.ctx, 200, 200, 500, this.canvasSize.h - 300, this.canvasSize, 'shinobi.png')
    },
    // ---------------------------------------------------------------------------------------------
    attackShuriken() {
        this.shurikenMusic()
        this.shurikensArrayAttack.push(new Shuriken(this.ctx, this.shinobi.shinobiPos.x, this.shinobi.shinobiPos.y, this.shinobi.shinobiPosY0, this.shinobi.shinobiSize.w, this.shinobi.shinobiSize.h, this.shinobi.shinobiDirection))
    },
    createEnemy() { //create eneymy
        const enemy1 = new Enemy(this.ctx, 1000, this.canvasSize.h - 200, this.canvasSize, 1000, 200, 200, this.shinobi, 'enemy2.png')
        const enemy2 = new Enemy(this.ctx, 1500, this.canvasSize.h - 200, this.canvasSize, 1500, 200, 200, this.shinobi, 'enemy2.png')
        const enemy3 = new Enemy(this.ctx, 1600, this.canvasSize.h - 400, this.canvasSize, 2000, 200, 200, this.shinobi, 'enemy2.png')
        const enemy4 = new Enemy(this.ctx, 2000, this.canvasSize.h - 200, this.canvasSize, 2000, 200, 200, this.shinobi, 'enemy2.png')
        const enemy5 = new Enemy(this.ctx, 2500, this.canvasSize.h - 200, this.canvasSize, 2000, 200, 200, this.shinobi, 'enemy2.png')
        const enemy6 = new Enemy(this.ctx, 3000, this.canvasSize.h - 200, this.canvasSize, 2000, 200, 200, this.shinobi, 'enemy2.png')
        const enemy7 = new Enemy(this.ctx, 3400, this.canvasSize.h - 200, this.canvasSize, 2000, 200, 200, this.shinobi, 'enemy2.png')
        const enemy8 = new Enemy(this.ctx, 3900, this.canvasSize.h - 200, this.canvasSize, 2000, 200, 200, this.shinobi, 'enemy2.png')
        const enemy9 = new Enemy(this.ctx, 4500, this.canvasSize.h - 200, this.canvasSize, 2000, 200, 200, this.shinobi, 'enemy2.png')
        const enemyG = new Enemy(this.ctx, 6000, this.canvasSize.h - 500, this.canvasSize, 2000, 500, 500, this.shinobi, "enemygerman.png")
        const enemyT = new Enemy(this.ctx, 5500, this.canvasSize.h - 500, this.canvasSize, 2000, 500, 500, this.shinobi, "enemyteo.png")
        const enemyP = new Enemy(this.ctx, 5000, this.canvasSize.h - 500, this.canvasSize, 2000, 500, 500, this.shinobi, "enemypaula.png")
        const enemyPopino = new Enemy(this.ctx, 6300, this.canvasSize.h - 300, this.canvasSize, 2000, 350, 350, this.shinobi, "popino1.png")


        this.enemyArrayList.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemyG, enemyT, enemyP, enemyPopino)
    },
    createPlatform() { //create platform
        const platform1 = new Platform(this.ctx, 1200, this.canvasSize.h - 350, 300, this.canvasSize, this.shinobi)
        const platform2 = new Platform(this.ctx, 1300, this.canvasSize.h - 250, 100, this.canvasSize, this.shinobi)
        const platform3 = new Platform(this.ctx, 1400, this.canvasSize.h - 250, 100, this.canvasSize, this.shinobi)
        const platform4 = new Platform(this.ctx, 1500, this.canvasSize.h - 250, 100, this.canvasSize, this.shinobi)
        const platform5 = new Platform(this.ctx, 1600, this.canvasSize.h - 250, 100, this.canvasSize, this.shinobi)
        const platform6 = new Platform(this.ctx, 1700, this.canvasSize.h - 250, 100, this.canvasSize, this.shinobi)
        const platform7 = new Platform(this.ctx, 1800, this.canvasSize.h - 250, 100, this.canvasSize, this.shinobi)
        const platform8 = new Platform(this.ctx, 1900, this.canvasSize.h - 250, 100, this.canvasSize, this.shinobi)

        const platform9 = new Platform(this.ctx, 2500, this.canvasSize.h - 250, 300, this.canvasSize, this.shinobi)
        const platform10 = new Platform(this.ctx, 2800, this.canvasSize.h - 250, 300, this.canvasSize, this.shinobi)
        const platform11 = new Platform(this.ctx, 3100, this.canvasSize.h - 250, 300, this.canvasSize, this.shinobi)

        const platform12 = new Platform(this.ctx, 3800, this.canvasSize.h - 250, 100, this.canvasSize, this.shinobi)
        const platform13 = new Platform(this.ctx, 3900, this.canvasSize.h - 250, 100, this.canvasSize, this.shinobi)
        const platform14 = new Platform(this.ctx, 4000, this.canvasSize.h - 250, 100, this.canvasSize, this.shinobi)
        const platform15 = new Platform(this.ctx, 4100, this.canvasSize.h - 320, 100, this.canvasSize, this.shinobi)
        const platform16 = new Platform(this.ctx, 4200, this.canvasSize.h - 320, 100, this.canvasSize, this.shinobi)
        const platform17 = new Platform(this.ctx, 4300, this.canvasSize.h - 320, 100, this.canvasSize, this.shinobi)

        const platform18 = new Platform(this.ctx, 5000, this.canvasSize.h - 250, 300, this.canvasSize, this.shinobi)
        const platform19 = new Platform(this.ctx, 5300, this.canvasSize.h - 320, 300, this.canvasSize, this.shinobi)
        const platform20 = new Platform(this.ctx, 5600, this.canvasSize.h - 250, 300, this.canvasSize, this.shinobi)
        const platform21 = new Platform(this.ctx, 5900, this.canvasSize.h - 320, 300, this.canvasSize, this.shinobi)
        const platform22 = new Platform(this.ctx, 6200, this.canvasSize.h - 250, 300, this.canvasSize, this.shinobi)

        this.platformArrayList.push(platform1, platform2, platform3, platform4, platform5,
            platform6, platform7, platform8, platform9, platform10, platform11, platform12, platform13,
            platform14, platform15, platform16, platform17, platform18, platform19, platform20, platform21, platform22
        )
    },

    generateCoins() {
        if (this.framesCounter % 100 === 0) {
            this.coins.push(new Coin(this.ctx, this.shinobi.shinobiPos.x, this.shinobi.shinobiPos.y, this.shinobi.shinobiPosY0, this.shinobi.shinobiSize.w, this.shinobi.shinobiSize.h, this.shinobi.shinobiDirection))
        }

    },
    clearCoins() {
        this.coins = this.coins.filter(elm => elm.shurikenPosX.x >= -500)
    },

    clearObstacles() {
        this.shurikensArrayAttack = this.shurikensArrayAttack.filter(elm => elm.shurikenPosX >= 0)
    },

    // =============================INTERACIONES CON ELEMENTOS===========================================
    allCollision() {
        this.isCollision()
        this.shinobiCollision()
        this.collisionTruePlatform()
        this.collisionBetweenPlatformShinobi()
        this.collisionShurikenWithEnemy()
    },
    // -----------------------------collision  ----------------------------------------
    isCollision() {
        return this.enemyArrayList.some(elm => {
            return (
                this.shinobi.shinobiPos.x + this.shinobi.shinobiSize.w >= elm.enemyPos.x &&
                this.shinobi.shinobiPos.y + this.shinobi.shinobiSize.h >= elm.enemyPos.y && elm.enemyPos.y + elm.enemySize.w >= this.shinobi.shinobiPos.y &&
                this.shinobi.shinobiPos.x <= elm.enemyPos.x + elm.enemySize.w
            )
        })
    },
    shinobiCollision() {
        this.isCollision() === true && this.shinobi.lifeBar >= 1 ? this.shinobi.lifeBar -= 1 : null
        this.shinobi.lifeBar === 0 ? this.gameOver() : null
    },
    collisionTruePlatform() {
        this.collisionBetweenPlatformShinobi() === true ? this.shinobi.shinobiPhysics.gravity = 0 : this.shinobi.shinobiPhysics.gravity = 9.8
    },
    collisionBetweenPlatformShinobi() {
        return this.platformArrayList.some(elm => {
            return (
                this.shinobi.shinobiPos.x + this.shinobi.shinobiSize.w >= elm.platformPos.x && //// dentro de laplataforma del lado izquierdo
                this.shinobi.shinobiPos.y + (this.shinobi.shinobiSize.h / 1.45) <= elm.platformPos.y &&  ///los pies por encima de la platadorma
                this.shinobi.shinobiPos.y + (this.shinobi.shinobiSize.h / 1.45) >= elm.platformPos.y - 27 &&
                this.shinobi.shinobiPos.x <= elm.platformPos.x + (elm.platformSize.w / 2) ///ladoizqierdo del shinobi dentro por el lado derecho de la plataforma
            )
        })
    },
    collisionShurikenWithEnemy() {
        for (let i = 0; i < this.enemyArrayList.length; i++) {
            for (let j = 0; j < this.shurikensArrayAttack.length; j++) {

                this.enemyArrayList[i].enemyPos.x + this.enemyArrayList[i].enemySize.w >= this.shurikensArrayAttack[j].shurikenPosX && this.enemyArrayList[i].enemyPos.y + this.enemyArrayList[i].enemySize.h >= this.shurikensArrayAttack[j].shurikenPosY && this.enemyArrayList[i].enemyPos.x <= this.shurikensArrayAttack[j].shurikenPosX + this.shurikensArrayAttack[j].shurikenSize.w ? (this.enemyArrayList.splice(i, 1), this.damageMusic(), this.puntos = this.puntos + 10) : null
            }
        }
    },
    // -----------------------------Other interactions ----------------------------------------
    gameOver() {
        this.imageGameOver = new Image()
        this.imageGameOver.src = `img/gameover.png`
        this.ctx.drawImage(this.imageGameOver, 0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    youWin() {
        this.imageGameOver = new Image()
        this.imageGameOver.src = `img/youwin.png`
        this.ctx.drawImage(this.imageGameOver, 0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    movementRight() {
        this.shinobi.attackPunch2()
        if (this.shinobi.shinobiPos.x <= 700) {
            this.shinobi.moveRight()
        }
        if (this.shinobi.shinobiPos.x >= 700) {
            this.background.moveBackgroundLeft()
            this.platformArrayList.forEach(elm => elm.movePlatformLeft())
            this.enemyArrayList.forEach(elm => elm.backgroundMovementEnemyRight())
        }
    },
    movementLeft() {
        this.shinobi.moveBack()
        this.shinobi.shinobiPos.x > 500 ? this.shinobi.moveLeft() : null
        this.shinobi.shinobiPos.x <= 500 ? (this.background.moveBackgroundRight(), this.platformArrayList.forEach(elm => elm.movePlatformRight()), this.enemyArrayList.forEach(elm => elm.backgroundMovementEnemyLeft())) : null
    },
}








