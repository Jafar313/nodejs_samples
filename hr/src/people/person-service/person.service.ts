import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Db } from '../db.interface';
import { Person } from '../person.interface';
import * as Joi from 'joi';

const personSchema = Joi.object<Person>({
  id: Joi.number().min(1),
  age: Joi.number().min(1).max(80),
  name: Joi.string().min(3),
});

@Injectable()
export class PersonService {
  constructor(private readonly _dbService: DbService) {}
  private _db: Db;
  async getPeople(): Promise<Db> {
    this._db = await this._dbService.getPeople();
    return this._db;
  }

  async insertPerson(person: Person): Promise<Person | string> {
    const validation = personSchema.validate(person);
    if (!validation.error) {
      const result = this._dbService.insertPerson(person);
      await this._dbService.saveChanges();
      return result;
    } else {
      throw new BadRequestException(validation.error.message);
    }
  }
  async updatePerson(person: Person): Promise<Person | Joi.Err> {
    const validation = personSchema.validate(person);
    if (!validation.error) {
      if (this._dbService.updatePerson(person)) {
        await this._dbService.saveChanges();
        return person;
      }
    } else {
      throw new BadRequestException(validation.error.message);
    }
  }
  async removePerson(id: number): Promise<Person | undefined> {
    const removedPerson: Person = this._dbService.deletePerson(id);
    console.log('result of removed person is:', removedPerson);
    if (removedPerson) {
      await this._dbService.saveChanges();
    }
    return removedPerson;
  }
}
