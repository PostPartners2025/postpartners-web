import React from 'react';
import classNames from 'classnames';

import { FormattedMessage } from '../../../util/reactIntl';
import { ExternalLink, Heading } from '../../../components';

import AddressLinkMaybe from './AddressLinkMaybe';

import css from './TransactionPanel.module.css';

const Modality = ({ modalityName, customerLink, providerLink, isCustomer }) => {
  return (
    <div className={css.modality}>
      <Heading as="h3" rootClassName={css.sectionHeading}>
        <FormattedMessage id="TransactionPanel.modalityHeading" />:{' '}
        <small style={{ fontWeight: 600 }}>{modalityName}</small>
      </Heading>
      {customerLink ? (
        <p>
          <ExternalLink href={isCustomer ? customerLink : providerLink} className={css.meetingLink}>
            Your meeting link
          </ExternalLink>
        </p>
      ) : null}
    </div>
  );
};

// Functional component as a helper to build ActivityFeed section
const BookingLocationMaybe = props => {
  const {
    className,
    rootClassName,
    listing,
    showBookingLocation,
    protectedData,
    isCustomer,
  } = props;
  const classes = classNames(rootClassName || css.bookingLocationContainer, className);
  const { modalityName, customerLink, providerLink } = protectedData || {};

  if (showBookingLocation && modalityName !== 'virtual') {
    const location = listing?.attributes?.publicData?.location || {};
    return (
      <div className={classes}>
        <Heading as="h3" rootClassName={css.sectionHeading}>
          <FormattedMessage id="TransactionPanel.bookingLocationHeading" />
        </Heading>
        <div className={css.bookingLocationContent}>
          <AddressLinkMaybe
            linkRootClassName={css.bookingLocationAddress}
            location={location}
            geolocation={listing?.attributes?.geolocation}
            showAddress={true}
          />
        </div>
      </div>
    );
  }

  if (modalityName) {
    return (
      <Modality
        modalityName={modalityName}
        customerLink={customerLink}
        providerLink={providerLink}
        isCustomer={isCustomer}
      />
    );
  }

  return null;
};

export default BookingLocationMaybe;
