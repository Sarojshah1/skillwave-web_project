import axios from 'axios';
import KhaltiCheckout from 'khalti-checkout-web';

export const handleKhaltiPayment = async (price, courseId, token) => {
  const checkout = new KhaltiCheckout({
    publicKey: 'test_public_key_617c4c6fe77c441d88451ec1408a0c0e',
    productIdentity: courseId,
    productName: 'Course Purchase',
    productUrl: 'http://localhost:3000',
    eventHandler: {
      onSuccess: async (payload) => {
        const data = {
          token: payload.token,
          amount: payload.amount,
        };
        try {
          await axios.post(
            'https://khalti.com/api/v2/payment/verify/',
            data,
            {
              headers: {
                Authorization: 'test_secret_key_3f78fb6364ef4bd1b5fc670ce33a06f5',
              },
            }
          );

          await axios.post(
            'http://localhost:3000/api/payment',
            {
              course_id: courseId,
              amount: price,
              payment_method: 'Khalti',
              status: 'successful',
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } catch (error) {
          console.error('Khalti payment verification failed:', error);
        }
      },
      onError: (error) => {
        console.error('Khalti error:', error);
      },
      onClose: () => {
        console.log('Khalti checkout closed');
      },
    },
    paymentPreference: ['KHALTI', 'EBANKING', 'MOBILE_BANKING'],
  });

  checkout.show({ amount: price * 100 });
};

export const handleEsewaPayment = (price, courseId) => {
  const successUrl = encodeURIComponent('http://localhost:3000/payment-success');
  const failureUrl = encodeURIComponent('http://localhost:3000/payment-failure');
  const esewaUrl = `https://uat.esewa.com.np/epay/main?amt=${price}&pid=${courseId}&scd=EPAYTEST&su=${successUrl}&fu=${failureUrl}`;
  window.location.href = esewaUrl;
};
