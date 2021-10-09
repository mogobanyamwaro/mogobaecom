import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';

import { useSelector } from 'react-redux';
import Payment from './Payment';

const ConfirmOrder = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [payment, setPayment] = useState(false);
  const [success, setSuccess] = useState(false);

  // Calculate Order Prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(data));

    setPayment(true);
  };

  const transationSucss = () => {
    console.log('this is the place');

    setSuccess(true);
  };
  const transationError = () => {
    console.log('transaction error');
  };
  const transationCancel = () => {
    console.log('transation cancelled');
  };
  if (success) {
    return <Redirect to="/success" />;
  }

  return (
    <Fragment>
      <MetaData title={'Confirm Order'} />

      {payment ? (
        <CheckoutSteps shipping confirmOrder payment />
      ) : (
        <CheckoutSteps shipping confirmOrder />
      )}

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user && user.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b>{' '}
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          {cartItems.map((item) => (
            <Fragment>
              <hr />
              <div className="cart-item my-1" key={item.product}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="Laptop" height="45" width="65" />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x KSh {item.price} ={' '}
                      <b>KSh {(item.quantity * item.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{' '}
              <span className="order-summary-values">KSh {itemsPrice}</span>
            </p>
            <p>
              Shipping:{' '}
              <span className="order-summary-values">KSh {shippingPrice}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">KSh {taxPrice}</span>
            </p>

            <hr />

            <p>
              Total:{' '}
              <span className="order-summary-values">KSh {totalPrice}</span>
            </p>

            <hr />
            {!payment && (
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={processToPayment}
              >
                Proceed to Payment
              </button>
            )}
            {payment && (
              <Payment
                toPay={totalPrice}
                onSuccess={transationSucss}
                transationError={transationError}
                transationCancelled={transationCancel}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
