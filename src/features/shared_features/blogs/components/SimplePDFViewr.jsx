import { useState } from "react"
import { FaDownload, FaExternalLinkAlt, FaEye } from "react-icons/fa"

const SimplePDFViewer = ({ pdfUrl, title }) => {
  const [viewMode, setViewMode] = useState("embed") 

  const downloadPDF = () => {
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = `${title || "document"}.pdf`
    link.click()
  }

  const openInNewTab = () => {
    window.open(pdfUrl, "_blank")
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#49BBBD] to-purple-50 border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Article Document</h3>
            <p className="text-gray-600 text-sm">View the full article content</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={openInNewTab}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === "embed"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-300"
              }`}
              title="Embed View"
            >
              <FaEye className="w-4 h-4" />
            </button>
            <button
              onClick={openInNewTab}
              className="p-2 rounded-lg bg-white text-gray-600 hover:bg-gray-50 border border-gray-300 transition-colors duration-200"
              title="Open in New Tab"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
            </button>
            <button
              onClick={downloadPDF}
              className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
              title="Download PDF"
            >
              <FaDownload className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimplePDFViewer
