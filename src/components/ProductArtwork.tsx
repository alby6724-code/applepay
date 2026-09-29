import React from 'react';

interface ProductArtworkProps {
  type: 'iphone' | 'mac' | 'ipad' | 'watch' | 'airpods' | 'vision';
  className?: string;
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({ type, className = '' }) => {
  switch (type) {
    case 'iphone':
      return (
        <div className={`product-render-box ${className}`}>
          <svg
            viewBox="0 0 320 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="product-vector-art"
          >
            <defs>
              {/* Titanium Bezel Gradient */}
              <linearGradient id="iphoneBezel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#48443f" />
                <stop offset="50%" stopColor="#2c2a29" />
                <stop offset="100%" stopColor="#554f49" />
              </linearGradient>

              {/* Display Wallpaper Gradient inspired by iPhone 16 Pro Desert Titanium */}
              <linearGradient id="iphoneWallpaper" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a1324" />
                <stop offset="35%" stopColor="#5c382b" />
                <stop offset="65%" stopColor="#9e6d42" />
                <stop offset="100%" stopColor="#1f1b29" />
              </linearGradient>

              <radialGradient id="iphoneGlow" cx="60%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#d89f66" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#7a3e5c" stopOpacity="0.4" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>

              <filter id="shadowIphone" x="-20%" y="-10%" width="140%" height="130%">
                <feDropShadow dx="0" dy="18" stdDeviation="22" floodColor="#000" floodOpacity="0.28" />
              </filter>
            </defs>

            {/* Device Outer Body (Titanium chassis) */}
            <rect
              x="62"
              y="18"
              width="196"
              height="384"
              rx="42"
              fill="url(#iphoneBezel)"
              filter="url(#shadowIphone)"
              stroke="#6b645c"
              strokeWidth="2.5"
            />

            {/* Screen Border / Glass edge */}
            <rect x="67" y="23" width="186" height="374" rx="38" fill="#000000" stroke="#1f1d1c" strokeWidth="2" />

            {/* Screen Area with OLED Display Wallpaper */}
            <rect x="71" y="27" width="178" height="366" rx="34" fill="url(#iphoneWallpaper)" />
            <rect x="71" y="27" width="178" height="366" rx="34" fill="url(#iphoneGlow)" />

            {/* Abstract Wallpaper Fluid Swirls */}
            <path
              d="M71 140C110 80 180 120 200 210C215 280 150 340 120 393H215C235 393 249 377 249 357V80C249 50 220 30 180 30C120 30 90 90 71 140Z"
              fill="#c68b59"
              fillOpacity="0.35"
            />
            <circle cx="160" cy="210" r="68" fill="#e89d67" fillOpacity="0.22" filter="blur(16px)" />

            {/* Dynamic Island */}
            <rect x="122" y="38" width="76" height="20" rx="10" fill="#000000" />
            <circle cx="184" cy="48" r="4.5" fill="#111827" stroke="#1f2937" strokeWidth="0.8" />
            <circle cx="138" cy="48" r="3" fill="#064e3b" opacity="0.6" />

            {/* Home Indicator Bar */}
            <rect x="125" y="380" width="70" height="4" rx="2" fill="#ffffff" fillOpacity="0.6" />

            {/* Side Buttons */}
            <rect x="58" y="90" width="3" height="26" rx="1.5" fill="#5c544d" />
            <rect x="58" y="128" width="3" height="42" rx="1.5" fill="#5c544d" />
            <rect x="58" y="178" width="3" height="42" rx="1.5" fill="#5c544d" />
            <rect x="259" y="134" width="3" height="58" rx="1.5" fill="#5c544d" />
          </svg>
        </div>
      );

    case 'mac':
      return (
        <div className={`product-render-box ${className}`}>
          <svg
            viewBox="0 0 440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="product-vector-art"
          >
            <defs>
              <linearGradient id="macLidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2e2e33" />
                <stop offset="50%" stopColor="#1c1c1f" />
                <stop offset="100%" stopColor="#252528" />
              </linearGradient>

              <linearGradient id="macScreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#080811" />
                <stop offset="50%" stopColor="#1e1838" />
                <stop offset="100%" stopColor="#0c1d2e" />
              </linearGradient>

              <radialGradient id="macScreenLight" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>

              <linearGradient id="macBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3a3a40" />
                <stop offset="40%" stopColor="#232327" />
                <stop offset="100%" stopColor="#151518" />
              </linearGradient>

              <filter id="shadowMac" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="24" stdDeviation="26" floodColor="#000" floodOpacity="0.32" />
              </filter>
            </defs>

            {/* Screen Display Lid */}
            <g filter="url(#shadowMac)">
              <rect x="74" y="24" width="292" height="194" rx="14" fill="url(#macLidGrad)" stroke="#424248" strokeWidth="1.5" />
              <rect x="80" y="30" width="280" height="182" rx="10" fill="#000000" />
              {/* Display Area */}
              <rect x="83" y="33" width="274" height="176" rx="8" fill="url(#macScreenGrad)" />
              <rect x="83" y="33" width="274" height="176" rx="8" fill="url(#macScreenLight)" />

              {/* Liquid Retina Display Graphics / macOS Ventura/Sonoma Wave */}
              <path
                d="M83 140C140 100 190 200 260 150C310 110 330 140 357 160V201C357 205 354 209 350 209H91C86 209 83 205 83 201V140Z"
                fill="#818cf8"
                fillOpacity="0.2"
              />
              <path
                d="M83 170C130 130 200 170 270 120C320 85 340 120 357 140V201C357 205 354 209 350 209H91C86 209 83 205 83 201V170Z"
                fill="#38bdf8"
                fillOpacity="0.18"
              />

              {/* Display Notch */}
              <rect x="204" y="33" width="32" height="9" rx="3" fill="#000000" />
              <circle cx="220" cy="37.5" r="2" fill="#1e293b" />
            </g>

            {/* Keyboard Base / Chassis */}
            <path
              d="M32 218C32 216 34 214 36 214H404C406 214 408 216 408 218L426 244C427 246 426 249 423 249H17C14 249 13 246 14 244L32 218Z"
              fill="url(#macBaseGrad)"
              stroke="#4a4a52"
              strokeWidth="1"
            />
            {/* Notch opener in base */}
            <rect x="185" y="215" width="70" height="5" rx="2.5" fill="#141416" />

            {/* Bottom Lip Reflection */}
            <rect x="16" y="247" width="408" height="4" rx="2" fill="#1b1b1e" />
          </svg>
        </div>
      );

    case 'ipad':
      return (
        <div className={`product-render-box ${className}`}>
          <svg
            viewBox="0 0 360 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="product-vector-art"
          >
            <defs>
              <linearGradient id="ipadBezel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#434346" />
                <stop offset="100%" stopColor="#222225" />
              </linearGradient>

              <linearGradient id="ipadScreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="40%" stopColor="#1e1b4b" />
                <stop offset="80%" stopColor="#311042" />
                <stop offset="100%" stopColor="#090d16" />
              </linearGradient>

              <filter id="shadowIpad" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="20" stdDeviation="24" floodColor="#000" floodOpacity="0.26" />
              </filter>
            </defs>

            {/* Apple Pencil Pro on top edge */}
            <rect x="90" y="16" width="180" height="7" rx="3.5" fill="#e5e5ea" stroke="#d1d1d6" strokeWidth="0.8" />
            <path d="M265 16L275 19.5L265 23V16Z" fill="#d1d1d6" />
            <rect x="96" y="18" width="18" height="3" rx="1.5" fill="#99999f" opacity="0.4" />

            {/* iPad Body */}
            <rect
              x="42"
              y="28"
              width="276"
              height="354"
              rx="28"
              fill="url(#ipadBezel)"
              filter="url(#shadowIpad)"
              stroke="#595960"
              strokeWidth="1.8"
            />

            {/* Screen Glass & Symmetrical Thin Bezel */}
            <rect x="48" y="34" width="264" height="342" rx="22" fill="#000000" stroke="#161618" strokeWidth="1.5" />
            <rect x="54" y="40" width="252" height="330" rx="16" fill="url(#ipadScreen)" />

            {/* iPad Pro Colorful Liquid Swirl Display */}
            <circle cx="180" cy="205" r="95" fill="#ec4899" fillOpacity="0.2" filter="blur(28px)" />
            <circle cx="140" cy="150" r="75" fill="#6366f1" fillOpacity="0.3" filter="blur(20px)" />
            <circle cx="210" cy="240" r="70" fill="#06b6d4" fillOpacity="0.25" filter="blur(22px)" />

            {/* Landscape Camera */}
            <circle cx="180" cy="46" r="2.8" fill="#1e293b" />

            {/* iPad Home Indicator */}
            <rect x="145" y="360" width="70" height="3.5" rx="1.75" fill="#ffffff" fillOpacity="0.55" />
          </svg>
        </div>
      );

    case 'watch':
      return (
        <div className={`product-render-box ${className}`}>
          <svg
            viewBox="0 0 320 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="product-vector-art"
          >
            <defs>
              <linearGradient id="watchStrap" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a1a1c" />
                <stop offset="50%" stopColor="#2c2c30" />
                <stop offset="100%" stopColor="#1a1a1c" />
              </linearGradient>

              <linearGradient id="watchCase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a1a1c" />
                <stop offset="40%" stopColor="#08080a" />
                <stop offset="80%" stopColor="#242428" />
                <stop offset="100%" stopColor="#121214" />
              </linearGradient>

              <filter id="shadowWatch" x="-20%" y="-10%" width="140%" height="130%">
                <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#000" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Upper Strap */}
            <path d="M108 10H212L204 110H116L108 10Z" fill="url(#watchStrap)" />
            {/* Lower Strap */}
            <path d="M116 270H204L212 370H108L116 270Z" fill="url(#watchStrap)" />

            {/* Digital Crown & Side Button */}
            <rect x="238" y="142" width="10" height="36" rx="4" fill="#2d2d32" stroke="#484850" strokeWidth="1" />
            <line x1="239" y1="148" x2="247" y2="148" stroke="#1b1b1e" strokeWidth="1.2" />
            <line x1="239" y1="154" x2="247" y2="154" stroke="#1b1b1e" strokeWidth="1.2" />
            <line x1="239" y1="160" x2="247" y2="160" stroke="#1b1b1e" strokeWidth="1.2" />
            <line x1="239" y1="166" x2="247" y2="166" stroke="#1b1b1e" strokeWidth="1.2" />

            <rect x="238" y="196" width="6" height="38" rx="2.5" fill="#242428" />

            {/* Watch Case (Jet Black polished) */}
            <rect
              x="76"
              y="96"
              width="164"
              height="188"
              rx="44"
              fill="url(#watchCase)"
              filter="url(#shadowWatch)"
              stroke="#43434a"
              strokeWidth="2.5"
            />

            {/* OLED Screen Surface */}
            <rect x="83" y="103" width="150" height="174" rx="38" fill="#000000" />

            {/* Watch Face Design (Activity Rings + Time) */}
            <circle cx="158" cy="190" r="54" stroke="#26262b" strokeWidth="7" fill="none" />
            {/* Move Ring (Red) */}
            <circle
              cx="158"
              cy="190"
              r="54"
              stroke="#fa2d48"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="339"
              strokeDashoffset="80"
              fill="none"
            />
            {/* Exercise Ring (Green) */}
            <circle cx="158" cy="190" r="44" stroke="#26262b" strokeWidth="7" fill="none" />
            <circle
              cx="158"
              cy="190"
              r="44"
              stroke="#a4ff00"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="276"
              strokeDashoffset="70"
              fill="none"
            />
            {/* Stand Ring (Blue) */}
            <circle cx="158" cy="190" r="34" stroke="#26262b" strokeWidth="7" fill="none" />
            <circle
              cx="158"
              cy="190"
              r="34"
              stroke="#00f0ff"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="213"
              strokeDashoffset="45"
              fill="none"
            />

            {/* Time Display */}
            <text x="158" y="142" textAnchor="middle" fill="#ffffff" fontFamily="-apple-system, sans-serif" fontSize="28" fontWeight="600">
              09:41
            </text>
          </svg>
        </div>
      );

    case 'airpods':
      return (
        <div className={`product-render-box ${className}`}>
          <svg
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="product-vector-art"
          >
            <defs>
              <linearGradient id="caseWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#f3f3f6" />
                <stop offset="100%" stopColor="#e5e5ea" />
              </linearGradient>
              <filter id="shadowAirpods" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#000" floodOpacity="0.18" />
              </filter>
            </defs>

            {/* MagSafe Charging Case */}
            <rect
              x="72"
              y="110"
              width="176"
              height="136"
              rx="46"
              fill="url(#caseWhite)"
              filter="url(#shadowAirpods)"
              stroke="#dcdce2"
              strokeWidth="1.5"
            />

            {/* Case Lid Cut Line */}
            <path d="M72 152H248" stroke="#d1d1d6" strokeWidth="1.2" />

            {/* Status LED (Amber/Green charging light) */}
            <circle cx="160" cy="174" r="3" fill="#34c759" />

            {/* Speaker vents on bottom of USB-C case */}
            <circle cx="140" cy="242" r="2" fill="#8e8e93" />
            <circle cx="146" cy="242" r="2" fill="#8e8e93" />
            <rect x="153" y="240" width="14" height="4" rx="2" fill="#8e8e93" />
            <circle cx="174" cy="242" r="2" fill="#8e8e93" />
            <circle cx="180" cy="242" r="2" fill="#8e8e93" />

            {/* Left AirPod Stem & Head */}
            <g transform="translate(68, 30)">
              <rect x="22" y="10" width="34" height="34" rx="17" fill="url(#caseWhite)" stroke="#dcdce2" strokeWidth="1" />
              <rect x="34" y="32" width="10" height="44" rx="5" fill="url(#caseWhite)" stroke="#dcdce2" strokeWidth="1" />
              <ellipse cx="28" cy="24" rx="10" ry="7" fill="#f2f2f7" stroke="#e0e0e6" strokeWidth="1" />
              <rect x="36" y="44" width="6" height="12" rx="3" fill="#d1d1d6" opacity="0.6" />
            </g>

            {/* Right AirPod Stem & Head */}
            <g transform="translate(170, 30)">
              <rect x="22" y="10" width="34" height="34" rx="17" fill="url(#caseWhite)" stroke="#dcdce2" strokeWidth="1" />
              <rect x="34" y="32" width="10" height="44" rx="5" fill="url(#caseWhite)" stroke="#dcdce2" strokeWidth="1" />
              <ellipse cx="50" cy="24" rx="10" ry="7" fill="#f2f2f7" stroke="#e0e0e6" strokeWidth="1" />
              <rect x="36" y="44" width="6" height="12" rx="3" fill="#d1d1d6" opacity="0.6" />
            </g>
          </svg>
        </div>
      );

    case 'vision':
      return (
        <div className={`product-render-box ${className}`}>
          <svg
            viewBox="0 0 380 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="product-vector-art"
          >
            <defs>
              <linearGradient id="glassShield" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#181a20" />
                <stop offset="40%" stopColor="#08090d" />
                <stop offset="80%" stopColor="#222530" />
                <stop offset="100%" stopColor="#101217" />
              </linearGradient>

              <radialGradient id="eyeSightGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>

              <filter id="shadowVision" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="18" stdDeviation="22" floodColor="#000" floodOpacity="0.35" />
              </filter>
            </defs>

            {/* Dual Loop Headband Straps */}
            <path
              d="M40 140C20 120 40 80 80 75L105 88L70 148C55 148 45 145 40 140Z"
              fill="#d1d5db"
              stroke="#9ca3af"
              strokeWidth="1.2"
            />
            <path
              d="M340 140C360 120 340 80 300 75L275 88L310 148C325 148 335 145 340 140Z"
              fill="#d1d5db"
              stroke="#9ca3af"
              strokeWidth="1.2"
            />

            {/* Light Seal Fabric Cushions */}
            <ellipse cx="190" cy="144" rx="146" ry="68" fill="#2d3039" />

            {/* Curved 3D Glass Enclosure with EyeSight Display */}
            <ellipse
              cx="190"
              cy="142"
              rx="138"
              ry="60"
              fill="url(#glassShield)"
              filter="url(#shadowVision)"
              stroke="#6b7280"
              strokeWidth="2.5"
            />
            <ellipse cx="190" cy="142" rx="126" ry="52" fill="url(#eyeSightGlow)" />

            {/* Subtle Lens/Sensor Reflection Highlights */}
            <ellipse cx="145" cy="138" rx="28" ry="24" fill="#3b82f6" fillOpacity="0.25" filter="blur(10px)" />
            <ellipse cx="235" cy="138" rx="28" ry="24" fill="#3b82f6" fillOpacity="0.25" filter="blur(10px)" />

            {/* Top Digital Crown & Capture Button */}
            <rect x="250" y="80" width="22" height="9" rx="3.5" fill="#4b5563" stroke="#9ca3af" strokeWidth="1" />
            <rect x="108" y="80" width="26" height="8" rx="3" fill="#374151" stroke="#6b7280" strokeWidth="1" />

            {/* Aluminum Frame Trim */}
            <path
              d="M74 135C80 95 130 84 190 84C250 84 300 95 306 135"
              stroke="#9ca3af"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );

    default:
      return null;
  }
};
