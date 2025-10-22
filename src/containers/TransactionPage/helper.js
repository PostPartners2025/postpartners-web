const { generateVideoRoomCodes, updateRoom, createVideoRoom } = require('../../util/api');

const { REACT_APP_MEETING_SUB_DOMAIN } = process.env;

const getVideoParams = async (tx, params) => {
  const roomRes = await createVideoRoom({
    listingTitle: tx.listing.attributes.title,
    txID: tx.id.uuid.replace(/-/g, '').slice(0, 24),
  });

//   await updateRoom({
//     roomId: roomRes.id,
//     isEnable: true,
//   });

  const roomCodes = await generateVideoRoomCodes({
    roomId: roomRes.id,
  });

  return {
    ...params,
    protectedData: {
      ...(params?.protectedData || {}),
      customerLink: `${REACT_APP_MEETING_SUB_DOMAIN}/video-conference?code=${
        roomCodes.find(elm => elm.role === 'guest').code
      }&&txID=${tx.id.uuid}`,
      providerLink: `${REACT_APP_MEETING_SUB_DOMAIN}/video-conference?code=${
        roomCodes.find(elm => elm.role === 'host').code
      }&&txID=${tx.id.uuid}`,
      roomId: roomRes.id,
    },
  };
};

export { getVideoParams };
