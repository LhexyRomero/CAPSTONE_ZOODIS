# CAPSTONE_ZOODIS

<b>WEB TOOLS</b>
<ul>
  <li> HTML(HTML5) </li>
  <li> Cascading Style Sheets </li>
  <li> Javascript </li>
  <li> EJS </li>
  <li> Node.js (JavaScript) <i>Express JS Framework</i></li>
  <li> SQL (MySQL) </li>
</ul>

# Tools
1. Install Nodejs and NPM - check cmd if installed `node --version` and `npm --version`
1. Install MySQL

## How to setup
MYSQL setup
1. using mysql client, login using your root credential
1. `create database zoodis` then exit
1. 3 ways to load data into mysql
 -  `mysql -u root "zoodis" < ./zoodis.sql` to load the sql script into zoodis
 - go to the File option and then click Open SQL Script in myqslworkbench
 - use mysql command line client and `use zoodis` then `source <sql file absolute path location>`
APP setup
1. setup mysql connection credentials in file `js/connection.js`, check password, db_name, user etc.
1. go to project folder
1. in CLI run `npm install`
1. `npm start`


## Development refresh
- Run something like this `mysql -u root -e "drop database basilio; create database basilio;"; mysql -u root "basilio" < ./zoodis.sql`