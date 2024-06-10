nodemon app.js

POST  http://localhost:3000/users/register = register new user
GET  http://localhost:3000/users/ = get all registered users
GET  http://localhost:3000/users/mewzyk = get user: mewzyk (case sensitive)
DELETE  http://localhost:3000/users/Mewzyk = delete user: mewzyk
PUT   http://localhost:3000/users/mewzyk = update user: mewzyk


{
    "id": "mewzyk",
    "username": "Mewzyk",
    "firstName": "Ryan",
    "lastName": "Pallasigue",
    "address": "Engineers hill",
    "occupation": "Backend Dev",
    "birthdate": "1998-05-29T00:00:00.000Z",
    "maritalStatus": "Single",
    "sex": "Male",
    "uuid": "5e740092-2bc4-4d01-9bfa-09bbcff9fae4"
}
