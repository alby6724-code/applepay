import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Headphones } from 'lucide-react';
import { useConfig } from '../context/useConfig';
import type { BrandLogoType } from '../types/config';

export const CenterPopup: React.FC = () => {
  const { settings, isPopupVisible, closePopup, openKnowMore } = useConfig();
  const [isClosing, setIsClosing] = useState(false);

  // Smooth dismissal with exit animation
  const handleDismiss = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      closePopup();
      setIsClosing(false);
    }, 280);
  }, [isClosing, closePopup]);

  // Listen for Escape key while popup is visible
  useEffect(() => {
    if (!isPopupVisible || isClosing) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPopupVisible, isClosing, handleDismiss]);

  if (!isPopupVisible && !isClosing) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleDismiss();
    }
  };

  const handleKnowMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (settings.primaryButtonAction === 'modal') {
      openKnowMore();
    } else if (settings.primaryButtonUrl) {
      window.open(settings.primaryButtonUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const renderPopupIcon = (type: BrandLogoType) => {
    switch (type) {
      case 'apple':
        return (
          <svg
            className="popup-brand-svg apple"
            viewBox="0 0 170 170"
            width="32"
            height="32"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.77-7.97-12.24-14.67-6.05-9.11-10.82-19.74-14.32-31.9-3.5-12.16-5.25-23.77-5.25-34.84 0-14.15 3.75-26.06 11.26-35.73 7.51-9.67 16.92-14.62 28.23-14.86 4.8 0 10.05 1.25 15.75 3.76 5.7 2.5 9.77 3.82 12.2 3.94 2.04 0 6.2-1.32 12.49-3.94 6.29-2.63 11.51-3.82 15.67-3.59 12.37.74 22.39 5.37 30.06 13.9-10.99 6.64-16.37 15.76-16.14 27.34.23 9.4 3.79 17.27 10.68 23.6 6.89 6.33 15.22 10.07 25 11.22-2.18 6.53-4.8 12.87-7.86 19.03zM119.22 33.64c0-7.38 2.66-14.17 7.98-20.37 5.32-6.2 11.83-10.28 19.53-12.27.32 1.3.48 2.66.48 4.08 0 7.37-2.73 14.31-8.19 20.82-5.46 6.51-12.06 10.36-19.8 11.55l0-3.81z" />
          </svg>
        );
      case 'shield':
        return <ShieldCheck className="popup-brand-svg shield" size={32} aria-hidden="true" />;
      case 'support':
        return <Headphones className="popup-brand-svg support" size={32} aria-hidden="true" />;
      case 'messages':
      default:
        return (
          <svg className="popup-brand-svg messages" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="7.5" fill="#34c759" />
            <path
              d="M16 6.5C10.48 6.5 6 10.4 6 15.2C6 17.9 7.4 20.3 9.65 21.8C9.5 22.7 9.15 23.85 8.18 25C8.04 25.18 8.08 25.44 8.27 25.56C8.38 25.63 8.51 25.65 8.64 25.62C10.74 25.1 12.56 24.1 13.68 23.3C14.43 23.55 15.2 23.7 16 23.7C21.52 23.7 26 19.8 26 15C26 10.3 21.52 6.5 16 6.5Z"
              fill="#ffffff"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`popup-backdrop-dim ${isClosing ? 'dim-fade-out' : 'dim-fade-in'}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-heading"
      aria-describedby="alert-description"
    >
      <div
        className={`popup-alert-card ${isClosing ? 'popup-scale-out' : 'popup-scale-in'}`}
        style={{
          animationDuration: `${settings.popupAnimationDurationMs || 320}ms`,
        }}
      >
        {/* Card Content Area */}
        <div className="popup-body">
          {/* Optional Icon */}
          {settings.showPopupIcon && (
            <div className="popup-icon-wrap">{renderPopupIcon(settings.brandLogoType)}</div>
          )}

          {/* Configurable Brand Name */}
          {settings.brandName && (
            <div className="popup-brand-name">{settings.brandName}</div>
          )}

          {/* Heading */}
          <h3 id="alert-heading" className="popup-heading">
            {settings.popupHeading}
          </h3>

          {/* Description */}
          <p id="alert-description" className="popup-text">
            {settings.popupDescription}
          </p>
        </div>

        {/* 50/50 Full Width Action Buttons separated by thin vertical line */}
        <div className="popup-action-row">
          {/* Left Button: Know More */}
          <button
            type="button"
            className="popup-btn popup-btn-left"
            onClick={handleKnowMoreClick}
            aria-label={`${settings.primaryButtonLabel} - View official assistance information`}
          >
            <span>{settings.primaryButtonLabel}</span>
          </button>

          {/* Right Button: Call Now (Opens Phone dialer with tel: link) */}
          <a
            href={`tel:${settings.supportPhoneTel}`}
            className="popup-btn popup-btn-right"
            aria-label={`${settings.secondaryButtonLabel} - Call business phone ${settings.supportPhoneNumber}`}
          >
            <span>{settings.secondaryButtonLabel}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
