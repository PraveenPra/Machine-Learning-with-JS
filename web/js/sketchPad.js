class SketchPad {

    constructor(container, size = 400) {
        //create a sketchpad canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = size;
        this.canvas.height = size;

        this.canvas.style = `
        background:#fff;
        box-shadow:0 0 10px 2px black;`;

        container.appendChild(this.canvas);
        this.lineBreak = document.createElement('br');
        container.appendChild(this.lineBreak);

        this.undoBtn = document.createElement('button');
        this.undoBtn.innerHTML = "UNDO";
        container.appendChild(this.undoBtn);

        this.ctx = this.canvas.getContext('2d');

        //to store path
        this.paths = [];
        this.isDrawing = false;

        //this will reset undo button at start
        this.#reDraw();
        //#-private method; to draw
        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.onmousedown = (e) => {
            const mouse = this.#getMousePosition(e);
            //store each mouse pos in the array - [[x1,y1],[x2,y2]...]
            this.paths.push([mouse]);
            this.isDrawing = true;
        }

        this.canvas.onmousemove = (e) => {
            if (this.isDrawing) {

                const mouse = this.#getMousePosition(e);
                //for multiple paths, we want to push to the last path(i draw something and letgo. then again i draw from somewhere. both paths start at different places.)
                const lastPath = this.paths[this.paths.length - 1];

                lastPath.push(mouse);
                this.#reDraw();
            }
        }

        this.canvas.onmouseup = () => {
            this.isDrawing = false;
        }

        this.canvas.ontouchstart = (e) => {
            //on mobile screens,mouse events dont work, use the first touch and pass that event(loc) to the mousedown function to do same task of drawing
            const loc = e.touches[0];
            this.canvas.onmousedown(loc);
        }

        this.canvas.ontouchmove = (e) => {
            const loc = e.touches[0];
            this.canvas.onmousemove(loc);
        }

        this.canvas.ontouchend = (e) => this.canvas.onmouseup();

        this.undoBtn.onclick = () => {
            this.paths.pop();
            this.#reDraw();
        }
    }

    #reDraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        draw.paths(this.ctx, this.paths);

        if (this.paths.length > 0)
            this.undoBtn.disabled = false;
        else
            this.undoBtn.disabled = true;

    }

    #getMousePosition(e) {
        const rect = this.canvas.getBoundingClientRect();

        return [
            Math.round(e.clientX - rect.left),
            Math.round(e.clientY - rect.top)
        ];
    }
}