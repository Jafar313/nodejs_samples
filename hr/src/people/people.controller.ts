import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query,
} from '@nestjs/common';
import { PersonService } from './person-service/person.service';
import { Person } from './person.interface';
import { Db } from './db.interface';

@Controller('people')
export class PeopleController {
  constructor(private readonly personService: PersonService) {}
  @Get()
  async getPeople(): Promise<Db> {
    return await this.personService.getPeople();
  }

  @Post()
  async insertPerson(@Body() person: Person) {
    return await this.personService.insertPerson(person);
  }

  @Put()
  async updatePerson(@Body() person: Person) {
    return await this.personService.updatePerson(person);
  }

  @Delete(':id')
  async removePerson(@Param('id') id) {
    console.log('removing id is:', id);
    return await this.personService.removePerson(id);
  }
}
