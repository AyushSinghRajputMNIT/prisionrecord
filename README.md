# Prison Records

### Note: Rename 'config.env.template' to 'config.env' before running

Please run the following instructions:
<br>
```
npm install
```

## Create a user in MySQL using following command in MySQL Shell (Replace localhost with your domain if required)
```
create user jailer@localhost identified by 'password';
grant all privileges on *.* to jailer@localhost;
```
## Configure Database

```
npm run databaseConf
```
## Adding dummy data 
Note - If you want to use your own data you will need to manually delete the present data and add your own
Caution - Please add your own users using the '/v1/api/users/signup' route, as the passwords are encrypted (you can add with hash though). If you are adding 'admin' yourself, then manually change its role in the DB using shell.
```
npm run insertDummy
```
Note - For Admin, Username : admin@prison.com, Password: admin

Contributers - <a href='https://www.github.com/kushwahahimanshu22'>kushwahahimanshu22</a> | <a href='https://www.github.com/AyushSinghRajputMNIT'>AyushSinghRajputMNIT</a> | <a href='https://www.github.com/KapilRaWT'>KapilRaWT</a>
