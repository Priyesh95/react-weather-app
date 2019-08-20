const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

var db = require('./database');
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(bodyparser.json())

app.use('/api/cities',require('./api/cities'));
app.use('/api/weather',require('./api/weather'));

if (ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../weather-app-client/build')));
    app.use((req, res) => {
      res.sendFile(path.join(__dirname, '../weather-app-client/build/index.html'));
    });
  }

app.listen(PORT,() => {
    console.log(`server listening on ${PORT}!`);
});


db.query('SELECT NOW()', (err,res) => {
    if(err.error)
        return console.log(err.error);
    console.log(`POSTGRESQL CONNECTED ${res[0].now}`);
})
module.exports = app;