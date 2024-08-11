import {Column, PrimaryGeneratedColumn, Table, String, ManyToMany, Index} from "@myroslavshymon/orm";
import {Sections} from "./sections";

@Index({indexName: 'user_index', columns: ['username', 'email'], options: {isUnique: true}})
@Table({name: 'users'})
export class Users {
    @PrimaryGeneratedColumn({type: 'BIGINT'})
    user_id: number;

    @String({type: "VARCHAR", length: 255})
    @Column({options: {unique: true, nullable: false}})
    username: string;

    @String({type: "VARCHAR", length: 255})
    @Column({options: {nullable: false}})
    email: string;

    @String({type: "VARCHAR", length: 255})
    @Column({options: {nullable: false}})
    password: string;

    @Column({options: {dataType: 'BOOLEAN', defaultValue: false}})
    is_active: boolean;

    @ManyToMany({foreignKey: 'section_id', referencedColumn: 'section_id'})
    sections: Sections[]
}