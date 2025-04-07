"use client";

import {useEffect} from 'react';

export default function LogoClickHandler() {
    useEffect(() => {
        // Xử lý việc quay về trang chủ từ Logo
        const logo = document.querySelector('a.text-2xl.font-bold');
        if (logo) {
            logo.addEventListener('click', function (e) {
                if (window.location.pathname.includes('/search')) {
                    e.preventDefault();
                    window.location.href = '/';
                }
            });
        }

        // Cleanup event listener on unmount
        return () => {
            const logo = document.querySelector('a.text-2xl.font-bold');
            if (logo) {
                logo.removeEventListener('click', () => {
                });
            }
        };
    }, []);

    // This component doesn't render anything
    return null;
}