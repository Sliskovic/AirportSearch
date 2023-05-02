# Project Name

> AirportSearch

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Project Status](#project-status)

## General Information

-  Web application for Airport Searching using Angular and RxJS.
-  API documentation used for this task: https://developers.amadeus.com/self-service/category/air/api-doc/airport-and-city-search/api-reference

## Technologies Used

- Angular - version 15.2.7
- RxJS - version 7.8.0


## Features

- Search Page: returns a list of airports matching a given keyword. Searching starts automatically at 300 milliseconds after something is written to the input.
- Airport List: The list contains the first 5 search results and each result item has a button that leads to a page with detailed information about the airport. 
- Airport Detail Page: The page consists of a form with information about the airport and a button that returns you to the search page and 
button that saves form data in LocalStorage.
- Application checks if there is any changed data about a particular airport in LocalStorage, if so, it displays that information. If the data does not exist, the application retrieves the data through the API.
- Lazy-loading feature modules

## Setup

In orded to run this project first clone this repository with following command:

`git clone https://github.com/Sliskovic/AirportSearch`

Install the dependencies with the following command

`npm install`

After that run the project from the root with

`npm start`


## Project Status

Project is: _finished_

