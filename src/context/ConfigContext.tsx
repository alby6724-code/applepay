import React, { useEffect, useState } from 'react';
import { DEFAULT_SITE_SETTINGS } from '../data/defaults';
import type { SiteSettings } from '../types/config';
import { ConfigContext } from './config-context-def';

const STORAGE_KEY = 'applepay_single_page_config_v2';

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_SITE_SETTINGS;
  });

  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isKnowMoreVisible, setIsKnowMoreVisible] = useState(false);
  const [isAdminVisible, setIsAdminVisible] = useState(false);

  // Sync to localStorage
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
      return updated;
    });
  };

  const resetSettings = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setSettings(DEFAULT_SITE_SETTINGS);
  };

  const showNotification = () => setIsNotificationVisible(true);
  const dismissNotification = () => setIsNotificationVisible(false);

  const openPopup = () => setIsPopupVisible(true);
  const closePopup = () => setIsPopupVisible(false);

  const openKnowMore = () => setIsKnowMoreVisible(true);
  const closeKnowMore = () => setIsKnowMoreVisible(false);

  const openAdmin = () => setIsAdminVisible(true);
  const closeAdmin = () => setIsAdminVisible(false);

  // Automatic Timers on Page Load
  useEffect(() => {
    let notifTimer: ReturnType<typeof setTimeout> | undefined;
    let popupTimer: ReturnType<typeof setTimeout> | undefined;

    if (settings.isNotificationEnabled) {
      notifTimer = setTimeout(() => {
        setIsNotificationVisible(true);
      }, Math.max(300, settings.notificationDelaySeconds * 1000));
    }

    if (settings.isPopupEnabled) {
      popupTimer = setTimeout(() => {
        setIsPopupVisible(true);
      }, Math.max(600, settings.popupDelaySeconds * 1000));
    }

    return () => {
      if (notifTimer) clearTimeout(notifTimer);
      if (popupTimer) clearTimeout(popupTimer);
    };
  }, [settings.isNotificationEnabled, settings.notificationDelaySeconds, settings.isPopupEnabled, settings.popupDelaySeconds]);

  // URL Hash & Query Detection for /admin
  useEffect(() => {
    const checkAdminTrigger = () => {
      if (
        window.location.hash === '#admin' ||
        window.location.search.includes('admin=true') ||
        window.location.pathname.endsWith('/admin')
      ) {
        setIsAdminVisible(true);
      }
    };
    checkAdminTrigger();
    window.addEventListener('hashchange', checkAdminTrigger);
    return () => window.removeEventListener('hashchange', checkAdminTrigger);
  }, []);

  // Keyboard shortcut: Escape to close modals, Alt+A or Ctrl+Shift+A to toggle admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isKnowMoreVisible) closeKnowMore();
        else if (isPopupVisible) closePopup();
        else if (isAdminVisible) closeAdmin();
      }

      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAdminVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isKnowMoreVisible, isPopupVisible, isAdminVisible]);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        isNotificationVisible,
        showNotification,
        dismissNotification,
        isPopupVisible,
        openPopup,
        closePopup,
        isKnowMoreVisible,
        openKnowMore,
        closeKnowMore,
        isAdminVisible,
        openAdmin,
        closeAdmin,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

