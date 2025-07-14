import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ email, newPassword }) => authService.updatePasswordByEmail(email, newPassword),
  });
}; 