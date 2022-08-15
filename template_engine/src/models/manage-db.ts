import {appendFile, readFile, writeFile} from "fs/promises";
import path from "path";
import {Db, Person} from './types'

const dbPath = path.join(__dirname, 'people.db');
const db:Db = {people:[{name: "", age:-1}]};

//init data
async function getPeople() : Promise<Db>{
    try{
        const result = await readFile(dbPath, {
            encoding:'utf-8',
            flag:'r'
        });
        console.log('reading result is:'+ result);
        if (result){
            console.log('inserting into db from reading result');
            let dataFile: Db = JSON.parse(result);
            for (let i = 0; i < dataFile.people.length; i++) {
                console.log('inserting value' + JSON.stringify(dataFile.people[i]));
                db.people.push(dataFile.people[i]);
            }
        }
    }
    catch (err){
        await appendFile(dbPath, JSON.stringify(db));
        console.log("new db file generated");
    }
    finally {
        console.log('before return db. the count is:' + db.people.length);

        return db;
    }
}

function insertPerson(): void{

}


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


export{getPeople};