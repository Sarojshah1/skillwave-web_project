import { useMutation } from '@tanstack/react-query';
import { ReviewService } from '../services/ReviewServices'

export const useAddReview = () => {
  return useMutation({
    mutationFn: (reviewData) => ReviewService.addReview(reviewData),
  });
};
