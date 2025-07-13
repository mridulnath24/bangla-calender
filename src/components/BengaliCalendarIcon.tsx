import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export const BengaliCalendarIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className={cn("h-8 w-8", props.className)}
        {...props}
    >
        <path
            fill="#FF9933"
            d="M40,8H8c-2.2,0-4,1.8-4,4v4h40v-4C44,9.8,42.2,8,40,8z"
        />
        <path
            fill="#F5F5DC"
            d="M40,40H8c-2.2,0-4-1.8-4-4V16h40v20C44,38.2,42.2,40,40,40z"
        />
        <path
            fill="#4169E1"
            d="M36,32H28v-8h8V32z M26,32h-8v-8h8V32z M16,32H8v-8h8V32z M36,22h-8v-8h8V22z M26,22h-8v-8h8V22z M16,22H8v-8h8V22z"
        />
        <g fill="#FF9933">
            <path d="M10,8V6c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2v2h-2V6h-2v2H10z" />
            <path d="M18,8V6c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2v2h-2V6h-2v2H18z" />
            <path d="M26,8V6c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2v2h-2V6h-2v2H26z" />
            <path d="M34,8V6c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2v2h-2V6h-2v2H34z" />
        </g>
    </svg>
);