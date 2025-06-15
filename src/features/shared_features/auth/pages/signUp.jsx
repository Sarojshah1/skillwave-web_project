import React, { useState } from 'react';
import {
  Camera,
  User,
  Mail,
  Lock,
  GraduationCap,
  FileText,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FaCamera } from 'react-icons/fa';
import { useFormData } from '../hooks/useFormData';
import { useAuth } from '../hooks/useAuth';

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const { profilePicturePreview, handleProfilePictureChange, formData,setFormData, handleChange } = useFormData();
  const { loading, error, handleSubmit } = useAuth();

  const handleNext = () => {
    if (profilePicturePreview) setStep(2);
  };

  const handlePrev = () => setStep(1);
    const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

    const getRoleIcon = (role) => {
    switch (role) {
      case "student":
        return <GraduationCap className="w-4 h-4" />
      case "tutor":
        return <User className="w-4 h-4" />
      case "admin":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }
    const getRoleDescription = (role) => {
    switch (role) {
      case "student":
        return "Access courses, track progress, and learn from expert tutors"
      case "tutor":
        return "Create courses, manage students, and share your expertise"
      case "admin":
        return "Manage platform, oversee content, and support users"
      default:
        return ""
    }
  }


  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">SkillWave</h1>
            </div>
            <Badge variant="secondary" className="text-sm">
              Step {step} of 2
            </Badge>
          </div>
          <Progress value={step * 50} className="h-2" />
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900">
              {step === 1 ? "Welcome! Let's get started" : "Complete your profile"}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {step === 1
                ? "Upload a profile picture to personalize your learning experience"
                : "Fill in your details to create your account"}
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {step === 1 && (
              <div className="text-center space-y-8">
                <div className="flex justify-center">
                  <div className="relative group">
                    <input
                      type="file"
                      id="profilePictureInput"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                    <div
                      className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 cursor-pointer overflow-hidden flex items-center justify-center border-4 border-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                      onClick={() => document.getElementById("profilePictureInput")?.click()}
                    >
                      {profilePicturePreview ? (
                        <img
                          src={profilePicturePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <Camera className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 font-medium">Upload Photo</p>
                        </div>
                      )}
                    </div>
                    
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Why add a profile picture?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Build trust with tutors</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Personalize your profile</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Enhance community feel</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!profilePicturePreview}
                  size="lg"
                  className="w-full max-w-xs bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <form className="space-y-6" onSubmit={(e) => handleSubmit(e, formData)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Create a strong password"
                    required
                  />
                  <p className="text-xs text-gray-500">Must be at least 8 characters long</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2" />I want to join as a...
                  </Label>
                  <Select value={formData.role} onValueChange={handleRoleChange}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4" />
                          <span>Student</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="tutor">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Tutor</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Admin</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-start space-x-2">
                      {getRoleIcon(formData.role)}
                      <p className="text-sm text-blue-800">{getRoleDescription(formData.role)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium text-gray-700 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Bio (Optional)
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    placeholder="Tell us about yourself, your interests, or teaching experience..."
                  />
                  <p className="text-xs text-gray-500">This helps others get to know you better</p>
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    onClick={handlePrev}
                    variant="outline"
                    size="lg"
                    className="px-8 rounded-xl border-gray-200 hover:bg-gray-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
