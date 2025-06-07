import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userProfileService } from '@/features/students_features/student_profile/services/userProfileService';

export const useUpdateUserProfilePictureMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file) => userProfileService.updateUserProfilePicture(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        },
    });
};
