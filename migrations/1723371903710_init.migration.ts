import {DatabaseManagerInterface, MigrationInterface} from "@myroslavshymon/orm/dist/orm/core";
import {DatabasesTypes} from "@myroslavshymon/orm";

export class init implements MigrationInterface {
    async up(databaseManager: DatabaseManagerInterface<DatabasesTypes.POSTGRES>): Promise<string> {
        const sql = `
	CREATE TABLE IF NOT EXISTS "users" (
		user_id BIGINT PRIMARY KEY,
		"username" VARCHAR (255) NOT NULL UNIQUE,
		"email" VARCHAR (255) NOT NULL,
		"password" VARCHAR (255) NOT NULL,
		"is_active" BOOLEAN  DEFAULT false
 );

`
        
        await databaseManager.query(sql);
        
        return sql;
    }

   async down(databaseManager: DatabaseManagerInterface<DatabasesTypes.POSTGRES>): Promise<string> {
       const sql = `DROP TABLE users CASCADE;
				`
      
       await databaseManager.query(sql);
       
       return sql;
    }
}