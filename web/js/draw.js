const draw = {};
//draw  a single path
draw.path = (ctx,path,color = 'black')=>{
    ctx.strokeStyle = color;
    ctx.linewidth = 3;
    ctx.beginPath();

    //this spreads x and y of the first path in the array
    ctx.moveTo(...path[0]);
    for(let i=1;i<path.length;i++){
        //from the first all other points(x,y) are drawn
        ctx.lineTo(...path[i]);
        }

        ctx.stroke();
}

draw.paths=(ctx,paths,color = 'black')=>{
    //to draw multiple paths in canvas 
for(const path of paths){
    draw.path(ctx,path,color);
}
}