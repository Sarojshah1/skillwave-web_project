
import { useState, useEffect, use } from "react"
import { CourseHero } from "../components/CourseHero"
import { CourseSidebar } from "../components/CourseSideBar"
import { ReviewForm } from "../components/RrviewForm"
import { ReviewList } from "../components/ReviewList"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { RatingStars } from "@/components/ui/rating-stars"
import { CheckCircle, BookOpen, Clock, Users, Award, Star } from "@/components/ui/icons"
import { calculateAverageRating } from "@/lib/utils"
import { useCourseById } from '../hooks/useCourseById';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useReviewsByCourseId } from "../hooks/useReviewsByCourseId"

export function CourseDetailsPage() {
  const navigate=useNavigate();
  const state=useLocation();
 const { courseId } = useParams(); 
  const { data: course, isLoading, isError, error } = useCourseById(courseId);
  const [loading, setLoading] = useState(true)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const handleEnrollNow = () => {
        navigate('/payment', { state: { course: course } });
    
  }

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }
   const { data: reviews, } = useReviewsByCourseId(course?._id)


  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Course not found</h2>
          <p className="text-gray-600">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const averageRating = calculateAverageRating(reviews || [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CourseHero course={course} reviews={reviews || []} isWishlisted={isWishlisted} onToggleWishlist={handleToggleWishlist} />

            <Card className="rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex space-x-1 mb-8 bg-gray-100/80 p-1 rounded-2xl">
                  {["overview", "instructor", "reviews"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                        activeTab === tab ? "bg-white shadow-md text-blue-600" : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {tab === "overview" && "Overview"}
                      {tab === "instructor" && "Instructor"}
                      {tab === "reviews" && `Reviews (${reviews?.length})`}
                    </button>
                  ))}
                </div>

                {activeTab === "overview" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        About This Course
                      </h2>
                      <p className="text-gray-700 leading-relaxed text-lg mb-8">{course.description}</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold mb-6 flex items-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                        What You'll Learn
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.lessons.map((lesson) => (
                          <div key={lesson._id} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 font-medium">{lesson.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <p className="text-2xl font-bold text-gray-900">{course.lessons.length}</p>
                        <p className="text-gray-600">Lessons</p>
                      </div>
                      <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <p className="text-2xl font-bold text-gray-900">{course.duration}</p>
                        <p className="text-gray-600">Duration</p>
                      </div>
                      <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <p className="text-2xl font-bold text-gray-900">{course.level}</p>
                        <p className="text-gray-600">Level</p>
                      </div>
                      <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <Award className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                        <p className="text-2xl font-bold text-gray-900">Yes</p>
                        <p className="text-gray-600">Certificate</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "instructor" && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Meet Your Instructor
                    </h2>
                    <Card className="p-8 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border-0">
                      <div className="flex items-start space-x-6">
                        <Avatar className="w-24 h-24 ring-4 ring-blue-100">
                          <AvatarImage src={`http://localhost:3000/profile/${course.created_by.profile_picture}`  || "/placeholder.svg"} />
                          <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                            {course.created_by.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.created_by.name}</h3>
                          {/* <p className="text-lg text-blue-600 font-medium mb-4">{course.created_by.title}</p> */}

                          <div className="flex items-center space-x-6 mb-6">
                            <div className="flex items-center space-x-2">
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              <span className="font-bold">4.5</span>
                              <span className="text-gray-600">Instructor Rating</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-5 h-5 text-gray-600" />
                              <span className="font-bold">100</span>
                              <span className="text-gray-600">Students</span>
                            </div>
                          </div>

                          <p className="text-gray-700 leading-relaxed mb-6">
                            Experienced professional with over 10 years in the industry. Passionate about teaching and
                            helping students achieve their career goals through practical, hands-on learning
                            experiences.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-3xl font-bold bg-[#49BBBD] bg-clip-text text-transparent">
                        Student Reviews
                      </h2>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                          <RatingStars rating={averageRating} className="justify-center mb-1" />
                          <div className="text-sm text-gray-600">{reviews.length} reviews</div>
                        </div>
                      </div>
                    </div>

                    <ReviewList courseId={course._id} />
                    <ReviewForm courseId={course._id} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <CourseSidebar
              course={course}
              reviews={reviews || []}
              isWishlisted={isWishlisted}
              onEnrollNow={handleEnrollNow}
              onToggleWishlist={handleToggleWishlist}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
