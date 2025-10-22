const { handleError, getHmsSdk } = require('../../api-util/sdk');

const createRoomCodes = async (req, res) => {
  try {
    const { roomId } = req.body;
    const hms = getHmsSdk();

    const room = await hms.roomCodes.create(roomId);

    res.status(200).json(room);
  } catch (error) {
    console.log(error, 'Error creating room code!!');
    handleError(res, error);
  }
};

module.exports = createRoomCodes;
