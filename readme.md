# Weather app

Simple weather app that uses yahoo weather api

## Features

- Uses angular, webpack, ui-router, bootstrap, jade
- Does not uses gulp, all commands in npm
- Has simple unit-tests
- Deep linking
- Search for places

## Installing the app

1. Install node.js downloading the binnaries from the node.js website
2. Run `npm install`

## Using the app

`npm run start`: start the webpack server, app is running in port 8080

`npm run build`: builds the app

`npm run watch`: watch for changes and rebuilds the app

`npm run test`: does the unit-tests after every change

## Comments

* The scafolding of the application was done using angular-webpack-flow
* Tests are superficial and a production application would need much more edge scenarios that could never crash de app
* Needs improvement in design, the focus was on application structure
* Needs proper error handling
* Needs improvement in respinsive pagination

## Bugs and limitations

* Very little functionality is implemented, the focus was on application structure
* Does not have end to end tests
* The system does not have persistency, all values are in memmory
* This simple version only allows a location at a time
* Code names are not allways consistent, cities actually can be any location
* Search of city names needs improvement on the query format, sometimes does not return any value
* Previous search requests should be checked and resolved before creating new ones