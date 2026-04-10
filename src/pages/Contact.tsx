import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { buildContactMessage } from '@/lib/whatsapp';
import { STORE_ADDRESS, STORE_PHONE, STORE_HOURS, WHATSAPP_URL, DIRECTIONS_URL, MAP_EMBED_URL } from '@/lib/constants';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildContactMessage(name, phone, message);
    window.open(url, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Contact | Select Baby World Mysore</title>
        <meta name="description" content="Contact Select Baby World at Gandhi Square, Mysore. Call or WhatsApp us!" />
      </Helmet>

      <div className="bg-gradient-to-br from-primary-light to-secondary-light py-16 text-center">
        <div className="container">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground mt-2">We'd love to hear from you!</p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-card rounded-2xl border p-6">
            <h2 className="font-heading text-xl font-bold mb-4">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required className="mt-1 rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" required className="mt-1 rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="How can we help you?" required className="mt-1 rounded-xl" rows={4} />
              </div>
              <Button type="submit" className="w-full rounded-xl" size="lg">Send via WhatsApp 💬</Button>
            </form>
          </div>

          {/* Info + Map */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border p-6 space-y-3">
              <h3 className="font-heading text-lg font-bold">Store Info</h3>
              <p className="flex items-start gap-2 text-sm"><span>📍</span>{STORE_ADDRESS}</p>
              <p className="flex items-start gap-2 text-sm"><span>📞</span>{STORE_PHONE}</p>
              <p className="flex items-start gap-2 text-sm"><span>🕐</span>{STORE_HOURS}</p>
              <div className="flex gap-3 pt-2">
                <Button asChild size="sm" className="rounded-xl">
                  <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">Get Directions</a>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-xl border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border min-h-[300px]">
              <iframe src={MAP_EMBED_URL} width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" title="Store Location" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
