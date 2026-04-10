import { Helmet } from 'react-helmet-async';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { USPStrip } from '@/components/sections/USPStrip';
import { CategoryGrid } from '@/components/sections/CategoryGrid';
import { FeaturedProducts, NewArrivals } from '@/components/sections/FeaturedProducts';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { GoogleReviews } from '@/components/sections/GoogleReviews';
import { StoreLocation } from '@/components/sections/StoreLocation';
import { STORE_NAME, STORE_ADDRESS, STORE_PHONE, STORE_HOURS, GEO_LAT, GEO_LNG } from '@/lib/constants';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: STORE_NAME,
  description: "Mysore's most trusted baby products wholesale store for ages 0-4 years",
  address: { "@type": "PostalAddress", streetAddress: "Gandhi Square", addressLocality: "Mysore", addressRegion: "Karnataka", addressCountry: "IN" },
  telephone: STORE_PHONE,
  openingHours: "Mo-Sa 10:00-20:00",
  geo: { "@type": "GeoCoordinates", latitude: GEO_LAT, longitude: GEO_LNG },
};

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Select Baby World — Best Baby Store in Mysore | 0–4 Years</title>
        <meta name="description" content="Select Baby World is Mysore's most trusted baby products wholesale store. Premium quality products for ages 0-4 years at Gandhi Square, Mysore." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <HeroBanner />
      <USPStrip />
      <CategoryGrid />
      <FeaturedProducts />
      <NewArrivals />
      <WhyChooseUs />
      <GoogleReviews />
      <StoreLocation />
    </>
  );
}
