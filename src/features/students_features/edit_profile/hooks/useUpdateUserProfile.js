import { useMutation } from "@tanstack/react-query";
import { editProfileService } from "@/features/students_features/edit_profile/services/editProfileService";
import { toast } from "react-toastify";

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: ({ userId, userDetails }) => editProfileService.updateUserDetails(userId, userDetails),
    onSuccess: (data) => {
      console.log("Profile updated successfully:", data);
      toast.success("Profile updated successfully!");

    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  });
};