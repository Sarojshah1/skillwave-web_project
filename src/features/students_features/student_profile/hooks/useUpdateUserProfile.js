import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userProfileService } from '@/features/students_features/student_profile/services/userProfileService';

export const useUpdateUserProfileMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(userProfileService.updateUserProfile, {
        onSuccess: () => {
            queryClient.invalidateQueries(['userProfile']);
        },
    });
};
