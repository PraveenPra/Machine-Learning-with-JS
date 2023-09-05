class SketchPad{
    
    constructor(container,size = 400){
        //create a sketchpad canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = size;
        this.canvas.height = size;

        this.canvas.style = `
        background:#fff;
        box-shadow:0 0 10px 2px black;`;

        container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');

        //to store paths
        this.paths = [];
        this.isDrawing = false;

        //#-private method; to draw
        this.#addEventListeners();
    }

    #addEventListeners(){
        this.canvas.onmousedown = (e)=>{
           const mouse = getMousePosition(e);
            this.paths = [mouse];
        this.isDrawing = true;
        }

        this.canvas.onmousemove=(e)=>{
            if(this.isDrawing){
              
                const mouse =  const mouse = getMousePosition(e);

                this.paths.push(mouse);
                console.log(this.paths.length)
            }
        }

        this.canvas.onmouseup=()=>{
            this.isDrawing = false;
        }

        #getMousePosition(e){
            const rect = this.canvas.getBoundingClientRect();

            return [
                Math.round(e.clientX - rect.left),
                Math.round(e.clientY - rect.top)
            ];
        }
    }
}