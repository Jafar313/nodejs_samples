import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userService = AppDataSource.getRepository(User);

export async function insertPerson(person: User){
    await userService.save(person);
    console.log("person inserted and its id is:", person.id);
    return person;
}
