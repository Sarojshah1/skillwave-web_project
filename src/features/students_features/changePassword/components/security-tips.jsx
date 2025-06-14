import { ShieldAlert, Key, RefreshCw, Fingerprint, Zap, Star } from "lucide-react"

export function SecurityTips() {
  const tips = [
    {
      icon: <Key className="h-5 w-5 text-blue-600" />,
      title: "Use unique passwords",
      description: "Never reuse passwords across different accounts for maximum security.",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
    },
    {
      icon: <RefreshCw className="h-5 w-5 text-green-600" />,
      title: "Update regularly",
      description: "Change your passwords every 3-6 months to stay protected.",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      icon: <Fingerprint className="h-5 w-5 text-purple-600" />,
      title: "Enable 2FA",
      description: "Add two-factor authentication for an extra layer of security.",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
    },
    {
      icon: <Zap className="h-5 w-5 text-yellow-600" />,
      title: "Avoid common words",
      description: "Don't use dictionary words, names, or personal information.",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100",
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-3 rounded-xl shadow-md">
          <ShieldAlert className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-bold text-gray-800">Security Tips</h3>
          <p className="text-sm text-gray-600">Keep your account safe</p>
        </div>
        <Star className="h-5 w-5 text-yellow-500 ml-auto" />
      </div>

      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={`${tip.bgColor} p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer`}
          >
            <div className="flex items-start">
              <div
                className={`${tip.iconBg} p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200`}
              >
                {tip.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors">
                  {tip.title}
                </h4>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
