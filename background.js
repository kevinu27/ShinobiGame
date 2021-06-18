class Background {

  constructor(ctx, backgroundWidth, backgroundHeight, backgroundImgSource) {
    this.ctx = ctx;
    this.backgroundWidth = backgroundWidth;
    this.backgroundHeight = backgroundHeight;
    this.backgroundImg = backgroundImgSource
    this.image = new Image();
    this.image.src = `img/${this.backgroundImg}`;
    this.backgroundPosX = 0;
    this.backgroundPosY = 0;
    this.backgroundVelX = 1;
  }
  
  draw() {
    this.ctx.drawImage(this.image, this.backgroundPosX, this.backgroundPosY, this.backgroundWidth, this.backgroundHeight);
    this.ctx.drawImage(this.image, this.backgroundPosX + this.backgroundWidth, this.backgroundPosY, this.backgroundWidth, this.backgroundHeight);
  }

  moveBackgroundLeft() {
    this.backgroundPosX -= 10 
  }
      
  moveBackgroundRight() {
    this.backgroundPosX += 10 
  }
}