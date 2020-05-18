/*    sudo su postgres    */
/*    psql    */

CREATE USER dbadmin WITH PASSWORD 'U7cFDn4WpNGrhD68j7doom8F';

/*    \q    */
/*    psql -d postgres -U dbadmin    */

CREATE DATABASE esdb_main;
REVOKE ALL ON DATABASE esdb_main FROM PUBLIC;

CREATE USER esauth WITH PASSWORD '4W3NEW6s82RmweQCfAi2wCwg';

/*    \q   */
/*    psql -d esdb_main -U dbadmin   */

CREATE TABLE appuser(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(254), 
    pass VARCHAR(64),
    is_active BOOLEAN,
    created_on TIMESTAMP WITH TIME ZONE 
);

GRANT CONNECT ON DATABASE esdb_main TO esauth;
GRANT ALL PRIVILEGES ON TABLE appuser TO esauth;
GRANT USAGE, SELECT ON SEQUENCE appuser_user_id_seq TO esauth;

/*
USEFUL COMMANDS QR:

psql --help
psql -d database -U user
psql -h host -d database -U user
psql -U user -h host "dbname=db sslmode=require"

\?                    show all available psql commands
\du                   list users
\l                    list all databases in current PostgreSQL server
\c                    connect to database
\q                    quit psql
\c dbname username    connect to different db
\dt                   list all tables in current database
\d table_name         describe a table
\dn                   list available schema (relations, etc)
\df                   list available functions in the current database
\dv                   list available views
\du                   list all users and their roles
\g                    execute previous command (esp. useful for long queries etc)
\s                    display the command history
\s filename           save command history to a file
\i filename           execute psql commands from a file
\h statement          get help with specific PostgreSQL statment, e.g. "Alter Table"

1. Grant CONNECT to the database:

GRANT CONNECT ON DATABASE database_name TO username;
2. Grant USAGE on schema:

GRANT USAGE ON SCHEMA schema_name TO username;
3. Grant on all tables for DML statements: SELECT, INSERT, UPDATE, DELETE:

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA schema_name TO username;
4. Grant all privileges on all tables in the schema:

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA schema_name TO username;
5. Grant all privileges on all sequences in the schema:

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA schema_name TO username;
6. Grant all privileges on the database:

GRANT ALL PRIVILEGES ON DATABASE database_name TO username;
7. Grant permission to create database:

ALTER USER username CREATEDB;
8. Make a user superuser:

ALTER USER myuser WITH SUPERUSER;
9. Remove superuser status:

ALTER USER username WITH NOSUPERUSER;
Those statements above only affect the current existing tables. To apply to newly created tables, you need to use alter default. For example:

ALTER DEFAULT PRIVILEGES
FOR USER username
IN SCHEMA schema_name
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO username;

https://tableplus.com/blog/2018/04/postgresql-how-to-grant-access-to-users.html

*/