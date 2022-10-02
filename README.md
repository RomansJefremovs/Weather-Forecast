# SWA Assignment 
The repository consists of two separate projects:
1. client
2. server

Each individual project contains the node modules and starts in development mode separately \
in order to simulate the real life remote server.

## Client

In the client directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Server

In the server directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3080](http://localhost:3080) to view it in your browser.


## The hourly forecast for the next 24 hours
The forecast is extracted using fetch() method and can be seen in ForecastApiFetch.js 

In App.js it is called and the data from the request is assigned to the React Component, when the result array is mapped. 


## Latest data of each kind

The data extraction was achieved using XMLHttpRequest method, that can be observed in data.index.js
The getDataXHR() function is responsible for data fetching.
The latest data was implemented using the mapping of the models ( can be found in models.js), which are factory functions that use inheritance to factor out the commonalities. \
In data.index.js four functions can be observed, that are calculating min and max temp, total precipitation and average wind speed, they are named accordingly.



