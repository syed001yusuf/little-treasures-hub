const items = [
  { emoji: '🛡️', title: 'Safe & Certified', desc: 'All products meet safety standards' },
  { emoji: '💯', title: 'Genuine Brands', desc: '100% authentic, no counterfeits' },
  { emoji: '🤝', title: 'Wholesale Pricing', desc: 'Retail customers get wholesale prices' },
  { emoji: '❤️', title: 'Trusted by Families', desc: '1000+ Mysore families shop with us' },
];

export function WhyChooseUs() {
  return (
    <section className="py-12 bg-primary-light">
      <div className="container">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(i => (
            <div key={i.title} className="bg-card rounded-2xl p-6 text-center shadow-sm">
              <span className="text-4xl">{i.emoji}</span>
              <h3 className="font-heading font-bold mt-3">{i.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
