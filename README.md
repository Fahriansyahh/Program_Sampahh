# Program_Sampahh

# SERVER TESTING

Ini adalah proyek untuk menguji server saya dan mendalami segala aspek yang berkaitan dengan server. Proyek ini akan terus diperbarui dengan tujuan membangun frontend yang
menggunakan antarmuka pengguna yang sederhana dan kode yang efisien untuk menguji server.

## Nodejs version
 node js v18.15.0

### `npm i`
untuk menginstall semua package yang ada

### `npm start`

## Api

### AUTH
POST http://localhost:4000/Jwt/v1/Auth
username 
password

GET http://localhost:4000/Jwt/v1/Auth

### OAUTH
GET http://localhost:4000/auth/google

GET http://localhost:4000/auth/google/callback

GET  http://localhost:4000/auth/github/callback

GET http://localhost:4000/login/success

GET http://localhost:4000/logout

GET http://localhost:4000/login/failed

### user 


PUT http://localhost:4000/Jwt/v1/Auth?username=username
username 
password

DELETE http://localhost:4000/Jwt/v1/Auth?username=username

SEARCH USER
GET http://localhost:4000/Jwt/v1/Auth/Auth/Search?search=username


### typesofwastes
GET http://localhost:4000/typesofwaste/v1/GetAll

POST http://localhost:4000/typesofwaste/v1/Create

PUT  http://localhost:4000/typesofwaste/v1/Update?waste=garbagetypename

DELETE http://localhost:4000/typesofwaste/v1/Delete?waste=garbagetypename


SEARCH

GET http://localhost:4000/typesofwaste/v1/Search?search=garbagetypename

Runs the app in the development mode.\

Open [http://localhost:4000](http://localhost:4000)

### transactions
CREATE
POST http://localhost:4000/transactions/v1/Create?userId=username&wasteId=garbagetypename&number=numberkilograms

SEACRH ENGINE

GET http://localhost:4000/transactions/v1/GetAll?search=trashtypeid||numberkilograms||totalprice||transactiondate

CHART JS

GET http://localhost:4000/transactions/v1/Chart

