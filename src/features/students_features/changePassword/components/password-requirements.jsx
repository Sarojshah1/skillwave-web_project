
import { Check, X } from "lucide-react"


export function PasswordRequirements({ password }) {
  const requirements = [
    {
      text: "At least 8 characters",
      met: password.length >= 8,
    },
    {
      text: "One uppercase letter",
      met: /[A-Z]/.test(password),
    },
    {
      text: "One lowercase letter",
      met: /[a-z]/.test(password),
    },
    {
      text: "One number",
      met: /[0-9]/.test(password),
    },
    {
      text: "One special character",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ]

  if (password.length === 0) {
    return null
  }

  return (
    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
      <p className="text-sm font-medium text-blue-800 mb-3">Password requirements:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center text-sm">
            <div className={`mr-2 flex-shrink-0 ${req.met ? "text-green-600" : "text-gray-400"}`}>
              {req.met ? (
                <div className="bg-green-100 rounded-full p-0.5">
                  <Check className="h-3 w-3" />
                </div>
              ) : (
                <div className="bg-gray-100 rounded-full p-0.5">
                  <X className="h-3 w-3" />
                </div>
              )}
            </div>
            <span className={req.met ? "text-gray-700 font-medium" : "text-gray-500"}>{req.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
