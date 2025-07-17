// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
/*app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
*/
//Logica de la API
app.get("/api/:date_string?", function (req, res) {
  let dateString = req.params.date_string;
  let date;

  if (!dateString) {
    date = new Date();
  } else if (/^\d+$/.test(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" }); //codigo necesario para el ejercicio de freeCodeCamp, agrego el mio personalizado.
    //return res.json({ unix: null, utc:"Invalid Date,", error:"Please provide a valid date string that can be parsed with the Force." });
  };

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is alive in the Force' + listener.address().port);
});
