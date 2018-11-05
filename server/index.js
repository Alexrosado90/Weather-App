const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const http = require('http');

let db = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
    console.log('New client connected'),
    setInterval(() => getApiAndEmit(socket), 40000);
    socket.on('disconnect', () => console.log('Client disconnected'));
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/cities', require('./api/cities'));
app.use('/api/weather', require('./api/weather'));
app.use('/api/forecast', require('./api/forecast'));


app.listen(PORT, () => {
    console.log(`server listening on ${PORT}!`);
})

db.query('SELECT NOW()', (err, res) => {
    if (err.error)
    return console.log(err.error);
    console.log(`PostgreSQL connected: ${res[0].now}.`)
});

module.exports = app;