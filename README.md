# joker
Full Stack Developer Task for Fathom3. Read out the funniest of jokes, expect nothing less. 

# Linux Install
Use the following commands to setup the web application in linux. This means installing MySQL server and installing the packages required. 

```
## Login as root, setup the MySQL server on localhost
sudo su
apt install mysql-server
mysql
CREATE USER 'joker'@'localhost' IDENTIFIED BY 'joker123';
GRANT ALL PRIVILEGES ON * . * TO 'joker'@'localhost';
FLUSH PRIVILEGES;
exit

## Start the application
node app.js
```

# Testing
The application has been succesfully tested on Ubuntu(18). But should work on windows or MacOS. 

# TODO
 1. Set privalleges to only the joker database
 2. Add category filter
 3. Create add joke functionality (captcha? )
 4. Fix joke not found (i.e try again)
 - 
 

