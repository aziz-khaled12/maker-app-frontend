import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import './Dashboard.css'
import { BsCartFill } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
import { BsCartDashFill } from "react-icons/bs";
import { BsCartPlusFill } from "react-icons/bs";

function Dashboard() {
    const [loading, setLoading] = useState(true); // Introduce loading state
    const [sellerOrders, setSellerOrders] = useState([]);
    const token = localStorage.getItem('token')
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const sellerId = decodedToken.userId;
    const [productData, setProductData] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [totalOrders, setTotalOrders] = useState();
    const [completed, setCompleted] = useState();
    const [pending, setPending] = useState();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderResponse = await axios.get(`https://maker-app-backend.vercel.app/sellers/${sellerId}/orders`);
                setSellerOrders(orderResponse.data.orders);
                setTotalOrders(orderResponse.data.totalOrders);
                setCompleted(orderResponse.data.numCompleted);
                setPending(orderResponse.data.numPending);

                // Fetch product and customer data concurrently
                const products = await Promise.all(orderResponse.data.orders.map(async order => {
                    const response = await axios.get(`https://maker-app-backend.vercel.app/products/${order.productId}`);
                    return response.data;
                }));
                const customers = await Promise.all(orderResponse.data.orders.map(async order => {
                    const response = await axios.get(`https://maker-app-backend.vercel.app/users/${order.userId}`);
                    return response.data;
                }));
                setProductData(products);
                setCustomerData(customers);

                setLoading(false); // Set loading to false once all data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [sellerId]);

    // Define columns for the table
    const columns = React.useMemo(() => [
        {
            Header: 'Order date',
            accessor: 'orderdate',
            sortType: 'basic', // Adding sortType for custom sorting
        },
        {
            Header: 'Product',
            accessor: 'product',
        },
        {
            Header: 'Customer',
            accessor: 'customer',
        },
        {
            Header: 'Status',
            accessor: 'status',
        },
        {
            Header: 'Total',
            accessor: 'total',
            sortType: 'basic', // Adding sortType for custom sorting
        },
    ], []);

    // Transform order data for table display
    const tableData = useMemo(() => {
        return sellerOrders.map(order => {
            // Find the product associated with the order
            const product = productData.find(product => product._id === order.productId);
            const customer = customerData.find(customer => customer._id === order.userId);
            return {
                orderdate: new Date(order.createdAt).toLocaleDateString(),
                product: product ? product.name : "Product not found", // Access the name property
                customer: customer ? customer.username : "customer not found",
                status: order.state,
                total: '$' + order.quantity,
            };
        });
    }, [sellerOrders, productData, customerData]);

    // Use react-table to create table instance
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: tableData }, useSortBy);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="huge-procucts-container">
                <div className="dash-top">
                    <div className='top-inside'>
                        <div className='inside'>
                            <span>Total orders</span>

                            <span className='number'>{totalOrders}</span>
                        </div>
                        <div className='icon'>
                            <BsCartFill />
                        </div>
                    </div>
                    <div className='top-inside'>
                        <div className='inside'>
                            <span>Total sales</span>

                            <span className='number'>{completed}</span>
                        </div>
                        <div className='icon'>
                            <BsCartCheckFill />
                        </div>
                    </div>
                    <div className='top-inside'>
                        <div className='inside'>
                            <span>Pending </span>

                            <span className='number'>{pending}</span>
                        </div>
                        <div className='icon'>
                            <BsCartDashFill />
                        </div>
                    </div>
                    <div className='top-inside'>
                        <div className='inside'>
                            <span>Total income</span>
                            <span className='number'>{pending}</span>
                        </div>
                        <div className='icon'>
                            <BsCartPlusFill />
                        </div>
                    </div>
                </div>
                <div className="dash-bot">
                    <div className="recent">
                        <div className="recent-top">Recent Sales:</div>

                        <div className="table-container">
                            <table {...getTableProps()} className="sales-table">
                                <thead>
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                    {column.render('Header')}
                                                </th>
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
                    </div>
                    <div className="top-products">
                        Top Selling Products:
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
