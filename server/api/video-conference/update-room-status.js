const { handleError, getHmsSdk } = require('../../api-util/sdk');

const updateRoomStatus = async (req, res) => {
  try {
    const { roomId, isEnable = false } = req.body;
    const hms = getHmsSdk();

    const room = await hms.rooms.enableOrDisable(roomId, isEnable);

    res.status(200).json(room);
  } catch (error) {
    console.log(error, 'Error updating room status!!');
    handleError(res, error);
  }
};

module.exports = updateRoomStatus;
