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

        //this creates json file for each id containing the paths data only
        fs.writeFileSync(
            constants.JSON_DIR+'/'+id+'.json',//filename (1.json,2.json...)
            JSON.stringify(drawings[label])//paths data
        )
 
        id++;
    }
})

fs.writeFileSync(constants.SAMPLES,JSON.stringify(samples));