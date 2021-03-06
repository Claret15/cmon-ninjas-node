# Node.js version of cmon-ninjas

### Install

1. `npm install`

3. Update config/database.js with your chosen database dialect. This is using postgres and the database driver is already included.

   dialect options: 'mysql' | 'mariadb' | 'postgres' | 'mssql'

   If you decide to use another dialect, install the relevant driver:

   `npm install --save pg pg-hstore` - Postgres  
   `npm install --save mysql2`  
   `npm install --save mariadb`  
   `npm install --save sqlite3`  
   `npm install --save tedious` - Microsoft SQL Server

   source: http://docs.sequelizejs.com/manual/getting-started.html

2. Create a database, no need to create tables.

4. Rename the .env.example file to .env and add your database credentials

5. Create the tables in the database:

   - `npm run migrate`

   Optional: Seed the database

   - `npm run seed`

6. Start the development server:
   - `npm run start-dev`

### Run Tests

1. Migrate and seed the database:
   `npm run migrate-seed`

2. `npm test`

---
### To Do:
   Add authentication and authorisation to routes. 