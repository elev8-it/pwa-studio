import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string, bool, func } from 'prop-types';
import BillingAddress from '@magento/venia-ui/lib/components/CheckoutPage/BillingAddress';

import { useCashondelivery } from '../talons/useCashondelivery';
import defaultClasses from './cashondelivery.css';
import { FormattedMessage } from 'react-intl';

/**
 * The CheckMo component renders all information to handle cashondelivery payment.
 *
 * @param {String} props.payableTo shop owner name where you need to send.
 * @param {String} props.mailingAddress shop owner post address where you need to send.
 * @param {Boolean} props.shouldSubmit boolean value which represents if a payment nonce request has been submitted
 * @param {Function} props.onPaymentSuccess callback to invoke when the a payment nonce has been generated
 * @param {Function} props.onDropinReady callback to invoke when the braintree dropin component is ready
 * @param {Function} props.onPaymentError callback to invoke when component throws an error
 * @param {Function} props.resetShouldSubmit callback to reset the shouldSubmit flag
 */
const Cashondelivery = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const { resetShouldSubmit, onPaymentSuccess, onPaymentError } = props;

    const {
        onBillingAddressChangedError,
        onBillingAddressChangedSuccess
    } = useCashondelivery({
        resetShouldSubmit,
        onPaymentSuccess,
        onPaymentError
    });

    return (
        <div className={classes.root}>
            <p className={classes.note}>
                <FormattedMessage
                    id={'cashondelivery.note'}
                    defaultMessage={
                        'Note: You will pay for your order in cash upon delivery.'
                    }
                />
            </p>
            <BillingAddress
                shouldSubmit={props.shouldSubmit}
                onBillingAddressChangedError={onBillingAddressChangedError}
                onBillingAddressChangedSuccess={onBillingAddressChangedSuccess}
            />
        </div>
    );
};

Cashondelivery.propTypes = {
    classes: shape({ root: string }),
    shouldSubmit: bool.isRequired,
    onPaymentSuccess: func,
    onDropinReady: func,
    onPaymentError: func,
    resetShouldSubmit: func.isRequired
};

export default Cashondelivery;
