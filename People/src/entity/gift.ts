import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person";

@Entity({name: 'Gifts'})
export class gift{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Person)
    @JoinTable()
    personGifts: Person[]
}