const usps = [
  { emoji: '🏪', title: 'Trusted Store', desc: 'Gandhi Square, Mysore since years' },
  { emoji: '💰', title: 'Wholesale Prices', desc: 'Best prices for retail buyers' },
  { emoji: '✅', title: 'Genuine Products', desc: '100% authentic branded items' },
  { emoji: '📦', title: 'Wide Variety', desc: '200+ products across 9 categories' },
];

export function USPStrip() {
  return (
    <section className="container py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {usps.map(u => (
          <div key={u.title} className="bg-card rounded-2xl border-t-4 border-t-primary p-3 sm:p-5 text-center shadow-sm">
            <span className="text-2xl sm:text-3xl">{u.emoji}</span>
            <h3 className="font-heading font-bold text-xs sm:text-sm mt-1.5 sm:mt-2">{u.title}</h3>
            <p className="text-[10px] sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 hidden sm:block">{u.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
