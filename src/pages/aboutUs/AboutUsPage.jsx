import React from 'react';
import HeroSection from './components/HeroSection';
import MissionVisionSection from './components/MissionVisionSection';
import TeamSection from './components/TeamSection';
import TestimonialsSection from './components/TestimonialSection';
import AchievementsSection from './components/AchievementSection';
import ContactSection from './components/ContactSection';
import CTASection from './components/CTASection';

const AboutUsPage = () => {
  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <HeroSection />
        <MissionVisionSection />
        <AchievementsSection />
        <TeamSection />
        <TestimonialsSection />
        <ContactSection />
        <CTASection />
      </div>
    </div>
  );
};

export default AboutUsPage;
