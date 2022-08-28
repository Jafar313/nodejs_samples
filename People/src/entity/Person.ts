import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { PersonHolder } from "./PersonHolder"

@Entity({name: "People"})
export class Person {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    personholderId: number

    // try to add many to one relation.
    holder: PersonHolder
}
