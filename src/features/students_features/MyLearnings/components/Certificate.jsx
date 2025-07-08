import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import logo from "../../../assets/logo.png";
import axios from 'axios';
import { ICONS_PATHS } from '@/shared/constants/imagePaths';
import { useUserProfileQuery } from '@/features/students_features/student_profile/hooks/useUserProfile';

const CERT_WIDTH = 1120; // px (A4 landscape at 96dpi)
const CERT_HEIGHT = 792; // px

const Certificate = ({ courseName, instructorName, courseId, onClose }) => {
    const certificateRef = useRef();
    const [logoLoaded, setLogoLoaded] = useState(false);
    const formattedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid');

    // Fetch user profile
    const { data: userProfile, isLoading, error } = useUserProfileQuery();
    let studentName = 'Student Name';
    if (userProfile) {
        studentName = userProfile.fullName || userProfile.name || `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim();
    }

    const base64ToBlob = (base64, contentType = 'image/png') => {
        const byteCharacters = atob(base64);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    };

    useEffect(() => {
        const generateAndStoreCertificate = async () => {
            const input = certificateRef.current;
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#fff',
                width: CERT_WIDTH,
                height: CERT_HEIGHT,
                scrollY: -window.scrollY
            });
            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                const file = new File([blob], 'certificate.png', { type: 'image/png' });
                formData.append('certificate', file);
                formData.append('course_id', courseId);
                try {
                    const response = await axios.post('http://localhost:3000/api/certificate', formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log('Certificate saved successfully:', response.data);
                } catch (error) {
                    console.error('Error saving certificate:', error);
                }
            }, 'image/png');
        };
        if (!window.certificateGenerated && userProfile && logoLoaded) {
            window.certificateGenerated = true;
            generateAndStoreCertificate();
        }
    }, [courseName, instructorName, formattedDate, userProfile, logoLoaded]);

    const downloadCertificate = () => {
        const input = certificateRef.current;
        html2canvas(input, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#fff',
            width: CERT_WIDTH,
            height: CERT_HEIGHT,
            scrollY: -window.scrollY
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'px', [CERT_WIDTH, CERT_HEIGHT]);
            pdf.addImage(imgData, 'PNG', 0, 0, CERT_WIDTH, CERT_HEIGHT);
            pdf.save(`${studentName}_certificate.pdf`);
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            </div>
        );
    }
    if (error) {
        return <div className="text-center text-red-600 py-8">Failed to load user profile for certificate.</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div
                ref={certificateRef}
                style={{
                    width: CERT_WIDTH,
                    height: CERT_HEIGHT,
                    background: '#fff',
                    border: '8px double #2563eb',
                    borderRadius: 24,
                    boxShadow: '0 8px 32px 0 rgba(60, 120, 200, 0.18)',
                    fontFamily: 'serif',
                    position: 'relative',
                    overflow: 'hidden',
                    margin: '0 auto',
                    padding: 0,
                }}
                className="certificate-a4-landscape bg-white flex flex-col justify-between"
            >
                {onClose && (
                    <button
                        onClick={onClose}
                        style={{ position: 'absolute', top: 8, right: 8, zIndex: 50, border: '2px solid #2563eb', width: 44, height: 44 }}
                        className="bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 focus:outline-none"
                        aria-label="Close certificate"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#2563eb" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
                {/* Top Row: Logo */}
                <div style={{ display: 'flex', alignItems: 'center', padding: '32px 48px 0 48px', justifyContent: 'flex-start' }}>
                    <img
                        src={ICONS_PATHS.logoPrimary}
                        alt="Skillwave"
                        style={{ width: 120, height: 'auto', marginRight: 0 }}
                        onLoad={() => setLogoLoaded(true)}
                    />
                </div>
                {/* Main Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 48px' }}>
                    <h2 style={{ fontSize: 48, fontWeight: 700, color: '#2563eb', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 2 }}>Certificate of Completion</h2>
                    <p style={{ fontSize: 22, color: '#64748b', fontStyle: 'italic', fontWeight: 500, marginBottom: 8 }}>This is to certify that</p>
                    <h1 style={{ fontSize: 40, fontWeight: 700, color: '#0f172a', margin: '16px 0' }}>{studentName}</h1>
                    <p style={{ fontSize: 22, color: '#64748b', fontWeight: 500, marginBottom: 8 }}>has successfully completed the course</p>
                    <h2 style={{ fontSize: 32, fontWeight: 600, color: '#334155', fontStyle: 'italic', margin: '16px 0' }}>{courseName}</h2>
                    <p style={{ fontSize: 22, color: '#64748b', fontWeight: 500, marginBottom: 8 }}>on</p>
                    <p style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 0 }}>{formattedDate}</p>
                </div>
                {/* Signature Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 48px 48px 48px' }}>
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ color: '#64748b', fontSize: 18 }}>Date</p>
                        <p style={{ fontWeight: 600, fontSize: 20 }}>{formattedDate}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        {/* SVG signature that spells 'Saroj' in a cursive style */}
                        <svg width="160" height="60" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto 8px auto' }}>
                          <path d="M10 40 Q 15 20, 25 40 Q 35 60, 40 40 Q 45 20, 55 40 Q 65 60, 70 40 Q 75 20, 85 40 Q 95 60, 100 40 Q 105 20, 115 40 Q 125 60, 130 40 Q 135 20, 145 40" stroke="#2563eb" strokeWidth="2.5" fill="none"/>
                          <path d="M18 38 Q 22 32, 26 38" stroke="#2563eb" strokeWidth="1.5" fill="none"/>
                          <path d="M48 38 Q 52 32, 56 38" stroke="#2563eb" strokeWidth="1.5" fill="none"/>
                          <path d="M78 38 Q 82 32, 86 38" stroke="#2563eb" strokeWidth="1.5" fill="none"/>
                          <path d="M108 38 Q 112 32, 116 38" stroke="#2563eb" strokeWidth="1.5" fill="none"/>
                          <text x="15" y="35" fontFamily="'Pacifico', cursive" fontSize="32" fill="#2563eb" opacity="0.7">Saroj</text>
                        </svg>
                        <div style={{ height: 2, background: '#2563eb', width: 180, margin: '8px auto 8px auto' }}></div>
                        <p style={{ color: '#64748b', fontSize: 16 }}>Board of Director</p>
                        <p style={{ fontWeight: 600, fontSize: 20, color: '#0f172a', marginTop: 4 }}>Saroj Kumar Sah</p>
                    </div>
                </div>
                {/* Footer */}
                <div style={{ position: 'absolute', bottom: 24, left: 0, width: '100%', textAlign: 'center' }}>
                    <p style={{ fontSize: 16, color: '#64748b' }}>This certificate is awarded by</p>
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: '#2563eb', margin: 0 }}>Skillwave</h3>
                    <p style={{ fontSize: 15, color: '#64748b', marginTop: 2 }}>Empowering skills, one course at a time.</p>
                </div>
            </div>
            <div className="text-center mt-8">
                <button
                    onClick={downloadCertificate}
                    className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 transition-colors"
                    disabled={!logoLoaded}
                >
                    Download Certificate
                </button>
            </div>
        </div>
    );
};

export default Certificate;
