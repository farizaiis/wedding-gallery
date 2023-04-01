# Wedding Gallery

Tech Stack Used : Javascript, Express, Sequelize, MySQL, CORS, JOI, JWT, Nodemon, Moment, Bcrypt

How to run :
- Clone this Repo
- Go to repo has been clone
- Install dependencies (type "npm i" in command line)
- Create DB on MySQL
- Create env. file (variable same on env-template)
- Set Value on env. file same as DB you've already create
- Use "npx sequelize db:migrate" on command
- And final just Use "npm run dev" on command
- If you can visit localhost:8000 and get response like this "{"message":"Server running","serverTime":"2023-04-01T09:07:50.248Z"}" so you are ready to test the project. Goodluck :)

=======================================================================================

1. CHALLENGE #1 - ALGORITHM

For challenge number 1, I build the function on REST API.
I tought on the example it build a square base on "Number's Input"
example number 5 : 

1 2 3 4 5

2 4 6 8 10

3 6 9 12 15

4 8 12 16 20

5 10 15 20 25

So, on the answer I give a query params as "number" so you can input whatever number you want.

Endpoint : /api/v1/challenge?number={number_input}
Method : GET


2. CHALLENGE #2 - CODE THE API

Its just basic API (include database, error handler, & validation) for Authentication as Admin and Manage Data for Gallery Wedding. For database, there is only Two Tables in Database. One Table for Admin and another one for Gallery Wedding. You can test one by one base on list below : 

* Register Admin
endpoint : /api/v1/admin/register

method : POST

body : fullname, email, password

params : -

token type : -

token : not required

* Login Admin
endpoint : /api/v1/admin/login

method : POST

body : email, password

token type : -

token : not required

* Logout Admin
endpoint : /api/v1/admin/login

method : POST

body : email, password

token type : Bearer Token

token : not required

* Retrieve All Data Gallery
endpoint : /api/v1/guest

method : GET

body : -

token type : Bearer Token

token : not required (required for Admin)

* Retrieve Detail Gallery By Id
endpoint : /api/v1/guest/:id

method : GET

body : -

params : id (id guest_wedding)

token type : Bearer Token

* Create Gallery
endpoint : /api/v1/guest

method : POST

body : -

params : -

token type : -

token : not required

* Update Gallery By Id
endpoint : /api/v1/guest/:id

method : PUT

body : -

params : id (id guest_wedding)

token type : Bearer Token

token : required

* Delete Gallery By Id (SOFT DELETE)
endpoint : /api/v1/guest/:id

method : DELETE

body : -

params : id (id guest_wedding)

token type : Bearer Token

token : required
