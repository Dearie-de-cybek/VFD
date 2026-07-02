import type { CSSProperties } from "react";

type IconProps = { className?: string; style?: CSSProperties };

/** four-point sparkle — used as a decorative accent/bullet, replaces the ✦ glyph */
export function IconSparkle({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden>
      <path d="M12 2c.6 3.8 2.2 6.2 6 7-3.8.8-5.4 3.2-6 7-.6-3.8-2.2-6.2-6-7 3.8-.8 5.4-3.2 6-7z" />
    </svg>
  );
}

/** replaces the ✓ glyph */
export function IconCheck({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

/** replaces the 🖨 glyph */
export function IconPrint({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2M6 14h12v7H6z" />
    </svg>
  );
}

/** replaces the ✎ glyph */
export function IconPencil({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
    </svg>
  );
}

/** score band 0-30 — replaces 🌱 */
export function IconSeedling({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21V12M12 12C12 8 9 6 5 6c0 4 3 6 7 6zM12 12c0-3.5 2.5-5 6-5 0 3.5-2.5 5-6 5z" />
    </svg>
  );
}

/** score band 40-60 — replaces 🌿 */
export function IconSprout({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21V9M12 9C12 5 9.5 3 6 3c0 4.5 2.5 6.5 6 6.5zM12 9c0-3.5 2-5.5 5.5-5.5 0 4-2 6-5.5 6z" />
    </svg>
  );
}

/** score band 70-100 — replaces 🌳 */
export function IconTree({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21v-6" />
      <path d="M12 15a5 5 0 0 0 5-5 4.5 4.5 0 0 0-2-3.7A4 4 0 0 0 12 3a4 4 0 0 0-3 2.3A4.5 4.5 0 0 0 7 10a5 5 0 0 0 5 5z" />
    </svg>
  );
}

export function IconCalendar({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function IconPin({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  );
}

export function IconMic({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6" />
    </svg>
  );
}

export function IconUsers({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 20c.8-3.4 3.2-5.3 6.2-5.3s5.4 1.9 6.2 5.3M15.5 5.2a3.2 3.2 0 0 1 0 6.2M17.5 14.9c2.4.5 4 2.2 4.7 5.1" />
    </svg>
  );
}
