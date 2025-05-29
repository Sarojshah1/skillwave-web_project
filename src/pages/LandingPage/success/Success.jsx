import React from "react"
import Header from "./Header"
import MainStatsGrid from "./MainStatsGrid"
import AdditionalStatsCarousel from "./AdditionalStatsCarousel"
import AchievementsBanner from "./AchievementsBanner"
import CallToAction from "./CallToAction"

export default function SuccessSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background and Decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full opacity-30 blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <Header />
        <MainStatsGrid />
        <AdditionalStatsCarousel />
        <AchievementsBanner />
        <CallToAction />
      </div>
    </section>
  )
}
