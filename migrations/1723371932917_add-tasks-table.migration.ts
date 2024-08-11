import {DatabaseManagerInterface, MigrationInterface} from "@myroslavshymon/orm/dist/orm/core";
import {DatabasesTypes} from "@myroslavshymon/orm";

export class addTasksTable implements MigrationInterface {
    async up(databaseManager: DatabaseManagerInterface<DatabasesTypes.POSTGRES>): Promise<string> {
        const sql = `
            ALTER TABLE users
                ADD CONSTRAINT fk_users_users
                FOREIGN KEY (user_id) REFERENCES users(user_id);

				
	CREATE TABLE IF NOT EXISTS "tasks" (
		task_id BIGINT PRIMARY KEY,
		"title" VARCHAR (255) NOT NULL,
		"description" TEXT ,
		"is_completed" BOOLEAN NOT NULL DEFAULT false,
		"due_date" DATE ,
		"created_at" TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
		"updated_at" TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
		"price" NUMERIC  
                	CONSTRAINT check_price  CHECK (price >= 0),
		"user_id" BIGINT , 
		"status" VARCHAR GENERATED ALWAYS AS (title || ' - ' || CASE WHEN is_completed THEN 'Completed' ELSE 'Pending' END) STORED, 

		FOREIGN KEY ("user_id") REFERENCES users(user_id)
 );

`
        
        await databaseManager.query(sql);
        
        return sql;
    }

   async down(databaseManager: DatabaseManagerInterface<DatabasesTypes.POSTGRES>): Promise<string> {
       const sql = `
				DROP TABLE tasks CASCADE;
				`
      
       await databaseManager.query(sql);
       
       return sql;
    }
}