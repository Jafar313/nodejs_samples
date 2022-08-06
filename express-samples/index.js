import express from 'express';
import {appendFile, open, read, readFile, writeFile} from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = `${__dirname}/people.db`;
const people = {"people": []};
let fileAlreadyRead = false;

app.use(express.json());

app.get("/", (request, response) =>{
    return response.redirect("/people");
});

app.get("/people", (request, response) =>{
    if (fileAlreadyRead === false){
        const populateData = new Promise((resolve, error) =>{
            if (InitializeDb() === true){
                resolve();
            }
            populateData.then(() =>{
                fileAlreadyRead = true;
            })
        });



    }
    return response.send(JSON.parse(people.people));
})

app.post("/people", (request, response) =>
{
    let person = {Id: Math.floor((Math.random() * 100) + 1), FullName: request.body.name, Age: request.body.age};
    if (person.FullName !== undefined & person.Age !== undefined) {
        if (fileAlreadyRead === true) {
            people.people.push(person);
            open(dbPath, () => {
                writeFile(dbPath, JSON.stringify(people), (err) => {
                    if (err != null) {
                        console.log(err);
                        return response.sendStatus(500);
                    } else {
                        return response.send(person);
                    }
                });
            });
        } else {

        }
    } else {
        return response.sendStatus(400);
    }
    
});

app.put("/people/:id", (request, response) =>{
    if (people.people.length !== 0){
        let id = request.params[0];
        console.log(request.params[0]);
        people.people.findIndex(id => id === people.people.Id);
    }
})

app.delete("/people/:id", (request, response) =>{

})

app.listen(3000);

function InitializeDb() {
    readFile(dbPath, (err, result) => {
        if (err) {
            appendFile(dbPath, JSON.stringify({"people": []}), () => {
            });
        } else {
            let dataFile = JSON.parse(result.toString());
            for (let i = 0; i < dataFile.people.length; i++) {
                people.people.push(dataFile.people[i]);
            }
        }
    });

    return true;
}