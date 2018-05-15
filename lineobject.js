function LineObject(xPos,yPos,startX,startY,endX,endY,velX,velY){
    GameObject.call(this,xPos,yPos,velX,velY);
    var self = this;
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.type = 'lineobject';
    this.draw=function(canvasContext){
        canvasContext.moveTo(this.xPos + this.startX, this.yPos + this.startY);
        canvasContext.lineTo(this.xPos + this.endX, this.yPos + this.endY);
        canvasContext.stroke();
    }
}