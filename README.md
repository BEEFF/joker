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
GRANT ALL PRIVILEGES ON joker.* TO 'joker'@'localhost';
FLUSH PRIVILEGES;
exit

## Start the application
node app.js
```

# Testing
The application has been succesfully tested on Ubuntu(18). But should work on windows or MacOS. 

# TODO
 1. Create add joke functionality (captcha? )
 2. Create instant retry functionality if joke ID does not exist
 3. Add validation if server down
 4. Add validation if user internet down
 5. Add validation so user does not get same joke more than once per session
 

