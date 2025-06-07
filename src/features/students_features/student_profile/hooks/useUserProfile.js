import { useQuery } from '@tanstack/react-query';
import { userProfileService } from '@/features/students_features/student_profile/services/userProfileService';

export const useUserProfileQuery = () => {
    return useQuery({ queryKey:['userProfile'],
        queryFn: userProfileService.getUserProfile});
};