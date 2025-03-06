"use client";

import { User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number | string;
  className?: string;
}

export function Avatar({ src, alt = "Avatar", size = "100%", className = "" }: AvatarProps) {
  const [error, setError] = useState(false);
  const defaultAvatar = "/images/default-avatar.png";
  
  return (
    <div 
      className={`relative rounded-full overflow-hidden bg-gray-200 ${className}`}
      style={{ 
        width: typeof size === "number" ? `${size}px` : size, 
        height: typeof size === "number" ? `${size}px` : size 
      }}
    >
      {!error && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <User 
            className="text-gray-500"
            size={typeof size === "number" ? size * 0.6 : 24}
          />
        </div>
      )}
    </div>
  );
}