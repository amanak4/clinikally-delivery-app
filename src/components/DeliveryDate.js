import { format, addDays } from 'date-fns';

const DeliveryDate = ({ provider, inStock, orderTime }) => {
  const calculateDeliveryDate = () => {
    const currentHour = orderTime.getHours();
    if (provider === 'A' && inStock) {
      return currentHour < 17 ? format(orderTime, 'yyyy-MM-dd') : format(addDays(orderTime, 1), 'yyyy-MM-dd');
    } else if (provider === 'B') {
      return currentHour < 9 ? format(orderTime, 'yyyy-MM-dd') : format(addDays(orderTime, 1), 'yyyy-MM-dd');
    }
    return format(addDays(orderTime, 3), 'yyyy-MM-dd');
  };

  return <p>Estimated Delivery: {calculateDeliveryDate()}</p>;
};

export default DeliveryDate;
