const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://posts-clusterip-srv:4001/events', event); //posts
    axios.post('http://comments-srv:4002/events', event); // comments
    axios.post('http://query-srv:4003/events', event); // query
    axios.post('http://moderation-srv:4004/events', event); // moderation

    res.send({status: 'OK'});
});

app.get('/events', (req, res) => {
    res.send(events);
});

// listen on event-bus port
app.listen(4006, () => {
    console.log('Listening on port 4006');
})