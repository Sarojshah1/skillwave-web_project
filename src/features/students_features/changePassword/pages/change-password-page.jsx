import { useState } from "react";
import { Lock, Shield, Sparkles } from "lucide-react";
import { ChangePasswordForm } from "../components/change-password-form";
import { SecurityTips } from "../components/security-tips";

export default function ChangePasswordPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // In a real app, you would make an API call here
    console.log("Password change requested:", data);
    return Promise.resolve();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden py-24 px-32">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl transform translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-br from-indigo-200/25 to-blue-200/25 rounded-full blur-3xl transform translate-y-1/2"></div>
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="relative bg-[#49BBBD] px-8 py-10">
              <div className="absolute inset-0 bg-black/5"></div>
              <div className="relative flex items-center">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                  <Lock className="h-10 w-10 text-white" />
                </div>
                <div className="ml-6">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Change Your Password
                  </h1>
                  <p className="text-blue-100 text-lg">
                    Keep your account secure and protected
                  </p>
                </div>
              </div>
              <div className="absolute top-4 right-8 flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Shield className="h-4 w-4 text-green-300" />
                <span className="text-sm text-white font-medium">
                  SSL Secured
                </span>
              </div>
              <Sparkles className="absolute top-6 left-1/3 h-4 w-4 text-white/40 animate-pulse" />
              <Sparkles className="absolute bottom-8 right-1/4 h-3 w-3 text-white/30 animate-ping" />
            </div>
            <div className="p-8">
              <ChangePasswordForm onSubmit={handleChangePassword} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <SecurityTips />
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-center mb-4">
              <div className="bg-green-500 p-2 rounded-xl">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 ml-3">
                Account Security
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Password Strength</span>
                <span className="text-sm font-medium text-green-600">
                  Strong
                </span>
              </div>
              <div className="w-full bg-green-100 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Your account security score:{" "}
                <span className="font-medium text-green-600">85/100</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
