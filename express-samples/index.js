import express from 'express';
import {writeFile} from 'fs/promises';
import {appendFile, readFile} from 'fs'
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
app.get("/people", (request, response) =>{
    return response.send(db.people);
})

app.post("/people", (request, response) =>
{
    if (request.body.name !== undefined && request.body.age !== undefined) {
        let person = {};
        person.Id = Math.floor((Math.random() * 100) + 1);
        person.FullName = request.body.name;
        person.Age = request.body.age
        db.people.push(person);
        console.log('before insert to file')
        SaveChanges().then(() =>{
            console.log('after insert to file')
            return response.send(person);
        });

    } else {
        return response.sendStatus(400);
    }

});

app.put("/people", (request, response) =>{
    if (request.body.id !== undefined && request.body.id > 0){
        let personIndex = db.people.findIndex(x => x.Id === request.body.id);
        if (personIndex > -1){
            db.people[personIndex]["FullName"] = request.body.name;
            db.people[personIndex]["Age"] = request.body.age;
            SaveChanges().then(() => response.send(db.people[personIndex]));
        }
        else{
            return response.sendStatus(404);
        }
    }
    else{
        return response.sendStatus(400);
    }
})

app.delete("/people/:id", (request, response) =>{
    let personIndex = db.people.findIndex(x => x.Id === Number(request.params.id));
    console.log('person index is:' + personIndex);
    if (personIndex > -1){
        let removedPerson = db.people.splice(personIndex, 1);
        SaveChanges().then(() => {
            response.send(removedPerson);
        });
    }
    else{
        return response.sendStatus(404);
    }
})

app.listen(3000);

async function SaveChanges(){
    try{
        console.log('saving to db file started');
        await writeFile(dbPath, JSON.stringify(db));
        console.log('saving to db file finished');
    }
    catch (err){
        console.log(err);
    }
}