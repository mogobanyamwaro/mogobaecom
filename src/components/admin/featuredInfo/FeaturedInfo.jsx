import './featuredInfo.css';
import React, { useEffect } from 'react';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../../actions/productActions.js';
import { allOrders } from '../../../actions/orderActions';
import { allUsers } from '../../../actions/userActions';

import Loader from '../../../components/layout/Loader';

export default function FeaturedInfo() {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  // const { users } = useSelector((state) => state.allUsers);
  const { orders, totalAmount, loading } = useSelector(
    (state) => state.allOrders
  );

  let outOfStock = 0;
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });
  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="featured">
          <div className="featuredItem">
            <span className="featuredTitle">Orders</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{orders && orders.length}</span>
              <span className="featuredMoneyRate">
                -11.4 <ArrowDownward className="featuredIcon negative" />
              </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
          </div>
          <div className="featuredItem">
            <span className="featuredTitle">Sales</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">
                Ksh {totalAmount && totalAmount.toFixed(2)}
              </span>
              <span className="featuredMoneyRate">
                -1.4 <ArrowDownward className="featuredIcon negative" />
              </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
          </div>
          <div className="featuredItem">
            <span className="featuredTitle">Products Available</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">
                {products && products.length}
              </span>
              <span className="featuredMoneyRate">
                +2.4 <ArrowUpward className="featuredIcon" />
              </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
          </div>
          <div className="featuredItem">
            <span className="featuredTitle">Out of Stock</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{outOfStock}</span>
              <span className="featuredMoneyRate">
                +2.4 <ArrowUpward className="featuredIcon" />
              </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
          </div>
        </div>
      )}
    </>
  );
}
