# Project 5 - Travel App

## Table of Contents

- [About](#about)
- [Requirements](#Requirements)
- [APIs Used](#apis-used)
- [Libraries Used](#libraries-used)
- [Get Started](#get-started)
- [Built with](#built-with)

## About

This project is final and capstone project in the Udacity's Nanodegree program.

It is a website that allows users to plan their trips. The user can add a location and dates
and see information about the destination (like: weather and images) and save it.

## Requirements

- You need to have [Node.js](https://nodejs.org/en/) installed

## APIs Used

[Geonames] To get data of the city

[Dark Sky] To get the weather forecast data

[Pixabay] To get images of the city

## Libraries Used

[Glider.js] To add a carousel in the trips page

[skycons] To add animated weather icons

## Get Started

1. Download files or clone the repository
2. Install all dependencies
   - put `npm install` on the terminal
3. Add dist folder
   - `npm run build-prod` on the terminal
4. For use all APIs (Geonames, Dark Sky and Pixabay) you must signing up to get an API key
   - Create a `.env` file that contain your `GEONAMES_KEY`, `DARK_SKY_API` and `PIXABAY_API_KEY`
5. For start the server you should run that command in the terminal: `npm start`
   - The server should start on http://localhost:3001/ on your browser

## Built with

- HTML
- SASS
- Vanilla Javascript
- Express
- Webpack
- Node.js
- Jest
- Workbox
