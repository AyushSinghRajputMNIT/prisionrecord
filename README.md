# Prison Records

Please run the following instructions:
<br>
```
npm install
```

## Create a user in MySQL using following command in MySQL Shell
```
create user jailer@localhost identified by 'password';
grant all privileges on *.* to jailer;
```
## Configure Database

```
npm run databaseConf
```
## Adding dummy data 
Note - If you want to use your own data you will need to manually delete the present data and add your own
Caution - Please add your own users using the '/v1/api/users/signup' route, as the passwords are encrypted (you can add with hash though). If you are adding 'admin' yourself, then manually change its role in the DB using shell.
```
$ /* add a make file for initializing data*/
```

Contributers - kushwahahimanshu22 | AyushSinghRajputMNIT | KapilRaWT
