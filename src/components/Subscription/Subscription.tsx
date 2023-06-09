import { Box } from '@mui/material';
import  { useState } from 'react';
const Subscription = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleSubscription = () => {setTimeout(() => {
    setIsSubscribed(true);
  }, 2000);
}
  return (
    <div>
      <h2>Subscription Page</h2>
      {isSubscribed ? (
        <p>You are subscribed!</p>
      ) : (
        <button onClick={handleSubscription}>Subscribe</button>
      )}
    </div>
  );
};

export default Subscription;
