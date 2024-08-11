import {
    Column,
    PrimaryGeneratedColumn,
    Table,
    String,
    Boolean,
    ForeignKey,
    ComputedColumn,
    Numeric,
    Trigger
} from "@myroslavshymon/orm";
import {TriggerEventsTypes, TriggerTimingsTypes} from "@myroslavshymon/orm/dist/orm/core";

@Trigger({
    name: 'before_update_task',
    event: TriggerEventsTypes.UPDATE,
    timing: TriggerTimingsTypes.BEFORE,
    triggerFunction: `
        BEGIN
            IF NEW.is_completed THEN
                NEW.completed_at = CURRENT_TIMESTAMP;
            END IF;
            RETURN NEW;
        END;
    `,
    triggerFunctionName: 'set_completion_time'
})
@Table({ name: 'tasks' })
export class Tasks {
    @PrimaryGeneratedColumn({ type: 'BIGINT' })
    task_id: number;

    @String({ type: "VARCHAR", length: 255 })
    @Column({ options: { nullable: false } })
    title: string;

    @String({ type: "TEXT" })
    @Column({ options: { nullable: true } })
    description: string;

    @Boolean()
    @Column({ options: { nullable: false, defaultValue: false } })
    is_completed: boolean;

    @Column({ options: { dataType: 'DATE', nullable: true } })
    due_date: Date;

    @ComputedColumn({
        dataType: 'VARCHAR',
        calculate: "title || ' - ' || CASE WHEN is_completed THEN 'Completed' ELSE 'Pending' END"
    })
    status: string;

    @Column({ options: { dataType: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP' } })
    created_at: Date;

    @Column({ options: { dataType: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP' } })
    updated_at: Date;

    @Numeric({ type: 'NUMERIC', precision: 10, scale: 2 })
    @Column({ options: { check: 'price >= 0', nameOfCheckConstraint: 'check_price' } })
    price: number;

    @ForeignKey({ table: 'users', key: 'user_id' })
    @Column({ options: { dataType: "BIGINT" } })
    user_id: number;
}