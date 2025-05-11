"use client";

import "react-toastify/dist/ReactToastify.css";
import "../app/globals.css";
import { Bounce, ToastContainer } from "react-toastify";

interface ToastProviderProps {
    children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {

    return (
        <>
            {children}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="light"
                transition={Bounce}
            />
        </>
    );
}