# edinburrito
Ever wanted to find burritos in Edinburgh? This is the web app for you.
A full-stack single-page web application using the Yelp API to find business information and the Google Maps API for geolocation, maps and routing. Businesses can be sorted by various criteria (distance, price, rating, etc.) and users can write notes on places they visit which are persisted locally, and 'favourite' them with stars.

Installation on Mac/Linux
1) Clone the repo into the desired folder.
2) Create a file called api_creds.js and place it in the Edinburrito folder. 
3) You will need your own credentials for accessing the Yelp API which provides all of the data on nearby Burrito places. Follow the instructions commented out in the yelp.js file and the yelp website to get your own credentials. 
4) do `npm install` in both the client and Edinburrito folder. On Linux remember to prefix these with sudo.
5) In client folder `npm install webpack@2.2.0-rc.0`
6) Still in client folder `npm run bundle`
7) Open a new terminal window if you haven't already, navigate into Edinburrito folder and `npm install nodemon`
8) When finished installing `npm start` will run the server.
9) Open a web browser and go to http://localhost:3000/

Search for burritos!