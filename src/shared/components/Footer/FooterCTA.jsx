import React from 'react';

const FooterCTA = () => {
    return (
        <div className="text-center animate__animated animate__fadeIn animate__delay-5s">
            <p className="mb-4 text-gray-400">© 2024 SkillWave. All rights reserved.</p>
            <a href="#join" className="bg-primary text-white py-3 px-6 rounded-full shadow-lg hover:bg-secondary transition duration-300 transform hover:scale-105">
                Join Our Community
            </a>
        </div>
    );
};

export default FooterCTA;
