const express = require('express')
const path = require('path');

const app = express()

app.use(express.json())
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.sendFile('static/index.html', {root: __dirname});
})

const {getHouses, deleteHouses, createHouse, updatePrices} = require(`./controller.js`)
app.get(`/api/houses`, getHouses)
app.post(`/api/houses`, createHouse)
app.delete(`/api/houses/:id`, deleteHouses)
app.put(`/api/houses/:id`, updatePrices)

app.listen(4000, () => console.log(`Server running on port 4000`))