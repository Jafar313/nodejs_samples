import {Router} from 'express'
import {deletePerson, getPeople, insertPerson, updatePerson} from "../services/manage-db";
import {Person} from "../interfaces/Person";

const router = Router();

router.get("/", async(req,res ) => {
    const people = await getPeople();
    return res.send(people)
})

router.post("/", async(req, res) =>
{
    let person : Person = {id: req.body.id, name: req.body.name, age: req.body.age}
    if (person.name !== undefined && person.age > 0) {
        await insertPerson(person);
        return res.send(person);
    }
    else {
        return res.sendStatus(400);
    }
});

router.put("/", async(req, res) =>{
        if (req.body.id !== undefined && req.body.id > 0){
            let person: Person = {
                id: req.body.id,
                name: req.body.name,
                age: req.body.age
            }
            await updatePerson(person);
            return res.send(JSON.stringify(person) + ' has been updated');
        }
        else{
            return res.sendStatus(404);
        }
    }
)

router.delete("/:id", async (req, res) =>{
    const id : number = Number(req.params.id);
    if (id > 0){
        let removedPerson = await deletePerson(id);
        return res.send(JSON.stringify(removedPerson) + ' has been removed');
    }
    else{
        return res.sendStatus(404);
    }
})

export default router;