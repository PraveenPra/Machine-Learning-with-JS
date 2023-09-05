class SketchPad{
    //container div where u want to have ur canvas created with size
    constructor(container,size = 400){
        this.canvas = document.createElement('canvas');
        this.canvas.width = size;
        this.canvas.height = size;

        this.canvas.style = `
        background:#fff;
        box-shadow:0 0 10px 2px black;`;

        container.appendChild(this.canvas);
    }
}