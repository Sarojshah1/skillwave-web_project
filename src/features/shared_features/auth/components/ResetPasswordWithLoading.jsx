import React from 'react';
import { useResetPassword } from '../hooks/useResetPassword';
import LoadingOverlay from '@/components/ui/LoadingOverlay';

const ResetPasswordWithLoading = ({ children }) => {
  const mutation = useResetPassword();
  return (
    <>
      {mutation.isPending && <LoadingOverlay message="Resetting password..." />}
      {children(mutation)}
    </>
  );
};

export default ResetPasswordWithLoading; 