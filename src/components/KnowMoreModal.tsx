import React from 'react';
import { X, ShieldCheck, Phone, CheckCircle, Clock } from 'lucide-react';
import { useConfig } from '../context/useConfig';

export const KnowMoreModal: React.FC = () => {
  const { isKnowMoreVisible, closeKnowMore, settings } = useConfig();

  if (!isKnowMoreVisible) return null;

  return (
    <div
      className="popup-backdrop-dim dim-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeKnowMore();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="knowmore-heading"
    >
      <div className="know-more-card popup-scale-in">
        <div className="know-more-header">
          <div className="know-more-title-group">
            <ShieldCheck size={22} className="shield-blue" />
            <h3 id="knowmore-heading" className="know-more-title">
              Account Security & Order Verification
            </h3>
          </div>
          <button
            className="know-more-close-btn"
            onClick={closeKnowMore}
            aria-label="Close information dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="know-more-body">
          <div className="info-callout">
            <span className="callout-badge">Support Advisory</span>
            <h4>Official Security Guidelines</h4>
            <p>
              If you received a notification regarding an unfamiliar transaction, our dedicated customer care specialists can assist you with verifying payment authorizations and reviewing security locks.
            </p>
          </div>

          <div className="direct-call-box">
            <div className="direct-call-text">
              <span className="direct-call-label">Official Hotline</span>
              <strong>{settings.supportPhoneNumber}</strong>
              <span className="direct-call-sub">Available 24/7 • Toll-Free Verification</span>
            </div>
            <a
              href={`tel:${settings.supportPhoneTel}`}
              className="direct-call-pill"
              aria-label={`Dial ${settings.supportPhoneNumber}`}
            >
              <Phone size={16} />
              <span>Call Now</span>
            </a>
          </div>

          <div className="guidelines-list">
            <div className="guideline-item">
              <CheckCircle size={16} className="guide-icon" />
              <span>Have your Apple ID or transaction reference ready when calling.</span>
            </div>
            <div className="guideline-item">
              <Clock size={16} className="guide-icon" />
              <span>Pre-authorizations are typically verified or reversed within 1–2 business days.</span>
            </div>
            <div className="guideline-item">
              <CheckCircle size={16} className="guide-icon" />
              <span>Apple representatives will never request your account password or CVV.</span>
            </div>
          </div>
        </div>

        <div className="know-more-footer">
          <button className="know-more-done-btn" onClick={closeKnowMore}>
            Back to Alert
          </button>
        </div>
      </div>
    </div>
  );
};
