"use client";

import Link from "next/link";
import Image from "next/image";

interface HomeLinkProps {
    children?: React.ReactNode;
    className?: string;
    href?: string;
}

const HomeLink = ({ children, className = "", href = "/" }: HomeLinkProps) => {
    return (
        <Link href={href} className={`flex items-center ${className}`}>
            <div className="relative h-8 w-8 mr-2">
                <Image
                    src="/logo.png"
                    alt="Vina Academy Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                />
            </div>
            {children && <span className="font-bold text-xl">{children}</span>}
        </Link>
    );
};

export default HomeLink;