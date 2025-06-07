import React from "react"
import CertificateCard from "./certificate-card"

const CertificatesSection = ({ certificates }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Certificates</h2>
        <span className="text-gray-500">{certificates.length} certificates earned</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <CertificateCard key={certificate.id} certificate={certificate} />
        ))}
      </div>
    </div>
  )
}

export default CertificatesSection
