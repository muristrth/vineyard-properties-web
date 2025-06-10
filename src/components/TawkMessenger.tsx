'use client'

import React, { useEffect, memo } from 'react';

/**
 * TawkMessenger Component
 *
 * This component embeds the Tawk.to chat widget into your React application.
 * It dynamically loads the Tawk.to script when the component mounts.
 *
 * Usage:
 * Place this component typically in your root App.tsx or a layout component
 * that is always rendered, or within a specific component like a Footer.
 * <TawkMessenger />
 */
declare global {
  interface Window {
    Tawk_API: Record<string, unknown>;
    Tawk_LoadStart: Date;
  }
}

const TawkMessenger: React.FC = () => {
  useEffect(() => {
    // Check if the script already exists to prevent multiple injections.
    if (document.getElementById('tawk-to-script')) {
      return;
    }

    // Initialize Tawk.to API variables if they don't exist.
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Create the script element.
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0]; // Get the first script tag to insert before it.

    s1.id = 'tawk-to-script'; // Assign an ID for easier lookup and prevention of duplicates.
    s1.async = true; // Load asynchronously to prevent blocking the main thread.
    s1.src = 'https://embed.tawk.to/6704cfe802d78d1a30edf3e4/1i9lco96r'; // Updated Tawk.to widget URL.
    s1.charset = 'UTF-8'; // Character set.
    s1.setAttribute('crossorigin', '*'); // CORS attribute for security.

    // Insert the script into the DOM before the first existing script tag.
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else {
      // Fallback if no script tags exist (unlikely in a typical HTML document),
      // append directly to the body.
      document.body.appendChild(s1);
    }

    // Cleanup function to remove the script tag when the component unmounts.
    return () => {
      const scriptElement = document.getElementById('tawk-to-script');
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount.

  return null;
};

// Use memo to prevent unnecessary re-renders as this component has no props.
export default memo(TawkMessenger);
