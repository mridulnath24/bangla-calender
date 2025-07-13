import { cn } from "@/lib/utils";

export const ShubhoDinIcon = ({ className }: { className?: string }) => (
    <svg 
        width="32" 
        height="32" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={cn("text-primary", className)}
        aria-hidden="true"
    >
        <path d="M12 2C17.523 0 22 4.477 22 10S17.523 18 12 18 2 13.523 2 8 6.477 2 12 2z" transform="translate(0 2)" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
        <path d="M12 5.5v2m6.503 1.997l-1.414 1.414M18.5 12h-2m-3.003 6.503l-1.414-1.414M12 18.5v-2m-6.503-1.997l1.414-1.414M5.5 12h2m3.003-6.503l1.414 1.414" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
