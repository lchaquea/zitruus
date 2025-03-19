'use client';

import React from 'react';

interface CalendlyOptions {
  locale?: string;
}

export const useCalendly = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // Hide Calendly's default loader without affecting other elements
    const style = document.createElement('style');
    style.innerHTML = `
      .calendly-spinner { 
        opacity: 0 !important;
        pointer-events: none !important;
      }
      .calendly-overlay .calendly-popup {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
      .calendly-overlay .calendly-popup.calendly-loaded {
        opacity: 1;
      }
      /* Ensure Calendly popup doesn't interfere with other elements */
      .calendly-overlay {
        background-color: transparent !important;
      }
    `;
    document.head.appendChild(style);

    const handleCalendlyEvent = (e: any) => {
      if (e.data.event && 
          (e.data.event.indexOf('calendly') === 0 || 
           e.data.event.indexOf('Calendly') === 0)) {
        
        // Handle specific Calendly events
        switch (e.data.event) {
          case 'calendly.profile_page_shown':
          case 'calendly.event_type_viewed':
            // Delay hiding loader slightly to ensure smooth transition
            setTimeout(() => {
              setIsLoading(false);
              // Add loaded class to popup for smooth transition
              const popup = document.querySelector('.calendly-popup');
              if (popup) popup.classList.add('calendly-loaded');
            }, 500);
            break;
          case 'calendly.popup_closed':
          case 'calendly.popup_hidden':
          case 'calendly.button_clicked':
            // Immediately hide loader when popup is closed
            setIsLoading(false);
            break;
          case 'calendly.error':
            setIsLoading(false);
            break;
        }
      }
    };

    // Add click event listener for the Calendly close button
    const handleCloseButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.calendly-close-overlay') || target.closest('.calendly-popup-close')) {
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    document.addEventListener('click', handleCloseButtonClick, true);
    
    // Add a safety timeout to hide loader if events fail
    const safetyTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 8000); // Increased timeout for slower connections

    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
      document.removeEventListener('click', handleCloseButtonClick, true);
      clearTimeout(safetyTimeout);
      document.head.removeChild(style);
    };
  }, []);

  const openCalendly = (options?: CalendlyOptions | React.MouseEvent) => {
    // Handle both function signatures for backward compatibility
    if (options && 'preventDefault' in options) {
      options.preventDefault();
      options = {}; // Reset options to empty object
    }
    
    const { locale = 'en' } = options as CalendlyOptions || {};
    
    // Only set loading if Calendly is not already initialized
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      setIsLoading(true);
      
      try {
        (window as any).Calendly.initPopupWidget({
          url: 'https://calendly.com/lucas-zitruus/consultants',
          onClose: () => setIsLoading(false),
          prefill: {
            email: '',
            name: '',
          },
          customData: {
            source: 'website',
            locale: locale,
          },
        });
      } catch (error) {
        setIsLoading(false);
        throw new Error(`Failed to initialize Calendly: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } else {
      setIsLoading(false);
      throw new Error('Calendly script not loaded');
    }
  };

  return { openCalendly, isLoading };
}; 