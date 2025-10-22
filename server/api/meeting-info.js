const { getIntegrationSdk } = require('../api-util/sdk');

const getProfileDisplayName = (id, included) =>
  included.find(item => item.id.uuid === id)?.attributes?.profile?.displayName ?? 'Unknown';

module.exports = async (req, res) => {
  try {
    const { txID, code } = req.query;

    if (!txID || !code) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }

    const iSdk = getIntegrationSdk();
    const {
      data: { data, included },
    } = await iSdk.transactions.show({
      id: txID,
      include: ['customer', 'provider', 'listing', 'booking'],
    });

    const { customerLink, providerLink } = data.attributes.protectedData;
    const isCustomer = customerLink.includes(code);
    const isProvider = providerLink.includes(code);

    if (!isCustomer && !isProvider) {
      return res.status(401).json({ error: 'Invalid code.' });
    }

    const {
      attributes: { lastTransition },
      relationships: {
        customer: {
          data: {
            id: { uuid: customerId },
          },
        },
        provider: {
          data: {
            id: { uuid: providerId },
          },
        },
        booking: {
          data: {
            id: { uuid: bookingId },
          },
        },
      },
    } = data;

    const name = isCustomer
      ? getProfileDisplayName(customerId, included)
      : getProfileDisplayName(providerId, included);

    const bookingTimeDetails = included.find(item => item.id.uuid === bookingId)?.attributes ?? {};

    res.status(200).json({
      name,
      bookingTimeDetails,
      lastTransition,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
