/*    sudo su postgres    */
/*    psql    */

CREATE USER dbadmin WITH PASSWORD 'U7cFDn4WpNGrhD68j7doom8F';

/*    \q    */
/*    psql -d postgres -U dbadmin    */

CREATE DATABASE es_dbmain;
REVOKE ALL ON DATABASE es_dbmain FROM PUBLIC;

CREATE USER es_authusr WITH PASSWORD '4W3NEW6s82RmweQCfAi2wCwg';

/*    \q   */
/*    psql -d esdb -U dbadmin   */

CREATE TABLE appuser(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(64),
    email VARCHAR(254), 
    pass VARCHAR(64),
    is_active BOOLEAN,
    created_on TIMESTAMP WITH TIME ZONE 
);

GRANT CONNECT ON DATABASE es_dbmain TO es_authusr;
GRANT ALL PRIVILEGES ON TABLE appuser TO es_authusr;

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

*/