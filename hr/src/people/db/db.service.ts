import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { appendFile, readFile, writeFile } from 'fs/promises';
import { Db } from '../db.interface';
import { Person } from '../person.interface';

@Injectable()
export class DbService {
  private _db: Db = { people: [] };

  public async getPeople(): Promise<Db> {
    if (this._db.people.length === 0) {
      await this.initDb();
    }
    return this._db;
  }

  public async saveChanges(): Promise<boolean> {
    try {
      await writeFile(process.env.DB_PATH, JSON.stringify(this._db));
      return true;
    } catch {
      return false;
    }
  }

  insertPerson(person: Person): Person {
    person.id = Math.floor(Math.random() * 1000 + 1);
    person.age = Math.floor(Math.random() * 80 + 1);
    this._db.people.push(person);
    return person;
  }

  updatePerson(person: Person): boolean {
    const index: number = this.findPersonIndex(person.id);
    if (index > -1) {
      this._db.people[index].name = person.name;
      this._db.people[index].age = person.age;
      return true;
    }
    return false;
  }

  deletePerson(id: number): Person {
    const index: number = this.findPersonIndex(id);
    if (index > -1) {
      const removedPerson = this._db.people.slice(index, 1);
      return removedPerson[0];
    } else {
      return undefined;
    }
  }
  private findPersonIndex(id: number): number {
    return this._db.people.findIndex((p) => p.id === id);
  }
  private async initDb(): Promise<void> {
    let dbFile: Db;
    try {
      const result = await readFile(process.env.DB_PATH, {
        encoding: 'utf-8',
      });
      dbFile = JSON.parse(result);
      dbFile.people.forEach((person) => {
        this._db.people.push(person);
      });
    } catch {
      console.log('some error occurred');
      await appendFile(process.env.DB_PATH, JSON.stringify(dbFile));
    }
  }
}
