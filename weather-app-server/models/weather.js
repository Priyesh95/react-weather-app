const request = require('request-promise')

const API_KEY = '594386bb16c6d8b7d763967ebf4b5530';

class Weather{

    static retrieveByCity(city,callback){
        request({
            uri:`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`,
            json:true

        }).then(function(res){
            callback(res);
        }).catch(function(err){
            console.log(err);
            callback({error: 'Could not reach Weather Map API.'});
        });
    }   
}

module.exports = Weather;