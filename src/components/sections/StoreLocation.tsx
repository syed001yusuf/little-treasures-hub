import { Button } from '@/components/ui/button';
import { STORE_ADDRESS, STORE_PHONE, STORE_HOURS, WHATSAPP_URL, DIRECTIONS_URL, MAP_EMBED_URL } from '@/lib/constants';

export function StoreLocation() {
  return (
    <section className="bg-secondary-light py-12">
      <div className="container">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-8">Visit Our Store</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Info */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border space-y-4">
            <div className="space-y-3">
              <p className="flex items-start gap-2"><span>📍</span> <span>{STORE_ADDRESS}</span></p>
              <p className="flex items-start gap-2"><span>📞</span> <span>{STORE_PHONE}</span></p>
              <p className="flex items-start gap-2"><span>🕐</span> <span>{STORE_HOURS}</span></p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="rounded-xl">
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">Get Directions →</a>
              </Button>
              <Button asChild variant="outline" className="rounded-xl border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">💬 Chat on WhatsApp</a>
              </Button>
            </div>
          </div>
          {/* Map */}
          <div className="rounded-2xl overflow-hidden border shadow-sm min-h-[300px]">
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 300 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
