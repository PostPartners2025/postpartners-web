const express = require('express');
const middleware = require('../../middleware');
const createRoom = require('./create-room');
const updateRoomStatus = require('./update-room-status');
const createRoomCodes = require('./create-room-codes');

const videoConferenceRouter = express.Router();

videoConferenceRouter.post('/create-room', middleware.auth, createRoom);
videoConferenceRouter.post('/update-room-status', middleware.auth, updateRoomStatus);
videoConferenceRouter.post('/create-room-codes', middleware.auth, createRoomCodes);

module.exports = videoConferenceRouter;
