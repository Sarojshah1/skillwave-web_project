import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import LoginImage from '../components/LoginImage';
import { useToast } from '@/features/tutor_features/courses/hooks/use-Toast';
import { ToastContainer } from '@/components/ui/toast';
import ResetPasswordWithLoading from '../components/ResetPasswordWithLoading';

const ForgotPasswordResetPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  const { toast, toasts, dismiss } = useToast();

  if (!email) {
    return <div className="flex items-center justify-center min-h-screen">No email provided. Please restart the process.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
      <ResetPasswordWithLoading>
        {(mutation) => {
          useEffect(() => {
            if (mutation.isSuccess) {
              toast({
                title: 'Password reset successfully!',
                description: 'You can now log in with your new password.',
                variant: 'success',
              });
              setTimeout(() => {
                navigate('/login');
              }, 1200);
            }
            if (mutation.isError && mutation.error) {
              toast({
                title: 'Failed to reset password',
                description: mutation.error?.response?.data?.message || 'An error occurred.',
                variant: 'destructive',
              });
            }
          }, [mutation.isSuccess, mutation.isError, mutation.error, navigate, toast]);

          const handleSubmit = (e) => {
            e.preventDefault();
            if (newPassword !== confirmPassword) {
              return;
            }
            mutation.mutate({ email, newPassword });
          };

          console.log('Wrapper render, isPending:', mutation.isPending);

          return (
            <div className="bg-white flex rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl">
              {/* Left: Form */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Reset Password</h2>
                <p className="text-gray-600 mb-6">Enter your new password below.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700">New Password</label>
                    <input
                      type="password"
                      className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Confirm Password</label>
                    <input
                      type="password"
                      className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition duration-200 flex items-center justify-center"
                    disabled={mutation.isPending || newPassword !== confirmPassword}
                  >
                    {mutation.isPending && <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>}
                    {mutation.isPending ? 'Resetting...' : 'Reset Password'}
                  </button>
                  {newPassword !== confirmPassword && <p className="text-red-600 mt-2 text-center">Passwords do not match.</p>}
                </form>
                <div className="mt-6 text-center">
                  <Link to="/login" className="text-teal-500 hover:text-teal-600">Back to Login</Link>
                </div>
              </div>
              {/* Right: Image */}
              <LoginImage />
            </div>
          );
        }}
      </ResetPasswordWithLoading>
    </div>
  );
};

export default ForgotPasswordResetPage; 