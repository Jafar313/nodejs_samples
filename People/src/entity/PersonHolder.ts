import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person";

@Entity("PeopleHolder")
export class PersonHolder {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Person, (p) => p.personholderId)
    @JoinColumn()
    coveredPeople: Person[]

}