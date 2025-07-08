import React from 'react';
import { useSendOtp } from '../hooks/useSendOtp';
import LoadingOverlay from '@/components/ui/LoadingOverlay';

const SendOtpWithLoading = ({ children }) => {
  const mutation = useSendOtp();
  console.log(mutation);
  return (
    <>
      {mutation.isPending && <LoadingOverlay message="Sending OTP..." />}
      {children(mutation)}
    </>
  );
};

export default SendOtpWithLoading; 