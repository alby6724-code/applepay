import React, { useEffect, useState, useCallback } from 'react';
import { X, ShieldCheck, Headphones } from 'lucide-react';
import { useConfig } from '../context/useConfig';

export const TopNotification: React.FC = () => {
  const { settings, isNotificationVisible, dismissNotification, openPopup } = useConfig();
  const [isClosing, setIsClosing] = useState(false);

  const handleManualClose = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setIsClosing(true);
      setTimeout(() => {
        dismissNotification();
        setIsClosing(false);
      }, 350);
    },
    [dismissNotification]
  );

  useEffect(() => {
    if (!isNotificationVisible) {
      return;
    }

    const duration = Math.max(2500, settings.notificationDurationSeconds * 1000);
    const dismissTimer = setTimeout(() => {
      handleManualClose();
    }, duration);

    return () => clearTimeout(dismissTimer);
  }, [isNotificationVisible, settings.notificationDurationSeconds, handleManualClose]);

  if (!isNotificationVisible && !isClosing) return null;

  const renderIcon = () => {
    switch (settings.brandLogoType) {
      case 'apple':
        return (
          <div className="notif-ios-icon-box apple">
            <svg viewBox="0 0 170 170" width="20" height="20" fill="currentColor">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.77-7.97-12.24-14.67-6.05-9.11-10.82-19.74-14.32-31.9-3.5-12.16-5.25-23.77-5.25-34.84 0-14.15 3.75-26.06 11.26-35.73 7.51-9.67 16.92-14.62 28.23-14.86 4.8 0 10.05 1.25 15.75 3.76 5.7 2.5 9.77 3.82 12.2 3.94 2.04 0 6.2-1.32 12.49-3.94 6.29-2.63 11.51-3.82 15.67-3.59 12.37.74 22.39 5.37 30.06 13.9-10.99 6.64-16.37 15.76-16.14 27.34.23 9.4 3.79 17.27 10.68 23.6 6.89 6.33 15.22 10.07 25 11.22-2.18 6.53-4.8 12.87-7.86 19.03zM119.22 33.64c0-7.38 2.66-14.17 7.98-20.37 5.32-6.2 11.83-10.28 19.53-12.27.32 1.3.48 2.66.48 4.08 0 7.37-2.73 14.31-8.19 20.82-5.46 6.51-12.06 10.36-19.8 11.55l0-3.81z" />
            </svg>
          </div>
        );
      case 'shield':
        return (
          <div className="notif-ios-icon-box shield">
            <ShieldCheck size={22} />
          </div>
        );
      case 'support':
        return (
          <div className="notif-ios-icon-box support">
            <Headphones size={22} />
          </div>
        );
      case 'messages':
      default:
        return (
          <div className="notif-ios-icon-box">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="7.5" fill="#34c759" />
              <path
                d="M16 6.5C10.48 6.5 6 10.4 6 15.2C6 17.9 7.4 20.3 9.65 21.8C9.5 22.7 9.15 23.85 8.18 25C8.04 25.18 8.08 25.44 8.27 25.56C8.38 25.63 8.51 25.65 8.64 25.62C10.74 25.1 12.56 24.1 13.68 23.3C14.43 23.55 15.2 23.7 16 23.7C21.52 23.7 26 19.8 26 15C26 10.3 21.52 6.5 16 6.5Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <aside
      className={`top-notification-container ${isClosing ? 'slide-out' : 'slide-in'}`}
      role="alert"
      aria-live="polite"
      aria-label="Notification alert"
    >
      <div
        className="top-notification-card"
        onClick={() => openPopup()}
        title="Click to view alert details"
      >
        {/* Icon on Left */}
        <div className="notif-icon-wrap">{renderIcon()}</div>

        {/* Text details */}
        <div className="notif-content-wrap">
          <div className="notif-meta-line">
            <span className="notif-source-name">{settings.notificationCategory}</span>
            <span className="notif-time-badge">{settings.notificationTimestamp}</span>
          </div>
          <h4 className="notif-headline">{settings.notificationTitle}</h4>
          <p className="notif-message-text">{settings.notificationMessage}</p>
        </div>

        {/* Dismiss X button */}
        <button
          type="button"
          className="notif-dismiss-btn"
          onClick={handleManualClose}
          aria-label="Dismiss notification"
          title="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </aside>
  );
};
