import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import './OrderList.css';

function OrderList() {

    const [sellerOrders, setSellerOrders] = useState([]);
    const [productData, setProductData] = useState([]);
    const token = localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const sellerId = decodedToken.userId;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/sellers/${sellerId}/orders`);
                setSellerOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [sellerId]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const products = await Promise.all(sellerOrders.map(async order => {
                    const response = await axios.get(`http://localhost:3001/products/${order.productId}`);
                    return response.data;
                }));
                setProductData(products);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProductData();
    }, [sellerOrders]);

    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:3001/${sellerId}/orders/${orderId}`);
            setSellerOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const columns = useMemo(() => [
        {
            Header: 'Date',
            accessor: 'date',
        },
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'Product',
            accessor: 'product',
        },
        {
            Header: 'State',
            accessor: 'state',
            Cell: ({ row }) => (
                <select
                    value={row.original.state}
                    onChange={e => updateOrderStatus(row.original.id, e.target.value)}
                    className='state-select'
                >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            ),
        },
        {
            Header: 'Quantity',
            accessor: 'quantity',
        },
        {
            Header: 'Price',
            accessor: 'price',
        },
        {
            Header: 'Total',
            accessor: 'total',
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <button onClick={() => deleteOrder(row.original.id)}>Delete</button>
            ),
        },
    ], [sellerOrders]);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:3001/${sellerId}/orders/${orderId}`, { status: newStatus });
            setSellerOrders(prevOrders => {
                return prevOrders.map(order => {
                    if (order._id === orderId) {
                        return { ...order, state: newStatus };
                    }
                    return order;
                });
            });
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const tableData = sellerOrders.map(order => {
        const product = productData.find(product => product._id === order.productId);
        return {
            date: new Date(order.createdAt).toLocaleDateString(),
            product: product ? product.name : "Product not found",
            id: order ? order._id : "Order not found",
            state: order.state,
            quantity: order.quantity,
            price: product ? product.price + " DZD" : "Product not found",
            total: product ? order.quantity * product.price + ' DZD' : "Product not found"
        };
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: tableData });

    return (
        <>
            <div className="huge-container">
                <div className="order-top-container">
                    Your Orders:
                </div>
                <div className="orders-container">
                    {sellerOrders.length === 0 ? (
                        <p>There are no orders yet.</p>
                    ) : (
                        <div className="table-container">
                            <table {...getTableProps()} className="sales-table">
                                <thead>
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map(row => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map(cell => (
                                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default OrderList;
