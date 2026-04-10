import { WHATSAPP_URL } from './constants';
import type { CartItem } from './types';

export function buildOrderMessage(items: CartItem[], total: number): string {
  const lines = items.map((item, i) =>
    `${i + 1}. ${item.name} × ${item.quantity} — ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
  );

  const msg = `Hello! I'd like to place an order from Select Baby World 🛍️

*My Order:*
${lines.join('\n')}

📦 *Total Items:* ${items.reduce((s, i) => s + i.quantity, 0)}
💰 *Order Total:* ₹${total.toLocaleString('en-IN')}

Please confirm availability and share delivery details. Thank you!`;

  return `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildProductInquiry(name: string, price: number, qty: number): string {
  const msg = `Hi! I'm interested in: ${name} (Qty: ${qty}) - ₹${price.toLocaleString('en-IN')}. Please confirm availability.`;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildContactMessage(name: string, phone: string, message: string): string {
  const msg = `Hi! My name is ${name} (📞 ${phone}). ${message}`;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`;
}
