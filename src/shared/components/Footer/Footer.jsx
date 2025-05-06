import React from 'react';
import FooterLogoDescription from './FooterLogoDescription';
import FooterNavLinks from './FooterNavLinks';
import FooterContactInfo from './FooterContactInfo';
import FooterSocialLinks from './FooterSocialLinks';
import FooterCTA from './FooterCTA';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-700 pb-8">
                    {/* Logo and Description */}
                    <FooterLogoDescription />

                    {/* Navigation Links */}
                    <FooterNavLinks />

                    {/* Contact Information */}
                    <FooterContactInfo />
                </div>

                {/* Social Media Links */}
                <FooterSocialLinks />

                {/* Call to Action */}
                <FooterCTA />
            </div>
        </footer>
    );
};

export default Footer;
