import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Db } from '../db.interface';
import { Person } from '../person.interface';

@Injectable()
export class PersonService {
  constructor(private readonly _dbService: DbService) {}
  private _db: Db;
  async getPeople(): Promise<Db> {
    this._db = await this._dbService.getPeople();
    return this._db;
  }

  async insertPerson(person: Person): Promise<Person> {
    if (this.personIsValid(person)) {
      const result = this._dbService.insertPerson(person);
      await this._dbService.saveChanges();
      return result;
    }
  }
  async updatePerson(person: Person): Promise<Person | undefined> {
    if (this.personIsValid(person)) {
      if (this._dbService.updatePerson(person)) {
        await this._dbService.saveChanges();
        return person;
      }
    }
    return undefined;
  }
  async removePerson(id: number): Promise<Person | undefined> {
    if (id > 0) {
      const removedPerson: Person = this._dbService.deletePerson(id);
      await this._dbService.saveChanges();
      return removedPerson;
    }
    return undefined;
  }

  private personIsValid(person: Person): boolean {
    if (person.age < 1 || person.age > 100) return false;
    if (person.name.length < 3) return false;
    return true;
  }
}
