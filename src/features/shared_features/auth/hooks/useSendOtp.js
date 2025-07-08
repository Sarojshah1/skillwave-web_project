import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';

export const useSendOtp = () => {
  return useMutation({
    mutationFn: (email) => authService.sendOtp(email),
  });
}; 