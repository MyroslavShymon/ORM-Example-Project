import {DatabaseManagerInterface, MigrationInterface} from "@myroslavshymon/orm/dist/orm/core";
import {DatabasesTypes} from "@myroslavshymon/orm";

export class addMantToManyRelations implements MigrationInterface {
    async up(databaseManager: DatabaseManagerInterface<DatabasesTypes.POSTGRES>): Promise<string> {
        const sql = `
	CREATE TABLE IF NOT EXISTS "users_sections" (
		id BIGINT PRIMARY KEY,
		"section_id" BIGINT NOT NULL,
		"user_id" BIGINT NOT NULL, 

		FOREIGN KEY ("section_id") REFERENCES sections(section_id),
		FOREIGN KEY ("user_id") REFERENCES users(user_id),

		UNIQUE ("section_id", "user_id")
 );


				`
        
        await databaseManager.query(sql);
        
        return sql;
    }

   async down(databaseManager: DatabaseManagerInterface<DatabasesTypes.POSTGRES>): Promise<string> {
       const sql = `DROP TABLE users_sections CASCADE;
				`
      
       await databaseManager.query(sql);
       
       return sql;
    }
}