import { createContext } from 'react';
import type { SiteSettings } from '../types/config';

export interface ConfigContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetSettings: () => void;

  // Notification State
  isNotificationVisible: boolean;
  showNotification: () => void;
  dismissNotification: () => void;

  // Center Popup State
  isPopupVisible: boolean;
  openPopup: () => void;
  closePopup: () => void;

  // Know More Information Modal State
  isKnowMoreVisible: boolean;
  openKnowMore: () => void;
  closeKnowMore: () => void;

  // Admin Modal State
  isAdminVisible: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;
}

export const ConfigContext = createContext<ConfigContextType | undefined>(undefined);
