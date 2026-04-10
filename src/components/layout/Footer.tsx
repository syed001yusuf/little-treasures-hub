import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { DEFAULT_CATEGORIES } from '@/lib/constants';
import { STORE_ADDRESS, STORE_PHONE, STORE_HOURS, WHATSAPP_URL } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold text-primary">SELECT BABY WORLD</span>
            </div>
            <p className="text-sm text-background/70">
              Mysore's most trusted baby products store. Premium quality at wholesale prices for ages 0–4 years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {[
                { label: 'Home', to: '/' },
                { label: 'Products', to: '/products' },
                { label: 'About', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="hover:text-primary transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-bold mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {DEFAULT_CATEGORIES.map(c => (
                <li key={c.slug}>
                  <Link to={`/category/${c.slug}`} className="hover:text-primary transition-colors">
                    {c.emoji} {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>📍 {STORE_ADDRESS}</li>
              <li>📞 {STORE_PHONE}</li>
              <li>🕐 {STORE_HOURS}</li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  💬 Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container py-4 text-center text-sm text-background/50">
          © {new Date().getFullYear()} Select Baby World. All rights reserved. Made with ❤️ for Mysore's little ones.
        </div>
      </div>
    </footer>
  );
}
