import React from 'react';
import { useEffect } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import ProductPage from './components/ProductPage/ProductPage';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';
import ProductAdd from './components/AddProduct/AddProduct';
import CategoriesPage from './components/CategoriesPage/CategoriesPage';
import VendorPage from './components/VendorPage/VendorPage';
import Profile from './components/Profile/Profile'
import SearchResults from './components/SearchResults/SearchResults';
import OrderList from './components/sellerInterface/OrderList'
import Dashboard from './components/sellerInterface/Dashboard';


function App() {

  useEffect(() => {
    window.scroll(0, 0);
  });

  return (
    <>
       <Navbar />
      <div className='huge-wrapper'>
        
       
      
        <div className="routes-container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Profile/:userId' element = {<Profile />} />
          <Route path='/AddProduct' element={<ProductAdd />} />
          <Route path='/products/categories/:category' element = {<CategoriesPage />} />
          <Route path='/sellers/:sellerId' element = {<VendorPage />} />
          <Route path="/search/searched/:query" element={<SearchResults />} />
          <Route path="/profile/:userId/OrderList" element={<OrderList />} />
          <Route path="/profile/:userId/Dashboard" element={<Dashboard />} />
        </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
