import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-background to-secondary-light">
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-10 left-10 w-16 h-16 text-primary/10 animate-float" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg className="absolute top-32 right-20 w-12 h-12 text-accent/15 animate-float" style={{ animationDelay: '1s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <svg className="absolute bottom-20 left-1/4 w-10 h-10 text-secondary/10 animate-float" style={{ animationDelay: '2s' }} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
        <svg className="absolute bottom-32 right-1/3 w-14 h-14 text-primary/8 animate-float" style={{ animationDelay: '0.5s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
      </div>

      <div className="container relative z-10 flex flex-col lg:flex-row items-center min-h-[60vh] lg:min-h-[85vh] py-12 lg:py-0 gap-8">
        {/* Left content */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <span className="inline-block bg-accent/20 text-accent-foreground text-sm font-medium px-4 py-1.5 rounded-full">
            🌟 Mysore's Favourite Baby Store
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
            Everything Your<br />Baby Needs
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
            Premium baby products at wholesale prices
          </p>
          <p className="text-sm text-muted-foreground">
            For ages 0–4 years · Gandhi Square, Mysore
          </p>
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <Button asChild size="lg" className="rounded-xl text-base px-8">
              <Link to="/products">Shop Now →</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl text-base px-8">
              <Link to="/products">Browse Categories</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground pt-2">
            <span>⭐ 4.9 Rating</span>
            <span>🛍️ 200+ Products</span>
            <span>👨‍👩‍👧 1000+ Happy Families</span>
          </div>
        </div>

        {/* Right illustration */}
        <div className="flex-1 flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
            {/* Baby */}
            <circle cx="200" cy="160" r="60" fill="hsl(var(--primary-light))" />
            <circle cx="200" cy="145" r="45" fill="#FDDCB5" />
            <circle cx="185" cy="138" r="5" fill="#2D2D2D" />
            <circle cx="215" cy="138" r="5" fill="#2D2D2D" />
            <path d="M193 152 Q200 160 207 152" stroke="#FF6B8A" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Body */}
            <ellipse cx="200" cy="240" rx="50" ry="60" fill="hsl(var(--secondary-light))" />
            {/* Stars */}
            <text x="80" y="100" fontSize="24" className="animate-float">⭐</text>
            <text x="300" y="80" fontSize="20" className="animate-float" style={{ animationDelay: '1.5s' }}>🍼</text>
            <text x="320" y="200" fontSize="22" className="animate-float" style={{ animationDelay: '0.5s' }}>🧸</text>
            <text x="60" y="250" fontSize="18" className="animate-float" style={{ animationDelay: '2s' }}>🎀</text>
            {/* Toy blocks */}
            <rect x="120" y="300" width="30" height="30" rx="4" fill="hsl(var(--accent))" opacity="0.7" />
            <rect x="250" y="310" width="25" height="25" rx="4" fill="hsl(var(--primary))" opacity="0.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
