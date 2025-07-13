import { cn } from "@/lib/utils";
import { SVGProps } from "react";

export const SunriseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2v8"/>
    <path d="M5.2 11.2l1.4 1.4"/>
    <path d="M2 18h20"/>
    <path d="M20 15H4v-3.34a8 8 0 0 1 16 0V15z"/>
    <path d="M17.4 11.2l1.4-1.4"/>
  </svg>
);

export const SunsetIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 10V2"/>
    <path d="M5.2 11.2l1.4 1.4"/>
    <path d="M2 18h20"/>
    <path d="M20 15H4v-3.34a8 8 0 0 1 16 0V15z"/>
    <path d="M17.4 11.2l1.4-1.4"/>
    <path d="m16 22-4-4-4 4"/>
  </svg>
);

export const MoonriseIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 18h20" />
        <path d="M8 18V6.47c0-2.5 1.5-5 4-5 2.5 0 4 2.5 4 5v11.53" />
        <path d="m16 22-4-4-4 4" />
    </svg>
);


export const MoonsetIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 18h20" />
        <path d="M8 6.47V18h8V6.47c0-2.5-1.5-5-4-5s-4 2.5-4 5Z" />
        <path d="m16 4-4-4-4 4" />
    </svg>
);
