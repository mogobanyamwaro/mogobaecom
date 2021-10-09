const deleteOrderHandler = (id) => {
dispatch(deleteOrder(id));
};

}
const alert = useAlert();
const dispatch = useDispatch();

const { loading, error, orders } = useSelector((state) => state.allOrders);
const { isDeleted } = useSelector((state) => state.order);

useEffect(() => {
dispatch(allOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Order deleted successfully');
      history.push('/admin/orders');
      dispatch({ type: DELETE_ORDER_RESET });
    }

}, [dispatch, alert, error, isDeleted, history]);

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
field: 'status',
headerName: 'Status',
width: 120,
renderCell: (params) => {
return (
<>
params.row.status.includes('Delivered')?(
<p style={{ color: 'green' }}>{params.row.status}</p>) : (
<p style={{ color: 'red' }}>{params.row.status}</p>
),
</>
);
},
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
<Link to={`/admin/order/${params.row.id}`}>
<button className="productListEdit">
<i className="fa fa-eye"></i>
</button>
</Link>
<DeleteOutline
className="productListDelete"
onClick={() => deleteOrderHandler(params.row.id)}
/>
</>
);
},
},
];
