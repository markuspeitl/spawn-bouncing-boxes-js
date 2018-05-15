function BoxObject(xPos,yPos,width,heigth,velX,velY){
    GameObject.call(this,xPos,yPos,velX,velY,width,heigth);
    var self = this;
    this.heigth = heigth;
    this.width = width;
    this.type = 'boxobject';

    //this.setbounds(width,heigth);

    this.draw=function(canvasContext){
        canvasContext.fillRect(this.xPos,this.yPos,this.width,this.heigth);
    }
}
BoxObject.prototype = Object.create(GameObject.prototype);
//GameObject.prototype.heigth = BoxObject.prototype.heigth;

