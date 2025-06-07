import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, User } from "lucide-react"


const CertificateCard = ({ certificate }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-yellow-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Award className="w-8 h-8 text-yellow-500" />
          <Badge variant="secondary">Verified</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-lg mb-2">{certificate.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{certificate.description}</p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Issued by {certificate.issuedBy}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(certificate.issuedDate).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CertificateCard
