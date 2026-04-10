import { Helmet } from 'react-helmet-async';
import { STORE_NAME, STORE_ADDRESS, STORE_PHONE, STORE_HOURS } from '@/lib/constants';

const stats = [
  { value: '200+', label: 'Products' },
  { value: '9', label: 'Categories' },
  { value: '1000+', label: 'Happy Families' },
  { value: '#1', label: "Mysore's Baby Store" },
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About | Select Baby World Mysore</title>
        <meta name="description" content="Learn about Select Baby World, Mysore's most trusted baby products wholesale store at Gandhi Square." />
      </Helmet>

      <div className="bg-gradient-to-br from-primary-light to-secondary-light py-16 text-center">
        <div className="container">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold">About Select Baby World</h1>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">Mysore's most trusted destination for baby products</p>
        </div>
      </div>

      <div className="container py-12 space-y-12">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Select Baby World is Mysore's most trusted destination for baby products. Located at the heart of Gandhi Square,
            we have been serving Mysore's families with 200+ premium baby products at wholesale prices.
            From newborns to 4-year-olds, we have everything your little one needs.
          </p>
        </div>

        <div className="bg-primary-light rounded-2xl p-8 max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-xl font-bold mb-2">Our Mission</h2>
          <p className="text-muted-foreground">To provide every family in Mysore access to premium, safe, and genuine baby products at the most affordable wholesale prices.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="bg-card rounded-2xl border p-6 text-center">
              <p className="font-heading text-3xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-secondary-light rounded-2xl p-8 max-w-lg mx-auto">
          <h3 className="font-heading text-lg font-bold mb-3">Store Information</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>📍 {STORE_ADDRESS}</li>
            <li>📞 {STORE_PHONE}</li>
            <li>🕐 {STORE_HOURS}</li>
          </ul>
        </div>
      </div>
    </>
  );
}
