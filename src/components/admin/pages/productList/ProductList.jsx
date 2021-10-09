import './productList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import Sidebar from '../../sidebar/Sidebar';
import Loader from '../../../layout/Loader';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAdminProducts,
  deleteProduct,
  clearErrors,
} from '../../../../actions/productActions';
import { DELETE_PRODUCT_RESET } from '../../../../constants/productConstants';

export default function ProductList({ history }) {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Product deleted successfully');
      history.push('/admin/products');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, history]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'product',
      headerName: 'Product',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: 'stock', headerName: 'Stock', width: 200 },
    {
      field: 'category',
      headerName: 'Category',
      width: 120,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.row.id}`}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const newProducts = products.map((item) => {
    return {
      id: item._id,
      name: item.name,
      price: item.price,
      stock: item.stock,
      category: item.category,
      seller: item.seller,
      image: item.images[0].url,
    };
  });

  return (
    <>
      <Sidebar />
      {loading ? (
        <Loader />
      ) : (
        <div className="productList">
          <DataGrid
            rows={newProducts}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
          />
        </div>
      )}
    </>
  );
}
