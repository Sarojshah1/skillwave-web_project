import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginImage from '../components/LoginImage';
import { useToast } from '@/features/tutor_features/courses/hooks/use-Toast';
import { ToastContainer } from '@/components/ui/toast';
import SendOtpWithLoading from '../components/SendOtpWithLoading';
import LoadingOverlay from '@/components/ui/LoadingOverlay';

const ForgotPasswordEmailPage = () => {
  const [email, setEmail] = useState('');
  const [showCheckEmail, setShowCheckEmail] = useState(false);
  const navigate = useNavigate();
  const { toast, toasts, dismiss } = useToast();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
      <SendOtpWithLoading>
        {(mutation) => {
          console.log('Wrapper render, isPending:', mutation.isPending);
          useEffect(() => {
            if (mutation.isSuccess) {
              toast({
                title: 'OTP sent!',
                description: 'Check your email for the OTP.',
                variant: 'success',
              });
              setShowCheckEmail(true);
              setTimeout(() => {
                navigate('/forgot-password/verify', { state: { email } });
              }, 1200);
            }
            if (mutation.isError && mutation.error) {
              toast({
                title: 'Failed to send OTP',
                description: mutation.error?.response?.data?.message || 'An error occurred.',
                variant: 'destructive',
              });
            }
          }, [mutation.isSuccess, mutation.isError, mutation.error, navigate, email, toast]);

          return (
            <div className="bg-white flex rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl">
              {/* Left: Form */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Forgot Password</h2>
                <p className="text-gray-600 mb-6">
                  {showCheckEmail ? (
                    <span className="text-teal-600 font-medium">Check your email for the OTP.</span>
                  ) : (
                    'Enter your email to receive an OTP for password reset.'
                  )}
                </p>
                <form onSubmit={e => {
                  e.preventDefault();
                  console.log('Submitting, email:', email);
                  mutation.mutate(email);
                }} className="space-y-6">
                  <div>
                    <label className="block text-gray-700">Email Address</label>
                    <input
                      type="email"
                      className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition duration-200 flex items-center justify-center"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending && <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>}
                    {mutation.isPending ? 'Sending...' : 'Send OTP'}
                  </button>
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
      </SendOtpWithLoading>
    </div>
  );
};

export default ForgotPasswordEmailPage; 