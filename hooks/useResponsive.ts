"use client";

import { useState, useEffect } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

export function useResponsive() {
    const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkBreakpoint = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setBreakpoint("mobile");
                setIsMobile(true);
            } else if (width < 1024) {
                setBreakpoint("tablet");
                setIsMobile(false);
            } else {
                setBreakpoint("desktop");
                setIsMobile(false);
            }
        };

        checkBreakpoint();
        window.addEventListener("resize", checkBreakpoint);

        return () => window.removeEventListener("resize", checkBreakpoint);
    }, []);

    return { breakpoint, isMobile };
}
