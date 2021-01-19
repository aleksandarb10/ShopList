
Configuration parameters for Mongo are in the file config/default.json

Check whitelist for IP adresses in MongoAtlas

For starting server in terminal nodemon src/server.ts

port: http://localhost:5000

Register user: POST http://localhost:5000/api/user (email, password)

Login and get auth token: POST http://localhost:5000/api/auth (email, password)

Returned token is needed to be saved in headers (in Postman) as x-auth-token

Other URL's:

GET : http://localhost:5000/api/auth -  get authenticated user



PUT : http://localhost:5000/api/user - update current user password

GET :  http://localhost:5000/api/user - get current user info

GET : http://localhost:5000/api/user/all - get list of all users



POST : http://localhost:5000/api/list - create new list

PUT : http://localhost:5000/api/list/id - update list finded by id

GET : http://localhost:5000/api/list/id - get list by id

GET : http://localhost:5000/api/list/all - get all list

GET : http://localhost:5000/api/list/userlist - get all list from one user

DELETE : http://localhost:5000/api/list/id - delete list by id





