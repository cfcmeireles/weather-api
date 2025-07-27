const request = require('request');

const getWeather = async (req, res) => {
    const city = req.params.city;
    
    request(`${process.env.BASE_URL}${city}${process.env.API_KEY}`, (error, response, body) => {
        if (error) {
            console.error('Request error:', error);
            return;
        }
        try {
            const data = JSON.parse(body);
            console.log('Weather data:', data);  
            res.json(data)
        } catch (err) {
            console.error('Error:', err);
        }
    });
}

module.exports = getWeather;