import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.json());

let people = [];

app.get("/", (request, response) =>{
    return response.redirect("/people");
});

app.get("/people", (request, response) =>{
    console.log('redirected to here')
    return response.send(GetPeople());
});

app.post("/insert", (request, response) =>
{
    console.log(request.body);
    let person = {name: request.body.name, age: request.body.age};
    if (person.name !== undefined & person.age !== undefined){
        console.log('person object is not null');
        let id = InsertPerson(person);
        console.log('person inserted');
        console.log(`new person inserted is ${id, person.name, person.age}`);
        return response.send(person);
    }
    else{
        console.log('person object is null');
        console.log(person);
        return response.end();
    }
});

app.put("/remove/:id", (request, response) =>{

})

app.delete("/delete/:id", (request, response) =>{

})

function InsertPerson({name, age}) {
    people = people.sort();
    let newId = people[people.length - 1].id;
    console.log(`the last id is: ${newId}`);
    newId += 1;
    let person = {id: newId, name, age};
    people.push(person);
    return newId;
}

function GetPeople (){
    console.log('come into GetPeople method');
    if (people == []){
        console.log('people array is empty');
        const db = __dirname + '\\people.db' ;
        console.log('the directory is:' + db);
        if (fs.stat(db, (db) =>{
            fs.readFile(db, (err, result) =>{
                if (err != null){
                    return 404;
                }
                else{
                    console.log(`the result of readFile module is: ${result}`);
                }
            });
        }));
    }
    else{
        console.log('people array is not empty');
    }
}

app.listen(3000);

