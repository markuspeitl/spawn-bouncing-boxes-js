function GameObject(xPos,yPos,velX,velY,width,height){
    var self = this;
    this.id = "";
    this.xPos = xPos;
    this.yPos = yPos;
    this.velX = 0;
    if(velX)
        this.velX = velX;
    this.velY = 0;
    if(velY)
        this.velY = velY;

    this.height = height;
    this.width = width;

    this.usephysics = true;
    this.airtime = 0;
    this.gravity = 8;
    this.absorbtionY = 3;
    this.absorbtionX = 1.05;
    this.isStaticY=false;
    this.isStaticX=false;

    this.type = 'gameobject';
    this.draw=function(canvasContext){
    }
    this.move=function(deltaX,deltaY){
        self.xPos+=deltaX;
        self.yPos+=deltaY;
    }

    
    this.setBounds = function(width,height){
        this.width = width;
        this.height = height;
    }

    this.checkCollision = function(gameobjects){
        if(gameobjects){
            gameobjects.forEach(gameobject => {
                if(gameobject !== this){

                    console.log("collisions");
                    if(gameobject.xPos + gameobject.width >= this.xPos
                    || gameobject.xPos <= this.xPos + this.width
                    || gameobject.yPos + gameobject.height >= this.yPos
                    || gameobject.yPos <= this.yPos + this.height){
                        //return true;
                    }
        
                    /*if(gameobject.xPos + gameobject.width >= this.xPos && gameobject.xPos < this.xPos || 
                        gameobject.xPos <= this.xPos + this.width && gameobject.xPos + gameobject.width > this.xPos){
                        this.velX=-this.velX;
                        return;
                    }*/

                    if(gameobject.yPos <= this.yPos + this.height && gameobject.yPos + gameobject.height > this.yPos &&
                        ( gameobject.xPos < this.xPos + width || gameobject.xPos + gameobject.width < this.xPos + width)){
                        this.velY=-this.velY/this.absorbtionY;
                        this.velX=this.velX/this.absorbtionX;
                        this.airtime = -1000;
                        return;
                    }
        
                    /*if(gameobject.yPos + gameobject.height >= this.yPos && gameobject.yPos < this.yPos || 
                        gameobject.yPos <= this.yPos + this.height && gameobject.yPos + gameobject.height > this.yPos){
                        this.velY=-this.velY/this.absorbtionY;
                        this.velX=this.velX/this.absorbtionX;
                        this.airtime = 0;
                        return;
                    }*/
                }
        
            });
        }

        //return false;
    }

    this.confinementCollisions = function(){
        console.log(this.height);
        if(this.yPos + this.height >= 1080){
            this.velY=-this.velY/this.absorbtionY;
            this.velX=this.velX/this.absorbtionX;
            this.yPos = 1080 - this.height;
            this.airtime = -1000;
        }
        if(this.xPos + this.width >= 1920){
            this.velX=-this.velX;
            this.xPos = 1920 - this.width;
        }
        else if(this.xPos <= 0){
            this.velX=-this.velX;
            this.xPos = 0;
        }

        if(this.velY <= 0.2){
            setTimeout(()=>{
                if(self.velY <= 0.2)
                    self.isStaticY = true;
            },2000);
        }

    }

    this.updateposition=function(timestepMsec){
        if(this.usephysics && !this.isStaticY){
            this.airtime += timestepMsec/1000;
            if(this.airtime < 0)
                this.airtime = 0;
            this.velY += this.gravity * this.airtime;
        }
        this.xPos+=this.velX;
        this.yPos+=this.velY;
    }
}