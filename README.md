# OpenAI-chatbot
This project uses the OpenAI API to implement a chatbot powered by Chat-GPT. Consists of two parts, a frontend for user interaction and a backend for handling the connection with the API.

## Project Setup

### Installation
To get started with using the application on your own machine we first need to install the project dependencies. This is done separately for the frontend and the backend.
Begin with navigating to the frontend folder in your terminal and run the following command:
```bash
npm install
```
Now proceed to the backend folder in your terminal and run the same command.

### Start the app
In the backend folder run the following command to start the backend server:
```bash
node server.js
```
After this open another terminal and navigate to the frontend folder, in the root of this folder run the following command:
```bash
npm run dev
```
Now both parts of the application should be running. Open your browser and navigate to localhost:5173 to see the app.


## Frontend
Frontend consists of two parts
- Initialization of the chatbot using a custom hook `useChatbot`.
  - This hook sets up the connection with the backend to handle making the prompts to the API.
- Rendering of the user interface

### User interface
The app has a clean and simple user interface.

<![alt](interfaceExample.png)>

The prompts and the responses from the API are both displayed in the main window, where the user can scroll through all the prompts and responses of the current session.
### Interaction with backend and OpenAI API
The frontend makes a request with the prompt provided by the user to the backend. 
This is to maintain security and keep the actual API key to the OpenAI API secure. 
A form is used to handle the user input, with appropriate input checks. 

## Backend
The backend consists of an express server with just one route. This route recieves the request from the frontend, the user, to make a prompt to the API and then returns the response to the user. The code is divided into a series of calls to handle the request and a function to separate the making of the request to the API from the handling of the user request. 
