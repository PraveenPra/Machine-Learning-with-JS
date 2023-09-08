const draw = require('../common/draw')

//canvasis a web element not available here, so install canvas pkg
const {createCanvas} = require('canvas');
const canvas = createCanvas(400,400)
const ctx = canvas.getContext('2d')

const constants = {};

constants.DATA_DIR = '../data';
constants.RAW_DIR = constants.DATA_DIR+'/raw';
constants.DATASET_DIR = constants.DATA_DIR+'/dataset';
constants.JSON_DIR = constants.DATASET_DIR+'/json';
constants.IMG_DIR = constants.DATASET_DIR+'/img';
constants.SAMPLES = constants.DATASET_DIR+'/samples.json';

const fs = require('fs');

//This gives an array of all the filenames.json in the raw folder
const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];
let id = 1;

fileNames.forEach(fn=>{
    //this reads all the files in the raw folder giving the data object inside
    const content = fs.readFileSync(
        constants.RAW_DIR+'/'+fn
    )

    //for each drawings(fish,car..) make an object and write into a sample file
    const {student,session,drawings} = JSON.parse(content);
    for(let label in drawings){
        samples.push({
            id,label,
            student_name : student,
            student_id : session
        })

        const paths = drawings[label];

        //this creates json file for each id containing the paths data only
        fs.writeFileSync(
            constants.JSON_DIR+'/'+id+'.json',//filename (1.json,2.json...)
            JSON.stringify(paths)//paths data
        )
 
        //create the drawing images from the paths for each id
        generateImageFile(
            constants.IMG_DIR+'/'+id+'.png',
            paths
        )
        id++;
    }
})

fs.writeFileSync(constants.SAMPLES,JSON.stringify(samples));

function generateImageFile(outFile,paths){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw.paths(ctx,paths);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outFile,buffer);
}