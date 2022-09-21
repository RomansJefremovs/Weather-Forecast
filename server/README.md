# weather_report
Weather Report Web Service serving fake (random) weather data for Horsens, Aarhus and Copenhagen. It serves three kinds of data: Historic data, forecasts, and warnings (see below). The historical data is generated when the server starts and and will not change unless new data is posted. The forecasts are regenerated periodically (see below). The warnings are generated regularly, independent on other activity and unrelated to other data.

You can run the server by typing the following in the root of the project:
```
	npm start
  ```
This will start the server with an update period of 10 minutes. That is, every 10 minutes the forecast and the warnings are regenerated. The historical data will not be affected.

If you want the server to regenerate data sooner, give as an argument the number of seconds between updates. That is,
```
	npm start 60
  ```
will start the server with updates every minute.

### Web Service
Running the server will start a web service on `http://localhost:8080/` with the following services:

#### `GET /data`

This returns all historical data as a JSON array. The format is as follows:
```
[{"type": "temperature",
  "time": "2019-07-30T10:07:00.000Z",
  "place": "Aarhus",
  "value": 21,
  "unit": "C"},
 {"type": "precipitation",
  "time": "2019-07-30T10:07:00.000Z",
  "place": "Aarhus",
  "value": 0,
  "unit": "mm",
  "precipitation_type":"rain"},
 {"type": "wind speed",
  "time": "2019-07-30T10:07:00.000Z",
  "place": "Aarhus",
  "value": 2,
  "unit": "m/s"
  "direction": "North"},
{"type": "cloud coverage",
  "time": "2019-07-30T10:07:00.000Z",
  "place": "Aarhus",
  "value": 100,
  "unit": "%"}]
  ```
All times are in UTC code and follows the ISO 8601 format.

#### `GET /data/<place>`
This returns the data only for the given place. I.e. GET /data/Horsens returns the data for Horsens in the same format as above.

#### `POST /data`
Adds historical weather data. The data should be the same format as returned by GET.

#### `GET /forecast`

This returns all predictions as a JSON array. The format is as follows:
```
[{"type": "temperature",
  "time": "2019-07-31T10:07:00.000Z",
  "place": "Aarhus",
  "from": 19,
  "to": 22,
  "unit": "C"},
 {"type": "precipitation",
  "time": "2019-07-31T10:07:00.000Z",
  "place": "Aarhus",
  "from": 0.0,
  "to": 0.5,
  "unit": "mm",
  "precipitation_types": ["rain"]},
 {"type": "wind speed",
  "time": "2019-07-31T10:07:00.000Z",
  "place": "Aarhus",
  "from": 4,
  "to":6,
  "unit": "m/s",
  "directions": ["South", "Southwest"]},
{"type": "cloud coverage",
  "time": "2019-07-31T10:07:00.000Z",
  "place": "Aarhus",
  "from": 75,
  "to":100,
  "unit": "%"}]
  ```

#### `GET /forecast/<place>`
This returns the predictions only for the given place. I.e. GET /forecast/Horsens returns the predictions for Horsens in the same format as above.

#### `GET /warnings`
This returns warnings connected to the weather predictions. The format is as follows:
```
{"time": "2019/07/31T8:02:24.000Z",
 "warnings": [
   {"id": 117,
    "severity": 2,
    "prediction": {
      "type": "precipitation",
      "time": "2019-07-31T10:07:00.000Z",
      "place": "Aarhus",
      "from": 10.0,
      "to": 21.5,
      "unit": "mm",
      "precipitation_types": ["rain"]
     }
   },
   {"id": 9037,
    "severity": 3, 
    "prediction":{
      "type": "wind speed",
      "time": "2019-07-31T10:07:00.000Z",
      "place": "Aarhus",
      "from": 24,
      "to":36,
      "unit": "m/s",
      "Directions": ["South", "Southwest"]
     }
   }]
 }
  ```
The time is the server time when the response was send.

#### `GET /warnings/<id>`
This returns the current status warning with the given id. The format is:
```
{"id": 117,
 "severity": 2,
 "prediction": {
   "type": "precipitation",
   "time": "2019-07-31T10:07:00.000Z",
   "place": "Aarhus",
   "from": 10.0,
   "to": 21.5,
   "unit": "mm",
   "precipitation_types": ["rain"]
 }
}
```

If the warning has been cancelled, the service returns
```
{"id": 117,
 "severity": 0,
 "prediction": null}
  ```

#### `GET /warnings/since/<time>`
This returns the changes in warnings since the given time. The format is the same as `GET /warnings` except that cancelled warnings are send as the format described above under `GET /warnings/id`. The time must be in UTC code and follow the ISO 8601 format.

### Web Socket
The server implements a web socket on ws://localhost:8090/warnings. It accepts two messages.

### `"subscribe"`
This subscribes to the warnings. As soon as possible after the subscribtion the server will send a list of current warnings in the format described under `GET /warnings`. After this, the server will send an update everytime a warning has changed, or a new warning has happened. The format is as described under `GET /warnings/id`

If the client is already subscribed the message will be ignored.

### `"unsubscribe"`
The server will stop sending messages. No confirmation is send.

If the client isn't subscribed the message will be ignored.
