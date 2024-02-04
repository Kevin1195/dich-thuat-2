import initWebRouter from './src/api/web';

import express from 'express';
import createError from 'http-errors';
import Helper from './helpers';
require('dotenv').config();
import cors from 'cors';
import cronJob from './src/cron';
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');
const { Server } = require('socket.io');
const WebSocket = require('ws');
// import { createAdapter } from '@socket.io/redis-adapter';
// import { createClient } from 'redis';
// const { createAdapter } = require('@socket.io/cluster-adapter');
// const { setupWorker } = require('@socket.io/sticky');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

//cronJob();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(express.static('./src/public'));

initWebRouter(app);

app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist.'));
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message,
    });
});

/****************************************************** */

const port = process.env.PORT || 8000;

const USE_SSL = false;

let httpServer = null;

if (!USE_SSL) {
    httpServer = require('http').createServer(app);
} else {
    let options = Helper.ssl;
    httpServer = require('https').createServer(options, app);
}
const wss = new WebSocket.Server({ server: httpServer });

wss.on('connection', (ws) => {
    // console.log('A new client Connected!');
    ws.on('message', (data) => {
        // ws.send('đoán xem');
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: false });
            }
        });
    });
});

// console.log(process.env.DOMAIN.split(','));
// const io = new Server(httpServer, {
//     path: '/mysocket',
//     cors: {
//         origin: process.env.DOMAIN.split(','),
//         methods: ['GET', 'POST'],
//     },
// });
// io.adapter(createAdapter());
// setupWorker(io);

// io.on('connection', (socket) => {
//     socket.on('withdraw', (data) => {
//         socket.broadcast.emit('receive_withdraw', data);
//     });
// });

httpServer.listen(port, () => {
    console.log('Server start port: ' + port);
});

// require('./websocket/index.js');
