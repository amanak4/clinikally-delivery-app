import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Typography, TextField, Button, Divider } from '@mui/material';

const Cart = () => {
  const { cart, pincodes } = useContext(ProductContext);
  const [pincode, setPincode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const handlePincodeChange = (e) => setPincode(e.target.value);

  const calculateDeliveryDate = () => {
    const provider = pincodes[pincode];
    if (!provider) {
      setDeliveryDate('Invalid pincode');
      return;
    }

    const currentTime = new Date();
    if (provider === 'A' && currentTime.getHours() < 17) {
      setDeliveryDate('Same-day delivery');
    } else if (provider === 'B' && currentTime.getHours() < 9) {
      setDeliveryDate('Same-day delivery');
    } else {
      setDeliveryDate('2-5 days (based on location)');
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h4">Shopping Cart</Typography>
      <Divider className="my-4" />

      {cart.map((product) => (
        <div key={product.id} className="mb-4">
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="body2">
            Quantity: {product.quantity} x ${product.price}
          </Typography>
          <Typography variant="body2">
            Total: ${(product.quantity * product.price).toFixed(2)}
          </Typography>
        </div>
      ))}

      <Divider className="my-4" />

      <Typography variant="h5">Enter Pincode</Typography>
      <TextField
        label="Pincode"
        value={pincode}
        onChange={handlePincodeChange}
        className="mt-2"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={calculateDeliveryDate}
        className="ml-2 mt-2"
      >
        Check Delivery
      </Button>

      {deliveryDate && (
        <Typography variant="body1" className="mt-4">
          Estimated Delivery: {deliveryDate}
        </Typography>
      )}
    </div>
  );
};

export default Cart;
