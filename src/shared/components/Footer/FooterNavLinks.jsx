import React from 'react';

const FooterNavLinks = () => {
    return (
        <div className="flex flex-col md:flex-row mb-8 md:mb-0 animate__animated animate__fadeIn animate__delay-2s">
            <div className="mr-8">
                <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                <ul className="space-y-2">
                    <li><a href="#home" className="hover:text-primary transition duration-300">Home</a></li>
                    <li><a href="#courses" className="hover:text-primary transition duration-300">Courses</a></li>
                    <li><a href="#about" className="hover:text-primary transition duration-300">About Us</a></li>
                    <li><a href="#contact" className="hover:text-primary transition duration-300">Contact</a></li>
                </ul>
            </div>
            <div>
                <h2 className="text-lg font-semibold mb-4">Support</h2>
                <ul className="space-y-2">
                    <li><a href="#faq" className="hover:text-primary transition duration-300">FAQ</a></li>
                    <li><a href="#privacy-policy" className="hover:text-primary transition duration-300">Privacy Policy</a></li>
                    <li><a href="#terms" className="hover:text-primary transition duration-300">Terms of Service</a></li>
                </ul>
            </div>
        </div>
    );
};

export default FooterNavLinks;
