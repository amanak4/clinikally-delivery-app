import React, { createContext, useState, useEffect } from 'react';
import { readRemoteFile } from 'react-papaparse';
import Product from '../assets/Products.csv';
import Stock from '../assets/Stock.csv';
import Pincode from '../assets/Pincodes.csv';
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState({});
  const [pincodes, setPincodes] = useState({});
  const [cart, setCart] = useState([]); // State to store cart items
  useEffect(() => {
    const loadCsvData = async () => {
      // Parse the products CSV
      readRemoteFile(Product, {
        header: true,
        download: true,
        complete: (result) => {
          const formattedProducts = result.data.map(product => ({
            id: product['Product ID'],
            name: product['Product Name'],
            price: product['Price']
          }));
          setProducts(formattedProducts);
        },
      });

      // Parse the stock CSV and convert it to an object with product IDs as keys
      readRemoteFile(Stock, {
        header: true,
        download: true,
        complete: (result) => {
          const stockData = result.data.reduce((acc, item) => {
            acc[item['Product ID']] = item['Stock Available'];
            return acc;
          }, {});
          setStock(stockData);
        },
      });

      // Parse the pincodes CSV and convert it to an object with pincode as keys
      readRemoteFile(Pincode, {
        header: true,
        download: true,
        complete: (result) => {
          const pincodeData = result.data.reduce((acc, item) => {
            acc[item['Pincode']] = item['Logistics Provider'];
            return acc;
          }, {});
          setPincodes(pincodeData);
        },
      });
    };

    loadCsvData();
  }, []);

  // Function to add product to cart
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  return (
    <ProductContext.Provider value={{ products, stock, pincodes, cart, addToCart }}>
      {children}
    </ProductContext.Provider>
  );
};
