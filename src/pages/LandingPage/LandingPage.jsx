import React from "react";
import Header from "./Header/Header";
import Success from "./success/Success";
import Features from "./features/Features";
import TestimonialsSection from "./Testimonial/TestimonialsSection";
import FAQSection from "./FAQ/FAQSection";

const Landing = () => {
  return (
    <>
    <Header/>
    <Success/>
    <Features/>
    {/* <CategoriesPage/> */}
    {/* <CoursesPage/> */}
    <TestimonialsSection/>
    <FAQSection/>



      
    </>
  );
};

export default Landing;