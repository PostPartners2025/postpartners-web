const { handleError, getHmsSdk } = require('../../api-util/sdk');

const createRoom = async (req, res) => {
  try {
    const { listingTitle, txID } = req.body;
    const hms = getHmsSdk();

    const roomCreateOptions = {
      id: txID,
      name: txID,
      description: listingTitle,
      template_id: process.env.VIDEO_CONFERENCE_TEMPLATE_ID,
      enabled: true,
    };
    const room = await hms.rooms.create(roomCreateOptions);

    console.log('Room created successfully:', JSON.stringify(room));
    res.status(200).json(room);
  } catch (error) {
    console.log(error, 'Error creating room!!');
    handleError(res, error);
  }
};

module.exports = createRoom;
