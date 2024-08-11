import {DatabaseManagerInterface, MigrationInterface} from "@myroslavshymon/orm/dist/orm/core";
import {DatabasesTypes} from "@myroslavshymon/orm";

export class insertData implements MigrationInterface {
    async up(databaseManager: DatabaseManagerInterface<DatabasesTypes.POSTGRES>): Promise<string> {
        const sql = `
INSERT INTO "users" (user_id, username, email, password, is_active) VALUES
(1, 'user1', 'user1@example.com', 'password1', true),
(2, 'user2', 'user2@example.com', 'password2', true),
(3, 'user3', 'user3@example.com', 'password3', true),
(4, 'user4', 'user4@example.com', 'password4', true),
(5, 'user5', 'user5@example.com', 'password5', true),
(6, 'user6', 'user6@example.com', 'password6', true),
(7, 'user7', 'user7@example.com', 'password7', true),
(8, 'user8', 'user8@example.com', 'password8', true),
(9, 'user9', 'user9@example.com', 'password9', true),
(10, 'user10', 'user10@example.com', 'password10', true);

INSERT INTO "tasks" (task_id, title, description, is_completed, due_date, created_at, updated_at, price, user_id) VALUES
(1, 'Task 1', 'Description for task 1', false, '2024-08-20', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 10.00, 1),
(2, 'Task 2', 'Description for task 2', false, '2024-08-21', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 20.00, 2),
(3, 'Task 3', 'Description for task 3', false, '2024-08-22', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 30.00, 3),
(4, 'Task 4', 'Description for task 4', false, '2024-08-23', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 40.00, 4),
(5, 'Task 5', 'Description for task 5', false, '2024-08-24', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 50.00, 5),
(6, 'Task 6', 'Description for task 6', false, '2024-08-25', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 60.00, 6),
(7, 'Task 7', 'Description for task 7', false, '2024-08-26', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 70.00, 7),
(8, 'Task 8', 'Description for task 8', false, '2024-08-27', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 80.00, 8),
(9, 'Task 9', 'Description for task 9', false, '2024-08-28', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 90.00, 9),
(10, 'Task 10', 'Description for task 10', false, '2024-08-29', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 100.00, 10);

INSERT INTO "sections" (section_id, name, user_id) VALUES
(1, 'Section 1', 1),
(2, 'Section 2', 2),
(3, 'Section 3', 3),
(4, 'Section 4', 4),
(5, 'Section 5', 5),
(6, 'Section 6', 6),
(7, 'Section 7', 7),
(8, 'Section 8', 8),
(9, 'Section 9', 9),
(10, 'Section 10', 10);

INSERT INTO "users_sections" (id, section_id, user_id) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8),
(9, 9, 9),
(10, 10, 10);
        `
        
        await databaseManager.query(sql);
        
        return sql;
    }

   async down(databaseManager: DatabaseManagerInterface<DatabasesTypes.POSTGRES>): Promise<string> {
       const sql = `
DELETE FROM "users_sections";

DELETE FROM "sections";

DELETE FROM "tasks";

DELETE FROM "users";
       `
      
       await databaseManager.query(sql);
       
       return sql;
    }
}