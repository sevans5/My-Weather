const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
var cors = require('cors')


const app = express()
const port = (process.env.PORT || 5000);
dotenv.config()
app.use(cors())



// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
app.get('/weather/:city', async (req, res) => {
    console.log(req.params.city)
    await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${process.env.weatherAPIKey}`, {
    }).then(response => {
        console.log(response.data)
        
        res.send({data: response.data})
    }).catch(err => {
        if(err.response.data.cod == '404'){
            res.send( {data: "404"} )
        }
    })
})

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`listening on port ${port}`))










