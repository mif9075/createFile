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
crud.createFile = (file, data) => {
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
}

// crud.createFile('miguel', `date: ${d.toDateString()}, time: ${t}`);

//READ
crud.read = (file) => {
    fs.readFile(`${ crud.baseDir }/${ file }.txt`, 'utf8', (error, data) =>  {
        if (error) throw error;

        console.log(data);
        
    })
};

crud.read('miguel');

//UPDATE

crud.update = (file) => {
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
}

crud.update('miguel');

crud.read('miguel');
//DELETE
crud.delete = (file) => {
    fs.unlink(`${ crud.baseDir }/${file}.txt`, (err) => {
        if (!err) console.log('deleted')
        else return err
    })
}

// crud.delete('miguel');