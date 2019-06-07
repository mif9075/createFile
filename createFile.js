//TIME
let d = new Date();

let t = d.getHours() + ":" + d.getMinutes()+ ":" + d.getSeconds();

//CRUD

const fs    = require('fs');
const path  = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const crud  = {}

crud.baseDir = path.join(__dirname, './database');

//CREATE
crud.createFile = (file, data) => { setTimeout( function createDelayed() {
    fs.open(`${ crud.baseDir }/${ file }.txt`, 'wx', (error, identifier) => {
        if (!error && identifier) {
            let jsonArray = [];
            jsonArray.push(data);

            let stringData = JSON.stringify(jsonArray, null, 3);

            fs.writeFile(identifier, stringData, (err) => {
                if (!err) {
                    fs.close(identifier, (err) => {
                        if (err) console.log(err);
                        else console.log("no errors");
                    })
                } else {
                    console.log(err);
                }
            })
        }
    })
}, 
10000)};

crud.createFile('miguel', `date: ${d.toDateString()}, time: ${t}`);

//READ



crud.read = (file) => { setTimeout( function readDelayed() {
    fs.readFile(`${ crud.baseDir }/${ file }.txt`, 'utf8', (error, data) =>  {
        if (error) throw error;

        console.log(data);
        
    })
    }, 
10000)};


// crud.read('miguel');

//UPDATE

crud.update = (file) => { setTimeout( function updateDelayed() {
    readFile(`${ crud.baseDir }/${file}.txt`, 'utf8')
        .then(newStream => {

            return newStream + '\n updated';
        })
        .then(finalData => {
            fs.truncate(`${ crud.baseDir }/${file}.txt`, (error) => {
                if (!error) {
                    fs.writeFile(`${ crud.baseDir }/${ file }.txt`, finalData, (err)=>{
                        if (err) return err;
                    })
                } else {
                    return error;
                }
            })
        })
    }, 
    10000)};

// crud.update('miguel');

// crud.read('miguel');

//DELETE
crud.delete = (file) => { setTimeout( function deleteDelayed() {
    fs.unlink(`${ crud.baseDir }/${file}.txt`, (err) => {
        if (!err) console.log('deleted')
        else return err
    })
},
10000)};

crud.delete('miguel');