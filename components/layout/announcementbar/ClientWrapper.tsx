"use client";
import { useState, useEffect } from "react";
import AnnouncementBar from "@/components/layout/announcementbar/AnnouncementBar";

const ClientWrapper = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient ? <AnnouncementBar onClose={() => { }} /> : null;
};

export default ClientWrapper;
