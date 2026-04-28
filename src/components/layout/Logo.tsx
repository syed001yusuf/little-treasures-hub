import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <circle cx="14" cy="38" r="5" stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" />
        <circle cx="36" cy="38" r="5" stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" />
        <path d="M6 32 L10 12 L38 12 L42 32" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="hsl(var(--primary-light))" />
        <path d="M10 12 Q14 2, 24 4 Q34 6, 38 12" stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <line x1="24" y1="4" x2="24" y2="0" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="0" r="1.5" fill="hsl(var(--primary))" />
        <path d="M6 32 L42 32" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="font-heading text-md font-bold text-primary">SELECT BABY WORLD</span>
        <span className="text-[10px] text-muted-foreground tracking-wide">Gandhi Square, Mysore</span>
      </div>
    </Link>
  );
}
