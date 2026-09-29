import React, { useEffect } from 'react';
import { BackgroundShowcase } from './components/BackgroundShowcase';
import { TopNotification } from './components/TopNotification';
import { CenterPopup } from './components/CenterPopup';
import { KnowMoreModal } from './components/KnowMoreModal';
import { AdminPanel } from './components/AdminPanel';
import { useConfig } from './context/useConfig';

export const App: React.FC = () => {
  const { isPopupVisible, openPopup, openAdmin, settings } = useConfig();

  // Dynamically synchronize browser tab title with configured page title / brand name
  useEffect(() => {
    if (settings.pageTitle) {
      document.title = settings.pageTitle;
    } else if (settings.brandName) {
      document.title = `${settings.brandName} — Official Support & Showcase`;
    }
  }, [settings.pageTitle, settings.brandName]);

  return (
    <main className="single-page-root" role="main">
      {/* 1. Clean, Full-Screen Background with Subtle Product Showcase */}
      <BackgroundShowcase />

      {/* 2. Top Animated Notification Card (Slide Down, Scale In, Fade In) */}
      <TopNotification />

      {/* 3. Centered Alert Popup with Dimmed Overlay and 50/50 Split Buttons */}
      <CenterPopup />

      {/* 4. Support & Guidance Modal (triggered by Know More) */}
      <KnowMoreModal />

      {/* 5. Admin Panel (accessible via #admin, ?admin=true, or Ctrl+Shift+A) */}
      <AdminPanel />

      {/* Subtle discrete trigger to reopen popup if dismissed by user */}
      {!isPopupVisible && (
        <button
          type="button"
          className="reopen-alert-pill"
          onClick={openPopup}
          aria-label={settings.reopenButtonLabel || 'View Alert'}
          title={settings.reopenButtonLabel || 'View Alert'}
        >
          <span>{settings.reopenButtonLabel || 'View Alert'}</span>
        </button>
      )}

      {/* Hidden discrete admin trigger link in bottom corner (accessible for admins) */}
      <button
        type="button"
        className="discrete-admin-trigger"
        onClick={openAdmin}
        aria-label="Admin Settings"
        title="Admin Settings (Ctrl+Shift+A or #admin)"
      />
    </main>
  );
};

export default App;
