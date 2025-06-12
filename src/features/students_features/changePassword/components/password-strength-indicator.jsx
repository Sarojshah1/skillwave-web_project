
import { cn } from "@/lib/utils"


export function PasswordStrengthIndicator({ password }) {
  // Calculate password strength
  const getStrength = (password) => {
    let strength = 0
    if (password.length === 0) return strength

    // Length check
    if (password.length >= 8) strength += 1
    if (password.length >= 12) strength += 1

    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    return Math.min(strength, 5)
  }

  const strength = getStrength(password)
  const percentage = (strength / 5) * 100

  const getStrengthText = ()=> {
    if (password.length === 0) return { text: "Password strength", color: "text-gray-500" }
    if (strength <= 1) return { text: "Very weak", color: "text-red-600" }
    if (strength === 2) return { text: "Weak", color: "text-orange-600" }
    if (strength === 3) return { text: "Moderate", color: "text-yellow-600" }
    if (strength === 4) return { text: "Strong", color: "text-green-600" }
    return { text: "Very strong", color: "text-emerald-600" }
  }

  const getStrengthColor = () => {
    if (password.length === 0) return "bg-gray-200"
    if (strength <= 1) return "bg-gradient-to-r from-red-500 to-red-600"
    if (strength === 2) return "bg-gradient-to-r from-orange-500 to-orange-600"
    if (strength === 3) return "bg-gradient-to-r from-yellow-500 to-yellow-600"
    if (strength === 4) return "bg-gradient-to-r from-green-500 to-green-600"
    return "bg-gradient-to-r from-emerald-500 to-emerald-600"
  }

  const { text, color } = getStrengthText()

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <span className={cn("text-sm font-medium", color)}>{text}</span>
        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
          {password.length > 0 ? `${strength}/5` : "0/5"}
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-500 ease-out rounded-full shadow-sm", getStrengthColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
