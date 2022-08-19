import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PersonService } from './person-service/person.service';
import { DbService } from './db/db.service';

@Module({
  controllers: [PeopleController],
  providers: [PersonService, DbService],
})
export class PeopleModule {}
