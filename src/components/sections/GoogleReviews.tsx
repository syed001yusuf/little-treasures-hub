import { useReviews } from '@/lib/hooks';
import { StarRating } from '@/components/ui/StarRating';
import { GOOGLE_REVIEWS_URL } from '@/lib/constants';

export function GoogleReviews() {
  const { data: reviews = [] } = useReviews();

  return (
    <section className="container py-12">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-2">What Parents Are Saying ⭐</h2>
      <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.slice(0, 4).map(r => (
          <div key={r.id} className="relative bg-card rounded-2xl p-5 shadow-sm border">
            {/* Google logo */}
            <svg className="absolute top-4 right-4 h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                {r.avatar_initial}
              </div>
              <div>
                <p className="font-heading font-semibold text-sm">{r.reviewer_name}</p>
                <p className="text-xs text-muted-foreground">{r.date}</p>
              </div>
            </div>
            <StarRating rating={r.rating} size={14} />
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{r.review_text}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
          Read all reviews on Google →
        </a>
      </div>
    </section>
  );
}
