import {Column, ManyToMany, PrimaryGeneratedColumn, Table} from "@myroslavshymon/orm";
import {Users} from "./users";

@Table({ name: 'sections' })
export class Sections {
    @PrimaryGeneratedColumn({ type: 'BIGINT' })
    section_id: number;

    @Column({options: {dataType: 'VARCHAR', length: 64}})
    name: string;

    @Column({ options: { dataType: "BIGINT" } })
    user_id: number;

    @ManyToMany({foreignKey: 'user_id', referencedColumn: 'user_id'})
    users: Users[]
}