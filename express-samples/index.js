import express from 'express';
import {appendFile, open, read, readFile, writeFile} from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = `${__dirname}/people.db`;
const people = [];

app.use(express.json());

app.get("/", (request, response) =>{
    return response.redirect("/people");
});

app.get("/people", (request, response) => {
    readFile(dbPath, (err, data) =>{
        if (err !== null){
            return response.sendStatus(404);
        } else{
            console.log(`data receieved is: ${data}`);
            return response.send(data);
        }        
    })
})
        
app.post("/add-new-person", (request, response) =>
{
    console.log(request.body);
    let person = {FullName: request.body.name, Age: request.body.age};   
    console.log("person array is: "+ JSON.stringify(person));
    if (person.FullName !== undefined & person.Age !== undefined){
        console.log('person object is not null');
        readFile(dbPath, (err, data) => {
            if (err != null){
                console.log("cannot read db");
                console.log(err);
                 data = "{'people':[]}";
                appendFile(dbPath, JSON.stringify(emptyData), () =>{
                    console.log("new db generated and empty data inserted");
                });
            }
            else {
                console.log(`received data is: ${data}`)
                people.push(JSON.parse(data));
            }
        });
        open(dbPath, () => {
            console.log("writing into db started...");
            console.log("writing data is:" + JSON.stringify(people));
            writeFile(dbPath, JSON.stringify(people), (err) => {
                if (err != null){
                    console.log(err);
                }
                else{
                    console.log("person has been appended");
                    return response.send(person);
                }
            });
        });   
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

app.listen(3000);