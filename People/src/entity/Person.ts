import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
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
    holderId: number

    @ManyToOne(() => PersonHolder)
    @JoinColumn({name: 'personHolderId'})
    holder: PersonHolder
}
