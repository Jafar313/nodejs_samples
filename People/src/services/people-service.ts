import { AppDataSource } from "../data-source";
import { Person } from "../entity/Person";

const peopleService = AppDataSource.getRepository(Person);

export async function getAll() {
    const reslut =  await peopleService.createQueryBuilder()
        .select("");
    return reslut;
}

export async  function getPersonCars(){

}

export async function insertPerson(person: Person){
    await peopleService.save(person);
    console.log("person inserted and its id is:", person.id);
    return person;
}

export async function editPerson(person: Person){
    
}

export async function removePerson(personId: number){

}