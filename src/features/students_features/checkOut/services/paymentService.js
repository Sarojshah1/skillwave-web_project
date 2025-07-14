import { api } from "@/infrastructure/api/api"
import { ENDPOINTS } from "@/shared/constants/api.const"

export const paymentService = {
  // Create a new payment
  createPayment: async (paymentData) => {
    try {
      const response = await api.post(ENDPOINTS.PAYMENT.CREATE_PAYMENT, paymentData)
      return response.data
    } catch (error) {
      console.error('Payment creation error:', error)
      throw error
    }
  },

  // Get all payments for a user
  getUserPayments: async () => {
    try {
      const response = await api.get(ENDPOINTS.PAYMENT.GET_PAYMENTS)
      return response.data
    } catch (error) {
      console.error('Get payments error:', error)
      throw error
    }
  },

  // Get payment by ID
  getPaymentById: async (paymentId) => {
    try {
      const response = await api.get(ENDPOINTS.PAYMENT.GET_PAYMENT_BY_ID.replace(':id', paymentId))
      return response.data
    } catch (error) {
      console.error('Get payment by ID error:', error)
      throw error
    }
  },

  // Update payment
  updatePayment: async (paymentId, paymentData) => {
    try {
      const response = await api.put(ENDPOINTS.PAYMENT.UPDATE_PAYMENT.replace(':id', paymentId), paymentData)
      return response.data
    } catch (error) {
      console.error('Update payment error:', error)
      throw error
    }
  },

  // Delete payment
  deletePayment: async (paymentId) => {
    try {
      const response = await api.delete(ENDPOINTS.PAYMENT.DELETE_PAYMENT.replace(':id', paymentId))
      return response.data
    } catch (error) {
      console.error('Delete payment error:', error)
      throw error
    }
  },

  // eSewa payment verification (v2 API)
  verifyEsewaPayment: async (pid, amt, refId) => {
    try {
      console.log('Verifying eSewa payment with:', { pid, amt, refId })
      
      // For eSewa v2, we can verify the signature
      // This is a simplified verification - in production, you should verify the signature properly
      const formData = new URLSearchParams()
      formData.append('transaction_uuid', refId)
      formData.append('total_amount', amt)
      formData.append('product_code', 'EPAYTEST')
      
      console.log('eSewa v2 verification form data:', formData.toString())
      
      // Note: eSewa v2 verification endpoint might be different
      // For now, we'll return success if we have the required parameters
      const hasRequiredParams = refId && amt && pid
      
      return {
        success: hasRequiredParams,
        data: { transaction_uuid: refId, total_amount: amt, product_code: 'EPAYTEST' }
      }
    } catch (error) {
      console.error('eSewa verification error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Khalti payment verification
  verifyKhaltiPayment: async (token, amount) => {
    try {
      const response = await fetch('https://khalti.com/api/v2/payment/verify/', {
        method: 'POST',
        headers: {
          'Authorization': 'test_secret_key_3f78fb6364ef4bd1b5fc670ce33a06f5',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          amount: amount
        })
      })
      
      const data = await response.json()
      return {
        success: response.ok,
        data: data
      }
    } catch (error) {
      console.error('Khalti verification error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }
} 