"use client"

import { useState } from "react"
import { useLocation } from "react-router-dom"
import KhaltiCheckout from "khalti-checkout-web"
import axios from "axios"
import { ICONS_PATHS } from "@/shared/constants/imagePaths"
import { CreditCard, Shield, CheckCircle, Clock, Users, Star, ArrowLeft, Sparkles, Gift, Lock } from "lucide-react"
import { api } from "@/infrastructure/api/api"

const CheckoutPage = () => {
  const { state } = useLocation()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const token = localStorage.getItem("token")

  if (!state || !state.course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600">No course data available for checkout.</p>
        </div>
      </div>
    )
  }

  const { thumbnail, title, price, description, duration, level, creator, createdDate, totalLessons, _id } =
    state.course

  const taxAmount = price * 0.05
  const totalAmount = price + taxAmount

  // Khalti payment handling
  const handleKhaltiPayment = async () => {
    setIsProcessing(true)
    const checkout = new KhaltiCheckout({
      publicKey: "test_public_key_617c4c6fe77c441d88451ec1408a0c0e",
      productIdentity: _id,
      productName: title,
      productUrl: "http://localhost:3000",
      eventHandler: {
        onSuccess(payload) {
          console.log(payload)
          const data = {
            token: payload.token,
            amount: payload.price,
          }

          const config = {
            headers: { Authorization: "test_secret_key_3f78fb6364ef4bd1b5fc670ce33a06f5" },
          }

          axios
            .post("https://khalti.com/api/v2/payment/verify/", data, config)
            .then((response) => {
              console.log(response.data)
              setIsProcessing(false)
            })
            .catch((error) => {
              console.log(error)
              setIsProcessing(false)
            })
        },
        onError(error) {
          console.log(error)
          setIsProcessing(false)
        },
        onClose() {
          console.log("widget is closing")
          setIsProcessing(false)
        },
      },
      paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    })
    checkout.show({ amount: totalAmount * 100 })
  }

  const handleEsewaPayment = () => {
    setIsProcessing(true)
    const amount = totalAmount
    const successUrl = encodeURIComponent("http://localhost:3000/payment-success")
    const failureUrl = encodeURIComponent("http://localhost:3000/payment-failure")
    const esewaPaymentUrl = `https://uat.esewa.com.np/epay/main?amt=${amount}&pid=${_id}&scd=EPAYTEST&su=${successUrl}&fu=${failureUrl}`
    window.location.href = esewaPaymentUrl
  }

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method.")
      return
    }

    if (selectedPaymentMethod === "e-sewa") {
      handleEsewaPayment()
    } else if (selectedPaymentMethod === "khalti") {
      handleKhaltiPayment()
      try {
        const response = await api.post(
          "http://localhost:3000/api/payment",
          {
            course_id: _id,
            amount: totalAmount,
            payment_method: "Khalti",
            status: "successful",
          },
         
        )
        console.log(response)
      } catch (error) {
        console.error("Payment API error:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
     

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Summary - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Preview Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-0">
              <div className="relative">
                <img
                  src={`http://localhost:3000/thumbnails/${thumbnail}`}
                  alt={title}
                  className="w-full h-64 object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
                  <div className="flex items-center space-x-4 text-white/90">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{level}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.8 (2.1k reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-6">{description}</p>

                {/* Course Features */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">{totalLessons} Lessons</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Lifetime Access</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">Certificate</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-gray-700">Mobile Access</span>
                  </div>
                </div>

                {/* Special Offer Banner */}
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 rounded-full p-2">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">Limited Time Offer!</h3>
                      <p className="text-white/90 text-sm">Get this course at a special price. Offer ends soon!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                Choose Payment Method
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* eSewa Option */}
                <button
                  className={`relative p-6 border-2 rounded-2xl transition-all duration-300 hover:shadow-lg ${
                    selectedPaymentMethod === "e-sewa"
                      ? "border-green-500 bg-green-50 shadow-lg transform scale-105"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  onClick={() => setSelectedPaymentMethod("e-sewa")}
                >
                  {selectedPaymentMethod === "e-sewa" && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                  <div className="flex flex-col items-center space-y-3">
                    <img
                      src={ICONS_PATHS.esewa || "/placeholder.svg"}
                      alt="e-Sewa"
                      className="w-16 h-16 object-contain"
                    />
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900">eSewa</h3>
                      <p className="text-sm text-gray-600">Digital Wallet</p>
                    </div>
                  </div>
                </button>

                {/* Khalti Option */}
                <button
                  className={`relative p-6 border-2 rounded-2xl transition-all duration-300 hover:shadow-lg ${
                    selectedPaymentMethod === "khalti"
                      ? "border-purple-500 bg-purple-50 shadow-lg transform scale-105"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() => setSelectedPaymentMethod("khalti")}
                >
                  {selectedPaymentMethod === "khalti" && (
                    <div className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full p-1">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                  <div className="flex flex-col items-center space-y-3">
                    <img
                      src={ICONS_PATHS.khalti || "/placeholder.svg"}
                      alt="Khalti"
                      className="w-16 h-16 object-contain"
                    />
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900">Khalti</h3>
                      <p className="text-sm text-gray-600">Digital Wallet</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Security Notice */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Secure Payment</h4>
                    <p className="text-sm text-gray-600">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </div>

              <button
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  selectedPaymentMethod && !isProcessing
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handlePayment}
                disabled={!selectedPaymentMethod || isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Complete Payment - NPR ${totalAmount.toFixed(2)}`
                )}
              </button>
            </div>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Gift className="w-5 h-5 mr-2 text-blue-600" />
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Course Price</span>
                  <span className="font-medium">NPR {price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Coupon Discount</span>
                  <span className="text-green-600 font-medium">- NPR 0.00</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (5%)</span>
                  <span className="font-medium">NPR {taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total Amount</span>
                    <span className="text-blue-600">NPR {totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Money Back Guarantee */}
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900">30-Day Money Back</h4>
                    <p className="text-sm text-green-700">100% satisfaction guaranteed</p>
                  </div>
                </div>
              </div>

              {/* Course Benefits */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">What you'll get:</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">Lifetime access to course</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">Certificate of completion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">Access on mobile and desktop</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">Direct instructor support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
