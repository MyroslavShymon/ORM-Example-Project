import {DatabaseManager, DatabasesTypes, DataSourceContext} from "@myroslavshymon/orm";
import {Sections, Tasks, Users} from "../entities";

export const databaseManager = new DatabaseManager<DatabasesTypes.POSTGRES>(
    {
        logging: true,
        monitoring: true,
        type: DatabasesTypes.POSTGRES,
        host: 'some_host',
        user: 'some_user',
        password: 'some_password',
        port: 5432,
        database: 'some_database',
        cache: {
            type: "redis",
        },
        models: [
            Users,
            Tasks,
            Sections
        ],
    },
    new DataSourceContext()
);

(async () => {
    await databaseManager.createOrmConnection()

    const selectAllUsers = await databaseManager.queryBuilder<Users[]>()
        .createView('allUsersView')
        .select()
        .from('users')
        .execute();

    console.log('selectAllUsers', selectAllUsers)

    const selectQueryExample = await databaseManager.queryBuilder<Tasks[]>()
        .select(['task_id', 'title', 'status'])
        .from('tasks')
        .where({
            conditions: {
                is_completed: { eq: false },
                price: { gt: 50 }
            },
            logicalOperator: 'and'
        })
        .orderBy('due_date', 'ASC')
        .execute();

    console.log('selectQueryExample', selectQueryExample)

    const subquery = databaseManager.queryBuilder()
        .select(['username'])
        .from('users')
        .where({ conditions: { is_active: { eq: true } } })
        .build(true, false, false);

    const mainQueryWithSubquery = await databaseManager.queryBuilder()
        .select(['user_id', 'username'])
        .from('users')
        .where({ conditions: { username: { in: subquery } } })
        .parametrize([subquery])
        .execute()

    console.log('mainQueryWithSubquery', mainQueryWithSubquery)

    const queryWithLeftJoin = await databaseManager.queryBuilder()
        .select(['users.username', 'sections.name'])
        .from('users')
        .leftJoin('sections', {
            column: 'users.user_id', // основна колонка в таблиці Users
            operator: '=',
            value: 'sections.user_id' // колонка в таблиці Sections
        })
        .orderBy('users.username', 'ASC')
        .execute()

    console.log(queryWithLeftJoin)

    const query1 = databaseManager.queryBuilder()
        .select(['user_id', 'username'])
        .from('users')
        .where({ conditions: { is_active: { eq: true } } });

    const query2 = databaseManager.queryBuilder()
        .select(['user_id', 'username'])
        .from('users')
        .where({ conditions: { is_active: { eq: false } } });

    const exampleOfUnionQuery = await query1.union(query2).parametrize([true, false]).execute();
    const exampleOfUnionAllQuery = await query1.unionAll(query2).parametrize([true, false]).execute();

    console.log('exampleOfUnionQuery', exampleOfUnionQuery)
    console.log('exampleOfUnionAllQuery', exampleOfUnionAllQuery)

    const sumQuery = await databaseManager.queryBuilder()
        .select(['SUM(price) AS total_price'])
        .from('tasks')
        .execute();

    console.log('sumQuery', sumQuery)

    const havingQuery = await databaseManager.queryBuilder()
        .select(['user_id', 'COUNT(*) AS task_count'])
        .from('tasks')
        .groupBy(['user_id'])
        .having({ conditions: { 'COUNT(*)': { gt: 5 } } })
        .execute();

    console.log('havingQuery', havingQuery)

    const groupByQuery = await databaseManager.queryBuilder()
        .select(['user_id', 'COUNT(*) AS task_count'])
        .from('tasks')
        .groupBy(['user_id'])
        .execute();

    console.log('groupByQuery', groupByQuery)

    const updateQueryExample = await databaseManager.queryBuilder()
        .update({ is_completed: true }, 'tasks')
        .where({ conditions: { task_id: { eq: 1 } }, logicalOperator: 'and' })
        .execute();

    console.log('updateQueryExample', updateQueryExample)

    const deleteQueryExample = await databaseManager.queryBuilder()
        .delete('tasks')
        .where({ conditions: { title: { eq: 'Завдання 2' } }})
        .execute();

    console.log('deleteQueryExample', deleteQueryExample)

    const insertQueryExample = await databaseManager.queryBuilder()
        .insert({
            task_id: 111,
            title: 'Новий таск',
            description: 'Опис нового таску',
            is_completed: false,
            due_date: '2024-12-31',
            price: 100.50
        }, 'tasks')
        .execute();

    console.log('insertQueryExample', insertQueryExample)

    const selectUsersQueryCached = await databaseManager.queryBuilder<Users[]>()
        .select(['user_id', 'username', 'email'])
        .from('users')
        .orderBy('username', 'ASC')
        .cache({ ttl: 60000, key: 'users_list' });

    console.log('selectUsersQueryCached', selectUsersQueryCached)
})()