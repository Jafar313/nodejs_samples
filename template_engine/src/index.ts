import 'dotenv/config';
import express from 'express';
import {getPeople} from "./models/manage-db";

const app = express();
app.use(express.json());


//routes
app.get("/people", (request, response) =>{
    console.log("coming into people rout");
    const readDta = new Promise((resolve) => {
        console.log('coming into promise rout')
        const people = getPeople();
        if (people){
            resolve(people);
        }
    });
    readDta.then((people)=>{
        console.log('the promise has been resolved');
        console.log(JSON.stringify(people));
        return response.send(people);
    })
})

// app.post("/people", (request, response) =>
// {
//     if (request.body.name !== undefined && request.body.age !== undefined) {
//         let person = {};
//         person.Id = Math.floor((Math.random() * 100) + 1);
//         person.FullName = request.body.name;
//         person.Age = request.body.age
//         db.people.push(person);
//         console.log('before insert to file')
//         SaveChanges().then(() =>{
//             console.log('after insert to file')
//             return response.send(person);
//         });
//
//     } else {
//         return response.sendStatus(400);
//     }
//
// });
//
// app.put("/people", (request, response) =>{
//     if (request.body.id !== undefined && request.body.id > 0){
//         let personIndex = db.people.findIndex(x => x.Id === request.body.id);
//         if (personIndex > -1){
//             db.people[personIndex]["FullName"] = request.body.name;
//             db.people[personIndex]["Age"] = request.body.age;
//             SaveChanges().then(() => response.send(db.people[personIndex]));
//         }
//         else{
//             return response.sendStatus(404);
//         }
//     }
//     else{
//         return response.sendStatus(400);
//     }
// })
//
// app.delete("/people/:id", (request, response) =>{
//     let personIndex = db.people.findIndex(x => x.Id === Number(request.params.id));
//     console.log('person index is:' + personIndex);
//     if (personIndex > -1){
//         let removedPerson = db.people.splice(personIndex, 1);
//         SaveChanges().then(() => {
//             response.send(removedPerson);
//         });
//     }
//     else{
//         return response.sendStatus(404);
//     }
// })

app.listen(3000, () =>{
    console.log('Listening on port 3000');
});
