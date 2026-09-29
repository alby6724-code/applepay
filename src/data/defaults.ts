import type { SiteSettings } from '../types/config';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  // Brand & Page Configuration
  pageTitle: 'Apple Pay — Official Support & Showcase',
  brandName: 'Apple Pay',
  brandLogoType: 'apple',
  showPopupIcon: true,
  reopenButtonLabel: 'View Alert',

  // Top Notification (clean, trustworthy customer care notification)
  notificationCategory: 'Messages',
  notificationTimestamp: 'now',
  notificationTitle: 'Customer Care & Assistance',
  notificationMessage:
    'Need assistance with your Apple Pay setup, product inquiries, or order support? Call +1 (800) 692-7753',
  notificationDelaySeconds: 1.0,
  notificationDurationSeconds: 10,
  isNotificationEnabled: true,

  // Center Popup (professional customer assistance dialog matching visual layout)
  popupHeading: 'CUSTOMER ASSISTANCE',
  popupDescription:
    'Welcome to Customer Support. Our verified product specialists are available 24/7 to assist you with order status, device setup, warranty information, and Apple Pay assistance. Please choose an option below to connect with our official support team.',
  primaryButtonLabel: 'Know More',
  primaryButtonAction: 'modal',
  primaryButtonUrl: '#know-more',
  secondaryButtonLabel: 'Call Now',
  supportPhoneNumber: '+1 (800) 692-7753',
  supportPhoneTel: '+18006927753',
  isPopupEnabled: true,
  popupDelaySeconds: 1.8,
  popupAnimationDurationMs: 320,

  // Background Website Setup
  backgroundType: 'grid',
  backgroundTheme: 'light',
  backgroundCustomImageUrl: '',
  backgroundOpacity: 1.0,
  backgroundBlur: 0,
};
