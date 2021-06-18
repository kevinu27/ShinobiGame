class Monster {
    constructor(ctx, monsterPosX, monsterPosY, monsterWidth, monsterHeight, canvasSize, monsterImg, monsterSpeed) {
        this.ctx = ctx
        this.monsterPos = { x: monsterPosX, y: monsterPosY}
        this.monsterSize = { w: monsterWidth, h: monsterHeight}
        this.monsterImage = `${monsterImg}`
        this.imageInstance = undefined
        this.monsterSpeed = monsterSpeed
        this.canvasSize = canvasSize
        this.enemyAlive = true

        this.init()
    }

    init() {
        this.imageInstance = new Image() 
        this.imageInstance.src = `img/${this.enemyImage}`
    }
}