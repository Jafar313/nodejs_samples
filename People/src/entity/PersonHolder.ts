import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person";

@Entity("Holders")
export class PersonHolder {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Person, _person => _person.holderId)
    @JoinColumn({name: 'holderId', referencedColumnName: 'id'})
    coveredPeople: Person[]

}