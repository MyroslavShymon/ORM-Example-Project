import {DatabaseManagerInterface, MigrationInterface} from "@myroslavshymon/orm/dist/orm/core";
import {DatabasesTypes} from "@myroslavshymon/orm";

export class addIndexAndTrigger implements MigrationInterface {
    async up(databaseManager: DatabaseManagerInterface<DatabasesTypes.POSTGRES>): Promise<string> {
        const sql = `
			  CREATE OR REPLACE FUNCTION set_completion_time()
			  RETURNS TRIGGER AS $$
			  BEGIN
			   
        BEGIN
            IF NEW.is_completed THEN
                NEW.completed_at = CURRENT_TIMESTAMP;
            END IF;
            RETURN NEW;
        END;
    
			  END;
			  $$ LANGUAGE plpgsql;
		
			  CREATE TRIGGER before_update_task
			  BEFORE UPDATE ON tasks
			  FOR EACH ROW
			  EXECUTE FUNCTION set_completion_time();
	 

        CREATE UNIQUE INDEX user_index
        ON users  (username, email) ;
    
`
        
        await databaseManager.query(sql);
        
        return sql;
    }

   async down(databaseManager: DatabaseManagerInterface<DatabasesTypes.POSTGRES>): Promise<string> {
       const sql = `DROP TRIGGER IF EXISTS before_update_task ON tasks;

			DROP INDEX IF EXISTS user_index;
		
`
      
       await databaseManager.query(sql);
       
       return sql;
    }
}