import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Bell,
  MessageSquare,
  Check,
  Lock,
  KeyRound,
  Image as ImageIcon,
  Phone,
  Sparkles,
  Sliders,
  LayoutGrid,
  Smartphone,
  Eye,
  ShieldCheck,
  Headphones,
  Zap,
} from 'lucide-react';
import { useConfig } from '../context/useConfig';
import { DEFAULT_SITE_SETTINGS } from '../data/defaults';
import { MESSAGE_PRESETS, BACKGROUND_PRESETS } from '../data/presets';
import type { SiteSettings, BrandLogoType } from '../types/config';

const ADMIN_PIN = '1234';

type AdminTab = 'message' | 'background' | 'notification' | 'buttons' | 'timing';

export const AdminPanel: React.FC = () => {
  const {
    isAdminVisible,
    closeAdmin,
    settings,
    updateSettings,
    resetSettings,
    showNotification,
    openPopup,
  } = useConfig();

  const [formState, setFormState] = useState<SiteSettings>(settings);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('message');

  if (!isAdminVisible) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      setPinError(null);
      setPinInput('');
    } else {
      setPinError('Incorrect Passkey PIN. Please enter the authorized admin PIN.');
    }
  };

  const handleChange = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  // 1-Click Fast Action: Change name to Apple Pay and set all UI messages to Apple Pay
  const handleApplyApplePayAll = () => {
    setFormState((prev) => ({
      ...prev,
      brandName: 'Apple Pay',
      brandLogoType: 'apple',
      showPopupIcon: true,
      pageTitle: 'Apple Pay — Official Support & Showcase',
      reopenButtonLabel: 'Apple Pay Alert',
      popupHeading: 'APPLE PAY VERIFICATION',
      popupDescription:
        'An authorization request was recorded for your Apple Pay card. If you need assistance with card setup, transaction verification, or account protection, connect with our support desk below.',
      notificationCategory: 'Wallet & Apple Pay',
      notificationTitle: 'Apple Pay Notification',
      notificationMessage:
        'Apple Pay authorization alert. For official customer assistance, call +1 (800) 692-7753.',
    }));
    setToastMessage('Switched name to Apple Pay and updated all UI messages!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleApplyMessagePreset = (presetId: string) => {
    const preset = MESSAGE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setFormState((prev) => ({
      ...prev,
      popupHeading: preset.popupHeading,
      popupDescription: preset.popupDescription,
      brandName: preset.brandName,
      brandLogoType: preset.icon,
      showPopupIcon: true,
      notificationTitle: preset.notificationTitle,
      notificationMessage: preset.notificationMessage,
      notificationCategory: preset.notificationCategory,
    }));
    setToastMessage(`Applied "${preset.name}" message preset!`);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleApplyBackgroundPreset = (presetId: string) => {
    const preset = BACKGROUND_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setFormState((prev) => ({
      ...prev,
      backgroundType: preset.type,
      backgroundTheme: preset.theme,
    }));
    setToastMessage(`Applied "${preset.name}" background setup!`);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formState);
    setToastMessage('All settings successfully saved to live website!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all values to the default configuration?')) {
      resetSettings();
      setFormState(DEFAULT_SITE_SETTINGS);
      setToastMessage('Configuration restored to defaults.');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  // If not authenticated, render secure PIN lock modal
  if (!isAuthenticated) {
    return (
      <div
        className="popup-backdrop-dim dim-fade-in"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeAdmin();
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-auth-title"
      >
        <div className="admin-dialog-card popup-scale-in admin-auth-card">
          <div className="admin-header">
            <div className="auth-header-title">
              <div className="lock-icon-box">
                <Lock size={20} />
              </div>
              <div>
                <h3 id="admin-auth-title" className="admin-title">
                  Secure Admin Access
                </h3>
                <p className="admin-desc">Enter your administrator passkey to edit site configuration.</p>
              </div>
            </div>
            <button className="admin-close-btn" onClick={closeAdmin} aria-label="Close Admin Login">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handlePinSubmit} className="admin-auth-form">
            <div className="form-field">
              <label htmlFor="admin-pin-field">Admin PIN / Passkey</label>
              <div className="pin-input-wrap">
                <KeyRound size={18} className="pin-icon" />
                <input
                  id="admin-pin-field"
                  type="password"
                  autoFocus
                  placeholder="Enter PIN (Default: 1234)"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError(null);
                  }}
                  required
                />
              </div>
              <span className="field-hint">Default authorized PIN: 1234</span>
              {pinError && <p className="auth-error-msg">{pinError}</p>}
            </div>

            <div className="admin-actions auth-actions">
              <button type="button" className="btn-cancel" onClick={closeAdmin}>
                Cancel
              </button>
              <button type="submit" className="btn-save">
                <span>Unlock Admin Panel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const renderIconPreview = (type: BrandLogoType) => {
    switch (type) {
      case 'apple':
        return (
          <svg viewBox="0 0 170 170" width="22" height="22" fill="currentColor">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.77-7.97-12.24-14.67-6.05-9.11-10.82-19.74-14.32-31.9-3.5-12.16-5.25-23.77-5.25-34.84 0-14.15 3.75-26.06 11.26-35.73 7.51-9.67 16.92-14.62 28.23-14.86 4.8 0 10.05 1.25 15.75 3.76 5.7 2.5 9.77 3.82 12.2 3.94 2.04 0 6.2-1.32 12.49-3.94 6.29-2.63 11.51-3.82 15.67-3.59 12.37.74 22.39 5.37 30.06 13.9-10.99 6.64-16.37 15.76-16.14 27.34.23 9.4 3.79 17.27 10.68 23.6 6.89 6.33 15.22 10.07 25 11.22-2.18 6.53-4.8 12.87-7.86 19.03zM119.22 33.64c0-7.38 2.66-14.17 7.98-20.37 5.32-6.2 11.83-10.28 19.53-12.27.32 1.3.48 2.66.48 4.08 0 7.37-2.73 14.31-8.19 20.82-5.46 6.51-12.06 10.36-19.8 11.55l0-3.81z" />
          </svg>
        );
      case 'shield':
        return <ShieldCheck size={22} className="shield-blue" />;
      case 'support':
        return <Headphones size={22} color="#ff9500" />;
      case 'messages':
      default:
        return (
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
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
      className="popup-backdrop-dim dim-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAdmin();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-title"
    >
      <div className="admin-dialog-card popup-scale-in admin-large-card">
        {/* Header */}
        <div className="admin-header">
          <div>
            <div className="admin-title-row">
              <span className="admin-badge">Admin Suite</span>
              <span className="admin-status-dot">Live Editor</span>
            </div>
            <h2 id="admin-title" className="admin-title">
              Website & Popup Configuration
            </h2>
            <p className="admin-desc">
              Change name to Apple Pay, customize all UI messages, setup website background, and edit support hotlines.
            </p>
          </div>
          <button className="admin-close-btn" onClick={closeAdmin} aria-label="Close Admin Panel">
            <X size={18} />
          </button>
        </div>

        {/* Status Toast */}
        {toastMessage && (
          <div className="admin-toast-bar">
            <Check size={16} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Feature Navigation Tabs */}
        <div className="admin-tab-bar">
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'message' ? 'active' : ''}`}
            onClick={() => setActiveTab('message')}
          >
            <MessageSquare size={16} />
            <span>Popup & UI Messages</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'background' ? 'active' : ''}`}
            onClick={() => setActiveTab('background')}
          >
            <ImageIcon size={16} />
            <span>Website Background</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'notification' ? 'active' : ''}`}
            onClick={() => setActiveTab('notification')}
          >
            <Bell size={16} />
            <span>Top Notification</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'buttons' ? 'active' : ''}`}
            onClick={() => setActiveTab('buttons')}
          >
            <Phone size={16} />
            <span>Buttons & Call</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'timing' ? 'active' : ''}`}
            onClick={() => setActiveTab('timing')}
          >
            <Sliders size={16} />
            <span>Timings & Delays</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="admin-form">
          {/* TAB 1: POPUP & UI MESSAGES (Change Name to Apple Pay, Edit All UI Messages) */}
          {activeTab === 'message' && (
            <div className="admin-tab-content">
              {/* Dedicated Apple Pay Quick Switch Banner */}
              <div className="applepay-quick-bar">
                <div className="applepay-quick-text">
                  <div className="applepay-pill">
                    <Zap size={13} />
                    <span>Quick Action</span>
                  </div>
                  <strong>Change Name & UI Messages to "Apple Pay"</strong>
                  <p>
                    Instantly sets brand name to <strong>Apple Pay</strong>, updates browser tab title, reopen button, and all alert messages.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-apply-applepay"
                  onClick={handleApplyApplePayAll}
                >
                  Set to Apple Pay
                </button>
              </div>

              {/* Quick Presets Bar */}
              <div className="admin-group preset-group">
                <div className="preset-header">
                  <div className="preset-title">
                    <Sparkles size={16} className="sparkle-gold" />
                    <h4>1-Click Message Presets</h4>
                  </div>
                  <span className="preset-tag">Instant Autofill</span>
                </div>
                <p className="field-hint">Choose a pre-made message template or easily customize the text below.</p>

                <div className="preset-grid">
                  {MESSAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      className="preset-card"
                      onClick={() => handleApplyMessagePreset(preset.id)}
                    >
                      <div className="preset-card-top">
                        <span className="preset-card-badge">{preset.badge}</span>
                      </div>
                      <strong>{preset.name}</strong>
                      <span className="preset-preview-line">{preset.popupHeading}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Two Column Layout: Editor Form on Left + Live Visual Mini Card on Right */}
              <div className="editor-preview-split">
                <div className="admin-group editor-left-col">
                  <h4>Edit Brand Name & All UI Messages</h4>

                  <div className="form-toggle-line">
                    <label htmlFor="isPopupEnabled">
                      <strong>Enable Center Popup</strong>
                      <span>Show alert popup on page load</span>
                    </label>
                    <input
                      id="isPopupEnabled"
                      type="checkbox"
                      checked={formState.isPopupEnabled}
                      onChange={(e) => handleChange('isPopupEnabled', e.target.checked)}
                    />
                  </div>

                  <div className="form-toggle-line">
                    <label htmlFor="showPopupIcon">
                      <strong>Show Brand Icon</strong>
                      <span>Display brand symbol at the top of the card</span>
                    </label>
                    <input
                      id="showPopupIcon"
                      type="checkbox"
                      checked={formState.showPopupIcon}
                      onChange={(e) => handleChange('showPopupIcon', e.target.checked)}
                    />
                  </div>

                  {/* Brand Name Input with quick Apple Pay button */}
                  <div className="form-grid-2">
                    <div className="form-field">
                      <div className="field-label-row">
                        <label>Brand Name / Subtitle</label>
                        <button
                          type="button"
                          className="quick-chip-btn"
                          onClick={() => handleChange('brandName', 'Apple Pay')}
                          title='Set brand name to "Apple Pay"'
                        >
                          Use "Apple Pay"
                        </button>
                      </div>
                      <input
                        type="text"
                        value={formState.brandName}
                        onChange={(e) => handleChange('brandName', e.target.value)}
                        placeholder="Apple Pay"
                      />
                    </div>

                    <div className="form-field">
                      <label>Icon Style</label>
                      <select
                        value={formState.brandLogoType}
                        onChange={(e) => handleChange('brandLogoType', e.target.value as BrandLogoType)}
                      >
                        <option value="apple">Apple Icon</option>
                        <option value="messages">Messages Green</option>
                        <option value="shield">Security Shield Blue</option>
                        <option value="support">Customer Support Agent</option>
                      </select>
                    </div>
                  </div>

                  {/* UI Titles: Browser Tab Title & Reopen Button Text */}
                  <div className="form-grid-2">
                    <div className="form-field">
                      <div className="field-label-row">
                        <label>Browser Page Title</label>
                        <button
                          type="button"
                          className="quick-chip-btn"
                          onClick={() => handleChange('pageTitle', 'Apple Pay — Official Support & Showcase')}
                        >
                          Apple Pay Tab
                        </button>
                      </div>
                      <input
                        type="text"
                        value={formState.pageTitle || ''}
                        onChange={(e) => handleChange('pageTitle', e.target.value)}
                        placeholder="Apple Pay — Official Support & Showcase"
                      />
                    </div>

                    <div className="form-field">
                      <div className="field-label-row">
                        <label>Reopen Pill Button Label</label>
                        <button
                          type="button"
                          className="quick-chip-btn"
                          onClick={() => handleChange('reopenButtonLabel', 'Apple Pay Alert')}
                        >
                          "Apple Pay Alert"
                        </button>
                      </div>
                      <input
                        type="text"
                        value={formState.reopenButtonLabel || ''}
                        onChange={(e) => handleChange('reopenButtonLabel', e.target.value)}
                        placeholder="View Alert"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Popup Main Heading</label>
                    <input
                      type="text"
                      value={formState.popupHeading}
                      onChange={(e) => handleChange('popupHeading', e.target.value)}
                      placeholder="APPLE PAY VERIFICATION"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Popup Message Description</label>
                    <textarea
                      rows={4}
                      value={formState.popupDescription}
                      onChange={(e) => handleChange('popupDescription', e.target.value)}
                      placeholder="Type the popup message here..."
                      required
                    />
                  </div>
                </div>

                {/* Live Visual Card Preview */}
                <div className="live-preview-box">
                  <div className="preview-label">
                    <Eye size={14} />
                    <span>Real-Time Popup Preview</span>
                  </div>
                  <div className="mini-popup-preview">
                    {formState.showPopupIcon && (
                      <div className="mini-icon-row">{renderIconPreview(formState.brandLogoType)}</div>
                    )}
                    {formState.brandName && <div className="mini-brand-tag">{formState.brandName}</div>}
                    <h5 className="mini-heading">{formState.popupHeading || 'POPUP HEADING'}</h5>
                    <p className="mini-text">
                      {formState.popupDescription || 'Popup description text will appear here.'}
                    </p>
                    <div className="mini-btn-row">
                      <div className="mini-btn left">{formState.primaryButtonLabel || 'Know More'}</div>
                      <div className="mini-btn right">{formState.secondaryButtonLabel || 'Call Now'}</div>
                    </div>
                  </div>

                  {/* Mini Preview of Reopen Button */}
                  <div className="mini-reopen-preview">
                    <span className="mini-sublabel">Reopen Button Preview:</span>
                    <div className="reopen-alert-pill static-preview">
                      <span>{formState.reopenButtonLabel || 'View Alert'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WEBSITE BACKGROUND (Change Background Website Setup) */}
          {activeTab === 'background' && (
            <div className="admin-tab-content">
              {/* Background Presets */}
              <div className="admin-group preset-group">
                <div className="preset-header">
                  <div className="preset-title">
                    <LayoutGrid size={16} className="sparkle-gold" />
                    <h4>Website Background Setup Presets</h4>
                  </div>
                  <span className="preset-tag">Instant Style</span>
                </div>
                <p className="field-hint">Select a background architecture for the single full-screen page.</p>

                <div className="preset-grid">
                  {BACKGROUND_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      className={`preset-card ${
                        formState.backgroundType === preset.type && formState.backgroundTheme === preset.theme
                          ? 'selected'
                          : ''
                      }`}
                      onClick={() => handleApplyBackgroundPreset(preset.id)}
                    >
                      <div className="preset-card-top">
                        <span className="preset-card-badge">{preset.badge}</span>
                      </div>
                      <strong>{preset.name}</strong>
                      <span className="preset-preview-line">{preset.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Layout Setup Options */}
              <div className="admin-group">
                <h4>Custom Background Setup</h4>

                <div className="bg-type-selector">
                  <label className="field-title">Display Layout Mode</label>
                  <div className="bg-choice-grid">
                    <button
                      type="button"
                      className={`bg-choice-card ${formState.backgroundType === 'grid' ? 'active' : ''}`}
                      onClick={() => handleChange('backgroundType', 'grid')}
                    >
                      <LayoutGrid size={22} />
                      <strong>4-Device Grid</strong>
                      <span>2×2 iPhone, Mac, iPad, Watch</span>
                    </button>

                    <button
                      type="button"
                      className={`bg-choice-card ${formState.backgroundType === 'hero' ? 'active' : ''}`}
                      onClick={() => handleChange('backgroundType', 'hero')}
                    >
                      <Smartphone size={22} />
                      <strong>Centered Hero</strong>
                      <span>Single showcase device</span>
                    </button>

                    <button
                      type="button"
                      className={`bg-choice-card ${formState.backgroundType === 'minimal' ? 'active' : ''}`}
                      onClick={() => handleChange('backgroundType', 'minimal')}
                    >
                      <Eye size={22} />
                      <strong>Minimal Studio</strong>
                      <span>Clean Apple studio watermark</span>
                    </button>

                    <button
                      type="button"
                      className={`bg-choice-card ${formState.backgroundType === 'custom-image' ? 'active' : ''}`}
                      onClick={() => handleChange('backgroundType', 'custom-image')}
                    >
                      <ImageIcon size={22} />
                      <strong>Custom Wallpaper</strong>
                      <span>Image URL backdrop</span>
                    </button>
                  </div>
                </div>

                {/* Theme Mode */}
                <div className="form-field">
                  <label>Background Atmosphere Theme</label>
                  <div className="theme-toggle-row">
                    <button
                      type="button"
                      className={`theme-pill ${formState.backgroundTheme === 'light' ? 'active' : ''}`}
                      onClick={() => handleChange('backgroundTheme', 'light')}
                    >
                      Light Gray (#f5f5f7)
                    </button>
                    <button
                      type="button"
                      className={`theme-pill ${formState.backgroundTheme === 'studio' ? 'active' : ''}`}
                      onClick={() => handleChange('backgroundTheme', 'studio')}
                    >
                      Studio Silver (#e8e8ed)
                    </button>
                    <button
                      type="button"
                      className={`theme-pill ${formState.backgroundTheme === 'dark' ? 'active' : ''}`}
                      onClick={() => handleChange('backgroundTheme', 'dark')}
                    >
                      Dark Titanium (#0d0d0f)
                    </button>
                  </div>
                </div>

                {/* Custom Wallpaper URL */}
                {formState.backgroundType === 'custom-image' && (
                  <div className="form-field">
                    <label>Custom Background Image Web URL</label>
                    <input
                      type="url"
                      value={formState.backgroundCustomImageUrl}
                      onChange={(e) => handleChange('backgroundCustomImageUrl', e.target.value)}
                      placeholder="https://example.com/wallpaper.jpg"
                    />
                    <span className="field-hint">Paste any HTTPS image URL to use as the full-screen backdrop.</span>
                  </div>
                )}

                {/* Visual Sliders: Opacity & Blur */}
                <div className="form-grid-2">
                  <div className="form-field">
                    <label>
                      Background Visibility Opacity: {Math.round((formState.backgroundOpacity ?? 1) * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={formState.backgroundOpacity ?? 1.0}
                      onChange={(e) => handleChange('backgroundOpacity', parseFloat(e.target.value))}
                    />
                    <span className="field-hint">Lower opacity makes the alert popup stand out more.</span>
                  </div>

                  <div className="form-field">
                    <label>Background Blur Level: {formState.backgroundBlur ?? 0}px</label>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      step="1"
                      value={formState.backgroundBlur ?? 0}
                      onChange={(e) => handleChange('backgroundBlur', parseInt(e.target.value) || 0)}
                    />
                    <span className="field-hint">Adds soft focus blur to the showcase background.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TOP NOTIFICATION */}
          {activeTab === 'notification' && (
            <div className="admin-tab-content">
              <div className="admin-group">
                <h4>Top Notification Configuration</h4>

                <div className="form-toggle-line">
                  <label htmlFor="isNotificationEnabled">
                    <strong>Enable Top Notification</strong>
                    <span>Slide down card from top center on page load</span>
                  </label>
                  <input
                    id="isNotificationEnabled"
                    type="checkbox"
                    checked={formState.isNotificationEnabled}
                    onChange={(e) => handleChange('isNotificationEnabled', e.target.checked)}
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Source / App Name</label>
                    <input
                      type="text"
                      value={formState.notificationCategory}
                      onChange={(e) => handleChange('notificationCategory', e.target.value)}
                      placeholder="Messages"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Timestamp Badge</label>
                    <input
                      type="text"
                      value={formState.notificationTimestamp}
                      onChange={(e) => handleChange('notificationTimestamp', e.target.value)}
                      placeholder="now"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Notification Headline</label>
                  <input
                    type="text"
                    value={formState.notificationTitle}
                    onChange={(e) => handleChange('notificationTitle', e.target.value)}
                    placeholder="Customer Care & Assistance"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Notification Body Message</label>
                  <textarea
                    rows={3}
                    value={formState.notificationMessage}
                    onChange={(e) => handleChange('notificationMessage', e.target.value)}
                    placeholder="Type notification text..."
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BUTTONS & HOTLINE */}
          {activeTab === 'buttons' && (
            <div className="admin-tab-content">
              <div className="admin-group">
                <h4>Bottom 50/50 Buttons & Phone Hotline</h4>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Left Button Label</label>
                    <input
                      type="text"
                      value={formState.primaryButtonLabel}
                      onChange={(e) => handleChange('primaryButtonLabel', e.target.value)}
                      placeholder="Know More"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Left Button Action</label>
                    <select
                      value={formState.primaryButtonAction}
                      onChange={(e) => handleChange('primaryButtonAction', e.target.value as any)}
                    >
                      <option value="modal">Open Support Verification Modal</option>
                      <option value="url">External / Custom URL</option>
                    </select>
                  </div>
                </div>

                {formState.primaryButtonAction === 'url' && (
                  <div className="form-field">
                    <label>Destination Support URL</label>
                    <input
                      type="text"
                      value={formState.primaryButtonUrl}
                      onChange={(e) => handleChange('primaryButtonUrl', e.target.value)}
                      placeholder="https://support.apple.com"
                    />
                  </div>
                )}

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Right Button Label</label>
                    <input
                      type="text"
                      value={formState.secondaryButtonLabel}
                      onChange={(e) => handleChange('secondaryButtonLabel', e.target.value)}
                      placeholder="Call Now"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Display Phone Number</label>
                    <input
                      type="text"
                      value={formState.supportPhoneNumber}
                      onChange={(e) => handleChange('supportPhoneNumber', e.target.value)}
                      placeholder="+1 (800) 692-7753"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Dialer tel: URI</label>
                  <input
                    type="text"
                    value={formState.supportPhoneTel}
                    onChange={(e) => handleChange('supportPhoneTel', e.target.value.replace(/[^0-9+]/g, ''))}
                    placeholder="+18006927753"
                    required
                  />
                  <span className="field-hint">Triggers the device native phone dialer when tapped</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TIMINGS & DELAYS */}
          {activeTab === 'timing' && (
            <div className="admin-tab-content">
              <div className="admin-group">
                <h4>Popup & Notification Timing</h4>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Popup Appearance Delay (Seconds)</label>
                    <input
                      type="number"
                      min="0.1"
                      max="30"
                      step="0.1"
                      value={formState.popupDelaySeconds}
                      onChange={(e) => handleChange('popupDelaySeconds', parseFloat(e.target.value) || 1)}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Popup Scale Animation Duration (ms)</label>
                    <input
                      type="number"
                      min="100"
                      max="2000"
                      step="50"
                      value={formState.popupAnimationDurationMs}
                      onChange={(e) => handleChange('popupAnimationDurationMs', parseInt(e.target.value) || 300)}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Notification Slide Delay (Seconds)</label>
                    <input
                      type="number"
                      min="0.1"
                      max="30"
                      step="0.1"
                      value={formState.notificationDelaySeconds}
                      onChange={(e) => handleChange('notificationDelaySeconds', parseFloat(e.target.value) || 1)}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Notification Display Duration (Seconds)</label>
                    <input
                      type="number"
                      min="2"
                      max="60"
                      step="1"
                      value={formState.notificationDurationSeconds}
                      onChange={(e) => handleChange('notificationDurationSeconds', parseInt(e.target.value) || 8)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Live Preview Triggers Bar */}
          <div className="admin-group test-triggers">
            <h4>Live Preview Triggers</h4>
            <div className="test-btn-row">
              <button
                type="button"
                className="admin-test-pill"
                onClick={() => {
                  showNotification();
                }}
              >
                <Bell size={14} />
                <span>Test Notification</span>
              </button>
              <button
                type="button"
                className="admin-test-pill primary"
                onClick={() => {
                  openPopup();
                }}
              >
                <MessageSquare size={14} />
                <span>Test Center Popup</span>
              </button>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="admin-actions">
            <button type="button" className="btn-secondary" onClick={handleReset}>
              <RotateCcw size={15} />
              <span>Reset Defaults</span>
            </button>
            <div className="btn-right-group">
              <button type="button" className="btn-cancel" onClick={closeAdmin}>
                Close
              </button>
              <button type="submit" className="btn-save">
                <Save size={16} />
                <span>Save Configuration</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
