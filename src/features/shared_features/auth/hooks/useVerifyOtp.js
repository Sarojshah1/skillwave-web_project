import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: ({ email, otp }) => authService.verifyOtp(email, otp),
  });
}; 