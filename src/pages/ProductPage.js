import React, { useState, useContext } from 'react';
import ProductList from '../components/ProductList';
import { ProductContext } from '../context/ProductContext';
import CountdownTimer from '../components/CountdownTimer';

const ProductPage = () => {
  const { pincodes } = useContext(ProductContext);
  console.log(pincodes);
  const [pincode, setPincode] = useState('');
  const [provider, setProvider] = useState('');

  const validatePincode = () => {
    if (pincodes[pincode]) setProvider(pincodes[pincode]);
    else alert('Invalid Pincode');
  };

  return (
    <div>
    <div className="p-4">
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="border p-2"
        />
        <button onClick={validatePincode} className="bg-blue-500 text-white p-2 ml-2">
          Check Delivery
        </button>
      </div>
      {provider && (
        <div>
          <p>Delivery Provider: {provider}</p>
          {provider === 'Provider A' || provider === 'Provider B' ? (
            <CountdownTimer cutoffHour={provider === 'Provider A' ? 17 : 9} />
          ) : (
            <p>Delivery within 2-5 days</p>
          )}
        </div>
      )}

      <ProductList />
      
    </div>
  );
};

export default ProductPage;
