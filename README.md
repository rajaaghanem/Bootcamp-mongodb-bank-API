# mongodb-bank-API
## User Object
Property | Type| Description
------------- | ------------- | -------------
userId  | String  | Unique id
passId  | String  | passport id
cash | Number | Default 0
credit  | Number | Default 0

## Create User
Creates a new user with the given passId and returns the user object.

**URL**:
/users

**Method**: Post

**URL Params** : none

### Parameters - Request Body Parameters
Property | Type| Description
------------- | ------------- | -------------
userId  | String  | Required
cash | Number | Optional, Default 0
credit  | Number | Optional, Default 0

## Show All Users
Returns json data about all users.

**URL**:
/users

**Method**: Get

**URL Params** : none

## Deposite cash
Deposit cash to a user account

**URL**:
/users/deposite/:id

**Method**: Patch

**URL Params** : userId

### Parameters - Request Body Parameters
Property | Type| Description
------------- | ------------- | -------------
amount | Number  | Required

## Deposite credit
Deposit credit to a user account

**URL**:
/users/credit/:id

**Method**: Patch

**URL Params** : userId

### Parameters - Request Body Parameters
Property | Type| Description
------------- | ------------- | -------------
amount | Number  | Required

## Withdraw money
Withdraw money from a user account

**URL**:
/users/withdraw/:id

**Method**: Patch

**URL Params** : userId

### Parameters - Request Body Parameters
Property | Type| Description
------------- | ------------- | -------------
amount | Number  | Required

## Trensfer money
Transfer money from one user to another

**URL**:
/users/transfer/:id

**Method**: Patch

**URL Params** : userId

### Parameters - Request Body Parameters
Property | Type| Description
------------- | ------------- | -------------
amount | Number  | Required
id | String  | Required, the receiver id


