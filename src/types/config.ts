export type BrandLogoType = 'messages' | 'apple' | 'shield' | 'support';
export type BackgroundType = 'grid' | 'hero' | 'minimal' | 'custom-image';
export type BackgroundTheme = 'light' | 'dark' | 'studio';

export interface SiteSettings {
  // Brand & Page Configuration
  pageTitle: string;
  brandName: string;
  brandLogoType: BrandLogoType;
  showPopupIcon: boolean;
  reopenButtonLabel: string;

  // Top Notification Configuration
  notificationCategory: string;
  notificationTimestamp: string;
  notificationTitle: string;
  notificationMessage: string;
  notificationDelaySeconds: number;
  notificationDurationSeconds: number;
  isNotificationEnabled: boolean;

  // Center Modal Configuration
  popupHeading: string;
  popupDescription: string;
  primaryButtonLabel: string;
  primaryButtonAction: 'modal' | 'url';
  primaryButtonUrl: string;
  secondaryButtonLabel: string;
  supportPhoneNumber: string;
  supportPhoneTel: string;
  isPopupEnabled: boolean;
  popupDelaySeconds: number;
  popupAnimationDurationMs: number;

  // Background Website Setup
  backgroundType: BackgroundType;
  backgroundTheme: BackgroundTheme;
  backgroundCustomImageUrl: string;
  backgroundOpacity: number;
  backgroundBlur: number;
}
