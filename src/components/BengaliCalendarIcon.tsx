import { cn } from "@/lib/utils";

export const BengaliCalendarIcon = ({ className }: { className?: string }) => (
    <svg
        width="36"
        height="36"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        aria-hidden="true"
    >
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#F44336', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#D32F2F', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        
        {/* Main calendar body */}
        <path d="M464 128H48c-8.8 0-16 7.2-16 16v320c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16V144c0-8.8-7.2-16-16-16z" fill="#f0f0f0"/>
        
        {/* Header */}
        <path d="M464 64H48C39.2 64 32 71.2 32 80v64h448V80c0-8.8-7.2-16-16-16z" fill="url(#grad1)"/>

        {/* Rings */}
        <rect x="128" y="32" width="48" height="64" rx="12" fill="#FFCA28"/>
        <rect x="336" y="32" width="48" height="64" rx="12" fill="#FFCA28"/>
        
        {/* Calendar Grid */}
        <g fill="#BDBDBD">
            <rect x="100" y="240" width="40" height="40" rx="4"/>
            <rect x="172" y="240" width="40" height="40" rx="4"/>
            <rect x="236" y="240" width="40" height="40" rx="4"/>
            <rect x="300" y="240" width="40" height="40" rx="4"/>
            <rect x="372" y="240" width="40" height="40" rx="4"/>

            <rect x="100" y="312" width="40" height="40" rx="4"/>
            <rect x="172" y="312" width="40" height="40" rx="4"/>
            <rect x="236" y="312" width="40" height="40" rx="4"/>
            <rect x="300" y="312" width="40" height="40" rx="4"/>
            <rect x="372" y="312" width="40" height="40" rx="4"/>

            <rect x="100" y="384" width="40" height="40" rx="4"/>
            <rect x="172" y="384" width="40" height="40" rx="4"/>
        </g>
        
        {/* Circled Days */}
        <circle cx="180" cy="204" r="44" fill="none" stroke="#E53935" strokeWidth="20"/>
        <rect x="160" y="184" width="40" height="40" rx="4" fill="#f0f0f0"/>

        <circle cx="340" cy="380" r="44" fill="none" stroke="#E53935" strokeWidth="20"/>
        <rect x="320" y="360" width="40" height="40" rx="4" fill="#f0f0f0"/>
    </svg>
);