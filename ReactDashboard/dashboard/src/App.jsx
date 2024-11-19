import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import LastItemPanel from './components/LastItemPanel';
import CategoryPanel from './components/CategoryPanel';
import ProductsList from './components/ProductsList';
import './App.css';

function App() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalCategories: 0,
    categories: {},
    lastProduct: null,
    products: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch('http://localhost:3000/api/products');
        const productsData = await productsResponse.json();

        // Fetch users
        const usersResponse = await fetch('http://localhost:3000/api/users');
        const usersData = await usersResponse.json();

        setStats({
          totalProducts: productsData.count,
          totalUsers: usersData.count,
          totalCategories: Object.keys(productsData.countByCategory).length,
          categories: productsData.countByCategory,
          lastProduct: productsData.products[productsData.products.length - 1],
          products: productsData.products
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return ( <div className="dashboard">
     <div className="title-box">
       <h1>INFIORI DASHBOARD PANEL</h1> </div>
        <div className="stats-cards"> 
          <Card title="Total Productos" value={stats.totalProducts} /> 
          <Card title="Total Usuarios" value={stats.totalUsers} /> <Card title="Total Categorías" value={stats.totalCategories} /> 
          </div> <div className="panels"> <LastItemPanel item={stats.lastProduct} /> 
          <CategoryPanel categories={stats.categories} /></div> 
          <ProductsList products={stats.products} /> 
          </div>);
}

export default App;