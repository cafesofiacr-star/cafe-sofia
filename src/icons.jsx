export function CupIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 8h14a3 3 0 0 1 0 6h-1" />
      <path d="M3 8v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V8" />
      <path d="M6 8V6a1 1 0 0 1 2 0v2M10 8V6a1 1 0 0 1 2 0v2" />
    </svg>
  );
}

export function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function EmptyCartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" {...props}>
      <circle cx="9" cy="20" r="1.3" />
      <circle cx="18" cy="20" r="1.3" />
      <path d="M2.5 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 7H6" />
    </svg>
  );
}

export function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" {...props}>
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
      <path d="M12 19l-7-7 7-7M5 12h15" />
    </svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChatIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12a8 8 0 1 1-3.6-6.7" />
      <path d="M21 4v5h-5" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function TextModeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function MicIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" {...props}>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
    </svg>
  );
}

export function SendIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" />
    </svg>
  );
}

export function ReorderIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" {...props}>
      <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
      <path d="M16 3v4M8 3v4M3 10h13" />
      <circle cx="18" cy="18" r="3.2" />
      <path d="M18 16.3v1.9l1.3 1" />
    </svg>
  );
}

export function CoffeeBranchMotif({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        <path id="cf-leaf" d="M0 0 C9 -13 27 -13 36 0 C27 13 9 13 0 0 Z" />
      </defs>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M172 14 C150 52 138 94 148 138 C154 164 167 182 186 196" />
        <use href="#cf-leaf" x="118" y="46" transform="rotate(-28 136 46)" />
        <use href="#cf-leaf" x="94" y="88" transform="rotate(-18 112 88)" />
        <use href="#cf-leaf" x="112" y="126" transform="rotate(-34 130 126)" />
        <circle cx="104" cy="70" r="4.5" fill="currentColor" stroke="none" />
        <circle cx="116" cy="80" r="4.5" fill="currentColor" stroke="none" />
        <circle cx="90" cy="150" r="4.5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function SlothMotif({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 46 C58 40 142 40 192 46" />
      <path d="M80 94 C72 76 70 58 78 48" />
      <path d="M120 94 C128 76 130 58 122 48" />
      <ellipse cx="100" cy="118" rx="34" ry="40" />
      <circle cx="100" cy="70" r="21" />
      <circle cx="85" cy="56" r="6.5" />
      <circle cx="115" cy="56" r="6.5" />
      <path d="M90 74 C95 80 105 80 110 74" />
      <circle cx="92" cy="64" r="2" fill="currentColor" stroke="none" />
      <circle cx="108" cy="64" r="2" fill="currentColor" stroke="none" />
      <path d="M84 156 C80 170 84 182 92 188" />
      <path d="M116 156 C120 170 116 182 108 188" />
    </svg>
  );
}

export function MenuBackgroundPattern({ className }) {
  return (
    <svg className={className} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <path id="cf-leaf-sm" d="M0 0 C5 -7 15 -7 20 0 C15 7 5 7 0 0 Z" />
        <pattern id="coffee-pattern" width="90" height="90" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
          <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 82 C14 64 22 50 38 42" />
            <use href="#cf-leaf-sm" x="14" y="58" transform="rotate(-30 24 58)" />
            <use href="#cf-leaf-sm" x="26" y="44" transform="rotate(10 36 44)" />
            <circle cx="34" cy="52" r="2.4" fill="currentColor" stroke="none" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#coffee-pattern)" />
    </svg>
  );
}
