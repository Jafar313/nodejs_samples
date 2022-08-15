import 'dotenv/config';
import {appendFile, readFile, writeFile} from "fs/promises";
import {Db} from '../interfaces/Db'
import {Person} from '../interfaces/Person'
import {PersonExists} from '../interfaces/PersonExists'
import path from 'path';

// @ts-ignore
const dbPath: string = path.join(process.env.DB_PATH, 'people.db');

const db:Db = {people:[]};

async function getPeople() : Promise<Db>{
    if (db.people.length === 0){
        try{
            console.log("want to read file from directory: ", dbPath);
            const result = await readFile(dbPath, {
                flag:'string',
                encoding: 'utf8'
            });
            if (result){
                let dataFile: Db = JSON.parse(result);
                for (let i = 0; i < dataFile.people.length; i++) {
                    db.people.push(dataFile.people[i]);
                }
            }
        }
        catch (err){
            console.log("generating db in directory:", dbPath);
            await appendFile(dbPath, "");
            console.log("new db file generated");
        }
    }
    return db;
}

async function insertPerson(person: Person): Promise<Person>{
    person.id = Math.floor(Math.random() *1000 + 1);
    db.people.push(person);
    await SaveChanges();
    return person;
}

async function updatePerson(person : Person) : Promise<(Person | undefined)>{
    let personExists: PersonExists = personIsValid(person.id);
    if (personExists.isExists){
        db.people[personExists.index].name = person.name;
        db.people[personExists.index].age = person.age;
        await SaveChanges();
        return person;
    }
    return undefined;
}

async function deletePerson(id: number) : Promise<(Person | undefined)>{
    let personExists = personIsValid(id);
    if (personExists.isExists){
        let removedPerson : Person[] = db.people.splice(personExists.index, 1);
        await SaveChanges();
        return removedPerson[0];
    }
    return undefined;
}


async function SaveChanges(){
    try{
        await writeFile(dbPath, JSON.stringify(db));
    }
    catch (err){
        console.log(err);
    }
}

function personIsValid(id: number): PersonExists{
    let index = db.people.findIndex(x=> x.id === id);
    if (index > -1){
        return {isExists: true, index: index};
    }
    return {isExists: false, index: -1};
}

export{getPeople, insertPerson, updatePerson, deletePerson};