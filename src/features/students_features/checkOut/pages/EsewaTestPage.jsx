"use client"

import { useState } from "react"
import { paymentService } from "../services/paymentService"

const EsewaTestPage = () => {
  const [testResults, setTestResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const addTestResult = (message, type = 'info') => {
    setTestResults(prev => [...prev, { message, type, timestamp: new Date().toISOString() }])
  }

  const testEsewaVerification = async () => {
    setIsLoading(true)
    addTestResult('Testing eSewa verification...', 'info')
    
    try {
      // Test with sample data
      const result = await paymentService.verifyEsewaPayment(
        'test-course-id',
        '1000',
        'test-ref-id'
      )
      
      addTestResult(`eSewa verification result: ${JSON.stringify(result)}`, result.success ? 'success' : 'error')
    } catch (error) {
      addTestResult(`eSewa verification error: ${error.message}`, 'error')
    }
    
    setIsLoading(false)
  }

  const testPaymentCreation = async () => {
    setIsLoading(true)
    addTestResult('Testing payment creation...', 'info')
    
    try {
      const result = await paymentService.createPayment({
        course_id: 'test-course-id',
        amount: 1000,
        payment_method: 'esewa',
        status: 'successful',
        transaction_id: 'test-transaction-id'
      })
      
      addTestResult(`Payment creation result: ${JSON.stringify(result)}`, 'success')
    } catch (error) {
      addTestResult(`Payment creation error: ${error.message}`, 'error')
    }
    
    setIsLoading(false)
  }

  const clearResults = () => {
    setTestResults([])
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">eSewa Payment Integration Test</h1>
          
          <div className="space-y-4 mb-6">
            <button
              onClick={testEsewaVerification}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Testing...' : 'Test eSewa Verification'}
            </button>
            
            <button
              onClick={testPaymentCreation}
              disabled={isLoading}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 ml-4"
            >
              {isLoading ? 'Testing...' : 'Test Payment Creation'}
            </button>
            
            <button
              onClick={clearResults}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 ml-4"
            >
              Clear Results
            </button>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Test Results:</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {testResults.length === 0 ? (
                <p className="text-gray-500">No test results yet. Run a test to see results.</p>
              ) : (
                testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      result.type === 'success' ? 'bg-green-100 text-green-800' :
                      result.type === 'error' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-sm">{result.message}</span>
                      <span className="text-xs text-gray-500">{new Date(result.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Debug Information:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Check browser console for detailed logs</li>
              <li>• eSewa test environment: https://uat.esewa.com.np</li>
              <li>• Test credentials: Use any valid eSewa test account</li>
              <li>• Payment amount: Use small amounts for testing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EsewaTestPage 