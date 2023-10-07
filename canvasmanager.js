function CanvasManager(){
    var self = this;
    this.canvas = document.getElementById('screen');
	this.canvasContext = this.canvas.getContext('2d');
    this.refreshRate = 60;
    this.looper = null;
    this.gameObjects = new Array();

    //this.gameObjects.push(new LineObject(100,100,-50,-50, 150, 150));

    this.canvas.onclick = function(ev){
        var x = ev.pageX;
        var y = ev.pageY;
        self.gameObjects.push(new BoxObject(x,y,50,50,3));
    }

    //this.gameObjects.push(new BoxObject(200,100,50,50,3));

    this.startDrawing=function(){
        this.looper = setInterval(()=>{
            self.canvas.width = self.canvas.width
            //self.canvasContext.clearRect(0, 0, self.canvas.width, self.canvas.height);
            console.log("draw call");
            self.gameObjects.forEach(element => {
                console.log("draw elem: " + element.type);
                element.draw(self.canvasContext);
                element.checkCollision(self.gameObjects);
                element.confinementCollisions();
                element.updateposition(1000/self.refreshRate);
                //element.move(0.5,0.5);
            });



        },1000/self.refreshRate);
    }

    //this.canvasContext.moveTo(0, 0);
    //this.canvasContext.lineTo(200, 100);
    //this.canvasContext.stroke();
    //this.canvasContext.fillRect(10,10,1000,1000);
};
