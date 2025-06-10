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
const TawkMessenger: React.FC = () => {
  useEffect(() => {
    // Check if the script already exists to prevent multiple injections.
    // This is important to avoid issues if the component re-renders or if
    // the TawkMessenger component is mounted multiple times (though generally it should be once).
    if (document.getElementById('tawk-to-script')) {
      return;
    }

    // Initialize Tawk.to API variables if they don't exist.
    // This part of the code is directly from Tawk.to's embed script.
    // It makes Tawk_API and Tawk_LoadStart globally available for the script.
    (window as any).Tawk_API = (window as any).Tawk_API || {};
    (window as any).Tawk_LoadStart = new Date();

    // Create the script element.
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0]; // Get the first script tag to insert before it.

    s1.id = 'tawk-to-script'; // Assign an ID for easier lookup and prevention of duplicates.
    s1.async = true; // Load asynchronously to prevent blocking the main thread.
    // Updated Tawk.to widget URL
    s1.src = 'https://embed.tawk.to/6704cfe802d78d1a30edf3e4/1i9lco96r';
    s1.charset = 'UTF-8'; // Character set.
    s1.setAttribute('crossorigin', '*'); // CORS attribute for security.

    // Insert the script into the DOM before the first existing script tag.
    // This is the method recommended by Tawk.to for proper loading.
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else {
      // Fallback if no script tags exist (unlikely in a typical HTML document),
      // append directly to the body.
      document.body.appendChild(s1);
    }

    // Optional: Cleanup function if you ever need to remove the widget from the DOM.
    // Note: Tawk.to widgets often create global elements and listeners that are not
    // easily cleaned up without their own specific API methods. For a persistent
    // chat widget, a full removal on component unmount might not be desired.
    return () => {
      const scriptElement = document.getElementById('tawk-to-script');
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
      // If Tawk.to provides an API for widget destruction, you might call it here:
      // e.g., (window as any).Tawk_API.hideWidget(); or (window as any).Tawk_API.destroy();
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount.

  // This component does not render any visible JSX itself; it's purely for side effects.
  return null;
};

// Use memo to prevent unnecessary re-renders as this component has no props.
export default memo(TawkMessenger);