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

        //to store path
        this.path = [];
        this.isDrawing = false;

        //#-private method; to draw
        this.#addEventListeners();
    }

    #addEventListeners(){
        this.canvas.onmousedown = (e)=>{
           const mouse = this.#getMousePosition(e);
            this.path = [mouse];
        this.isDrawing = true;
        }

        this.canvas.onmousemove=(e)=>{
            if(this.isDrawing){
              
                const mouse = this.#getMousePosition(e);

                this.path.push(mouse);
               this.#reDraw();
            }
        }

        this.canvas.onmouseup=()=>{
            this.isDrawing = false;
        }
    }

    #reDraw(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        draw.path(this.ctx,this.path);
    }

    #getMousePosition(e){
        const rect = this.canvas.getBoundingClientRect();

        return [
            Math.round(e.clientX - rect.left),
            Math.round(e.clientY - rect.top)
        ];
    }
}