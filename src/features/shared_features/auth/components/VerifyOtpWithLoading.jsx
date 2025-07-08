import React from 'react';
import { useVerifyOtp } from '../hooks/useVerifyOtp';
import LoadingOverlay from '@/components/ui/LoadingOverlay';

const VerifyOtpWithLoading = ({ children }) => {
  const mutation = useVerifyOtp();
  return (
    <>
      {mutation.isPending && <LoadingOverlay message="Verifying OTP..." />}
      {children(mutation)}
    </>
  );
};

export default VerifyOtpWithLoading; 