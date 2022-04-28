# Restaurat_RecSys

## Backend Setup
In the main ./app directory, run the command
```
<<<<<<< HEAD
pip3 install requirement.txt
=======
pip3 install -r requirements.txt
>>>>>>> 1c59e15b5bae7b45556ab897951b1d72306b1d0a
```
to install all the dependencies needed for back-end

## Front-end Setup
In the ./app/front-end directory, ru the command
```
npm install
```
to install all the dependencies needed for front-end

## Testing the Application
There are 2 server needed to run the application:
### 1. Backend server
In the ./app directory, run command
``flask run``
it should return back-end server running in ``http://127.0.0.1:5000``

### 2. Frontend server
In the ./app/front-end directory, run command
``npm start``
to run the front-end server, and this is where user will be interacting with the application

Enjoy!
