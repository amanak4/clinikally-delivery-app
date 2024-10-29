import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const ProductList = () => {
  const { products, stock ,addToCart} = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20; // Number of products per page
//  console.log(products) 
  const [selectedQuantities, setSelectedQuantities] = useState({});

  // Calculate the current page products
  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = products.slice(startIndex, startIndex + pageSize);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / pageSize);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Handle product selection
  const handleSelectProduct = (productId) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [productId]: 1,
    }));
  };
  // Handle quantity increment
  const handleIncrement = (productId) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }));
  };

  // Handle quantity decrement
  const handleDecrement = (productId) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(prev[productId] - 1, 0), // Ensure quantity doesn’t go below 1
    }));
  };


  // ProductList.js
  
  const handleAddToCart = (product) => {
    const quantity = selectedQuantities[product.id];
    if (quantity) {
      addToCart(product, quantity);
      setSelectedQuantities((prev) => ({ ...prev, [product.id]: 0 })); // Reset quantity
    }
  };
  
  // Inside return:
 


  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {currentProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            className="max-w-xs"
          >
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${product.price}
                </Typography>
                <Typography color="text.secondary">
                  {stock[product.id] ? 'In Stock' : 'Out of Stock'}
                </Typography>
<div className='flex gap-2'>
                {selectedQuantities[product.id] ? (
                  // Quantity Selector
                  <div className="flex items-center mt-4">
                    <IconButton
                      color="primary"
                      onClick={() => handleDecrement(product.id)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="h6" className="mx-2">
                      {selectedQuantities[product.id]}
                    </Typography>
                    <IconButton
                      color="primary"
                      onClick={() => handleIncrement(product.id)}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                ) : (
                  // Select Product Button
                  <Button
                    variant="contained"
                    color="primary"
                    className="mt-4"
                    disabled={!stock[product.id]}
                    onClick={() => handleSelectProduct(product.id)}
                  >
                    Select Product
                  </Button>

                )}
                <Button
    variant="contained"
    color="primary"
    className="mt-4"
    disabled={!stock[product.id]}
    onClick={() => handleAddToCart(product)}
  >
    <AddShoppingCartIcon />
  </Button>
  </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
      />
    </div>
  );
};

export default ProductList;
