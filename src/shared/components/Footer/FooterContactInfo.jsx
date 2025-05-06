import React from 'react';

const FooterContactInfo = () => {
    return (
        <div className="mb-8 md:mb-0 animate__animated animate__fadeIn animate__delay-3s">
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p className="mb-2">HattiBan,Lalitput,Nepal</p>
            <p className="mb-2">Email: <a href="mailto:support@skillwave.com" className="hover:text-primary transition duration-300">support@skillwave.com</a></p>
            <p className="mb-2">Phone: <a href="tel:+1234567890" className="hover:text-primary transition duration-300">+123 456 7890</a></p>
        </div>
    );
};

export default FooterContactInfo;
