![Banner](banner2.png)

## Database Structure
![Database](OposicionBomberDB.png)


## General Endpoints
```bash
Home —> ./
Login —> ./login
Signup —> ./signup
```

## User endpoints
```bash
u. profile         —> ./user/:id
u. new test        —> ./user/:id/newtest
u. test list       —>  ./user/:id/testlist
u. test show       —> ./user/:id/test/:test_id
u. question        —> ./user/:id/test/:test_id/question/:question_id
u. messages        —> ./user/:id/messagelist
u. message         —> ./user/:id/message/:message_id
```

## Admin endpoints
```bash
a. profile        —> ./admin/:id
a. new test       —> ./admin/:id/newtest
a. test list      —> ./admin/:id/tests
a. test show      —> ./admin/:id/test/:test_id
a. questions list —>./admin/:id/questions
a. new question   —> ./admin/:id/newquestion
a. messages       —> ./admin/:id/messages
a. message        —> ./admin/:id/message/:message_id
a. payments list  —> ./admin/:id/payments
a. payment        —> ./admin/:id/payment/:id
```