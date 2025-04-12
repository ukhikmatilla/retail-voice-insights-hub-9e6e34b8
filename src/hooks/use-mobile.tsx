
import { useState, useEffect } from 'react';

/**
 * Custom hook for detecting if the current viewport matches a provided media query
 * @param query - The media query to check against
 * @returns boolean indicating whether the media query matches
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create a media query list
    const mediaQueryList = window.matchMedia(query);
    
    // Set the initial value
    setMatches(mediaQueryList.matches);

    // Define the callback function
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the callback as a listener
    mediaQueryList.addEventListener('change', handleChange);

    // Clean up
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

/**
 * Custom hook for determining if the current device is mobile
 * @returns boolean indicating whether the device is likely a mobile device
 */
export const useMobileDevice = (): boolean => {
  return useMediaQuery('(max-width: 768px)');
};

/**
 * Custom hook for determining if the current device is a tablet
 * @returns boolean indicating whether the device is likely a tablet device
 */
export const useTabletDevice = (): boolean => {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
};

/**
 * Custom hook for determining if the current device is a desktop
 * @returns boolean indicating whether the device is likely a desktop device
 */
export const useDesktopDevice = (): boolean => {
  return useMediaQuery('(min-width: 1025px)');
};

export default useMobileDevice;
