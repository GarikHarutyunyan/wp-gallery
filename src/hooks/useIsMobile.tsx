import { useState, useEffect } from 'react';

function useIsMobile(breakpoint = 720) {
    // State to store whether the screen is mobile or not․
    const [isMobile, setIsMobile] = useState((document.querySelector(".reacg-section__body")?.clientWidth || 0) < breakpoint);

    // Handler to check window width and update isMobile state․
    const checkMobile = () => {
        setIsMobile((document.querySelector(".reacg-section__body")?.clientWidth || 0) < breakpoint);
    };

    useEffect(() => {
        // Add event listener on window resize․
        window.addEventListener('resize', checkMobile);

        // Call the handler initially to set the right value․
        checkMobile();

        // Clean up event listener on component unmount․
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, [breakpoint]);

    return isMobile;
}

export default useIsMobile;