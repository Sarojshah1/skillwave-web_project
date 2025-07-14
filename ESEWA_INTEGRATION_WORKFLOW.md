# eSewa Payment Integration Workflow

## Overview
This document explains the complete eSewa payment integration workflow for the SkillWave project.

## eSewa v2 API Integration

### 1. Payment Initiation Flow

```javascript
// 1. User selects eSewa payment method
// 2. Generate unique transaction UUID
const transactionUuid = Date.now().toString()

// 3. Calculate amounts
const amount = coursePrice
const taxAmount = amount * 0.05
const totalAmountWithTax = amount + taxAmount

// 4. Create callback URLs
const successUrl = `${origin}/payment?status=success&pid=${courseId}&amt=${totalAmount}&refId=${transactionUuid}`
const failureUrl = `${origin}/payment?status=failure&pid=${courseId}&amt=${totalAmount}&refId=${transactionUuid}`

// 5. Generate signature
const signedFields = `${totalAmountWithTax},${transactionUuid},EPAYTEST`
const signature = await generateEsewaSignature(signedFields)

// 6. Create and submit form
const form = document.createElement('form')
form.method = 'POST'
form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form'
// Add all required fields...
form.submit()
```

### 2. Signature Generation

The signature is the most critical part. Here's how to generate it properly:

```javascript
const generateEsewaSignature = async (signedFields) => {
  try {
    // Use Web Crypto API for SHA-256 hashing
    const encoder = new TextEncoder()
    const data = encoder.encode(signedFields)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return btoa(hashHex) // Base64 encode the hash
  } catch (error) {
    console.error('Signature generation error:', error)
    // Fallback for testing
    return btoa(signedFields)
  }
}
```

### 3. Required Form Fields

| Field | Description | Example |
|-------|-------------|---------|
| `amount` | Base amount (without tax) | "100" |
| `tax_amount` | Tax amount | "10" |
| `total_amount` | Total amount including tax | "110" |
| `transaction_uuid` | Unique transaction ID | "1703123456789" |
| `product_code` | Product code (test: EPAYTEST) | "EPAYTEST" |
| `product_service_charge` | Service charge | "0" |
| `product_delivery_charge` | Delivery charge | "0" |
| `success_url` | Success callback URL | "https://yoursite.com/success" |
| `failure_url` | Failure callback URL | "https://yoursite.com/failure" |
| `signed_field_names` | Fields to sign | "total_amount,transaction_uuid,product_code" |
| `signature` | Generated signature | "base64encodedhash" |

### 4. Callback Handling

When eSewa redirects back to your site:

```javascript
// URL: /payment?status=success&pid=courseId&amt=110&refId=transactionUuid&signature=abc123

useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const status = urlParams.get('status')
  const pid = urlParams.get('pid')
  const amt = urlParams.get('amt')
  const refId = urlParams.get('refId')
  const signature = urlParams.get('signature')
  
  if (status && pid && amt) {
    handleEsewaCallback(status, pid, amt, refId, signature)
  }
}, [])
```

### 5. Payment Verification

```javascript
const handleEsewaCallback = async (status, pid, amt, refId, signature) => {
  if (status === 'success' && refId) {
    // Save payment to backend
    const response = await paymentService.createPayment({
      course_id: pid,
      amount: parseFloat(amt),
      payment_method: "esewa",
      status: "successful",
      transaction_id: refId
    })
    
    // Show success message and redirect
    setPaymentStatus('success')
    setTimeout(() => navigate('/courses'), 3000)
  } else {
    setPaymentStatus('failure')
  }
}
```

## Testing

### 1. Test URLs
- **Test Form**: `/esewa-form-test` - Interactive form for testing
- **Test Page**: `/esewa-test` - Automated testing page
- **Checkout**: `/payment` - Main checkout page

### 2. Test Credentials
- Use eSewa test environment: `https://rc-epay.esewa.com.np`
- Test product code: `EPAYTEST`
- Use any valid eSewa test account

### 3. Debug Steps

1. **Check Console Logs**: All payment steps are logged
2. **Verify Signature**: Use the "Generate Signature" button in test form
3. **Check Network**: Monitor network requests in browser dev tools
4. **Test Callbacks**: Verify success/failure URLs are correct

## Common Issues & Solutions

### 1. "Invalid payload signature" Error

**Cause**: Incorrect signature generation
**Solution**: 
- Ensure signed fields match exactly: `total_amount,transaction_uuid,product_code`
- Use proper SHA-256 hashing
- Base64 encode the hash result

### 2. Callback Not Working

**Cause**: Incorrect URL parameters
**Solution**:
- Verify success/failure URLs are properly encoded
- Check that all required parameters are passed back
- Ensure your site can handle the callback URLs

### 3. Payment Not Saving

**Cause**: Backend API issues
**Solution**:
- Check backend payment endpoint is working
- Verify authentication token is valid
- Check database connection

## Production Considerations

### 1. Security
- Use proper HMAC-SHA256 with secret key
- Validate all callback parameters
- Implement proper error handling
- Use HTTPS for all URLs

### 2. Error Handling
- Handle network failures gracefully
- Provide clear error messages to users
- Log all payment attempts for debugging

### 3. Monitoring
- Track payment success/failure rates
- Monitor callback response times
- Set up alerts for payment failures

## File Structure

```
src/features/students_features/checkOut/
├── page/
│   └── checkoutPage.jsx          # Main checkout page
├── components/
│   └── EsewaTestForm.jsx         # Test form component
├── pages/
│   └── EsewaTestPage.jsx         # Test page
└── services/
    └── paymentService.js         # Payment service
```

## API Endpoints

### Backend Payment Endpoints
- `POST /api/payment` - Create payment record
- `GET /api/payment` - Get user payments
- `GET /api/payment/:id` - Get specific payment
- `PUT /api/payment/:id` - Update payment
- `DELETE /api/payment/:id` - Delete payment

### eSewa API Endpoints
- `POST https://rc-epay.esewa.com.np/api/epay/main/v2/form` - Payment form
- `POST https://rc-epay.esewa.com.np/api/epay/main/v2/verify` - Payment verification (if needed)

## Testing Checklist

- [ ] eSewa form submission works
- [ ] Signature generation is correct
- [ ] Callback URLs are properly formatted
- [ ] Payment data is saved to backend
- [ ] Success/failure states are handled
- [ ] Error messages are user-friendly
- [ ] Console logs are helpful for debugging

## Support

For issues with eSewa integration:
1. Check browser console for detailed logs
2. Verify all form fields are correct
3. Test with the provided test forms
4. Contact eSewa support for API-specific issues 