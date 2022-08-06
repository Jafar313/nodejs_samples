import express from 'express';
import {appendFile, open, readFile, writeFile} from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';


const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = `${__dirname}/people.db`;
const db = {"people": []};

//init db
readFile(dbPath, (err, result) => {
    if (err) {
        appendFile(dbPath, JSON.stringify({"people": []}), () =>{
            console.log("new db file generated");
        })
    } else {
        let dataFile = JSON.parse(result.toString());
        for (let i = 0; i < dataFile.people.length; i++) {
            db.people.push(dataFile.people[i]);
        }
    }
});

//routes
app.get("/", (request, response) =>{
    return response.redirect("/people");
});

app.get("/people", (request, response) =>{
    return response.send(db.people);
})

app.post("/people", (request, response) =>
{
    let person = {FullName: request.body.name, Age: request.body.age};
    if (person.FullName !== undefined & person.Age !== undefined) {
        person.Id = Math.floor((Math.random() * 100) + 1);
        db.people.push(person);
        SaveChanges();
        return response.send(person);
    } else {
        return response.sendStatus(400);
    }

});

app.put("/people/:id", (request, response) =>{
    if (db.people.length > 0){
        let personIndex = db.people.findIndex(x => x.Id == request.params[0]);
        if (personIndex > -1){
            db.people.splice(personIndex, 1);
            SaveChanges();
        }
        else{
            return response.sendStatus(404);
        }
    }
    else{
        console.log("db is empty");
    }
})

app.delete("/people/:id", (request, response) =>{

})

app.listen(3000);

function SaveChanges(){
    open(dbPath, 'w', ()=>{
        writeFile(dbPath, JSON.stringify(db), () =>{
            console.log("Changes has been saved");
        });
    });
}