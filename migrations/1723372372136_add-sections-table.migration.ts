import {DatabaseManagerInterface, MigrationInterface} from "@myroslavshymon/orm/dist/orm/core";
import {DatabasesTypes} from "@myroslavshymon/orm";

export class addSectionsTable implements MigrationInterface {
    async up(databaseManager: DatabaseManagerInterface<DatabasesTypes.POSTGRES>): Promise<string> {
        const sql = `
	CREATE TABLE IF NOT EXISTS "sections" (
		section_id BIGINT PRIMARY KEY,
		"name" VARCHAR (64) ,
		"user_id" BIGINT 
 );

`
        
        await databaseManager.query(sql);
        
        return sql;
    }

   async down(databaseManager: DatabaseManagerInterface<DatabasesTypes.POSTGRES>): Promise<string> {
       const sql = `DROP TABLE sections CASCADE;
				`
      
       await databaseManager.query(sql);
       
       return sql;
    }
}