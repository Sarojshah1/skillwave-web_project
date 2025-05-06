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
    <div className="p-8 bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        <HeroSection />
        <MissionVisionSection />
        <TeamSection />
        <TestimonialsSection />
        <AchievementsSection />
        <ContactSection />
        <CTASection />
      </div>
    </div>
  );
};

export default AboutUsPage;
