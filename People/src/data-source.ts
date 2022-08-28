import "reflect-metadata"
import { DataSource } from "typeorm"
import { Person } from "./entity/Person"
import { PersonHolder } from "./entity/PersonHolder"

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    username: "sa",
    password: "363823@S",
    database: "tempdb",
    synchronize: true,
    logging: false,
    entities: [PersonHolder, Person],
    migrations: [],
    subscribers: [],
})
