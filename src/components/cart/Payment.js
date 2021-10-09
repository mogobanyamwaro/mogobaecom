import React, { Fragment, useEffect } from 'react';

import MetaData from '../layout/MetaData';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, clearErrors } from '../../actions/orderActions';
import { emptyCart } from '../../actions/cartActions';

const Payment = ({ history, onSuccess, toPay }) => {
  let env = 'sandbox';
  let currency = 'USD';
  let total = toPay;
  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  const client = {
    sandbox:
      'AcD3f6HIEvhdlMKZ9W8VnCazj0qhMbdZKPq9JixLGyY6wbnWzJi3i-XC_zW_cyNYnbWxcq6wxhmzhKll',
    production: 'YOUR-PRODUCTION-APP-ID',
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }
  // Oncancel Function
  const onCancel = (data) => {
    console.log('The payment was cancelled!', data);
  };
  // On Error function
  const onError = (err) => {
    console.log('Error!', err);
  };

  const onSuccesso = (payment) => {
    console.log('The payment was succeeded!', payment);
    order.paymentInfo = {
      id: payment.paymentID,
      status: 'succeeded',
    };

    try {
      onSuccess(payment);
      dispatch(createOrder(order));
      dispatch(emptyCart());
    } catch (error) {
      alert.error(error.response.data.message);
    }
    localStorage.removeItem('cartItems');
  };

  return (
    <Fragment>
      <MetaData title={'Payment'} />

      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccesso}
        onCancel={onCancel}
        style={{
          size: 'medium',
          color: 'blue',
          shape: 'rect',
          label: 'checkout',
        }}
      />
    </Fragment>
  );
};

export default Payment;
