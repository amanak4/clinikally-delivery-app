import React, { useEffect, useState } from 'react';
import { differenceInMilliseconds } from 'date-fns';

const CountdownTimer = ({ cutoffHour }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const cutoffTime = new Date();
      cutoffTime.setHours(cutoffHour, 0, 0);
      const diff = differenceInMilliseconds(cutoffTime, new Date());

      setTimeLeft(
        diff > 0
          ? `${Math.floor(diff / 3600000)}h ${Math.floor((diff % 3600000) / 60000)}m`
          : 'Time up!'
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cutoffHour]);

  return <p className="text-sm text-gray-600">{timeLeft}</p>;
};

export default CountdownTimer;
