'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import BorderGlow from '@/components/BorderGlow';
import Icon from '@/components/Icon';
import ScrollReveal from '@/components/ScrollReveal';
import { isSupabaseConfigured, supabase, type ReviewRow } from '@/lib/supabase';

interface Review {
  _id: string;
  name: string;
  rating: number;
  createdAt: string;
  branch: string;
  comment: string;
}

type SubmitStatus = 'idle' | 'success' | 'error' | 'preview';

const fallbackReviews: Review[] = [
  {
    _id: '1',
    name: 'Ahmad Hassan',
    rating: 5,
    createdAt: '2026-01-15',
    branch: 'Naran',
    comment: 'Absolutely amazing experience! The food was authentic and delicious. The ambiance was perfect for our family gathering.',
  },
  {
    _id: '2',
    name: 'Fatima Khan',
    rating: 5,
    createdAt: '2026-01-10',
    branch: 'Besar',
    comment: 'Best Pakistani restaurant in the area. Fresh ingredients, excellent service, and beautiful location.',
  },
  {
    _id: '3',
    name: 'Ali Raza',
    rating: 5,
    createdAt: '2026-01-05',
    branch: 'Naran',
    comment: 'Perfect place for tourists. The staff was welcoming and the food exceeded our expectations.',
  },
  {
    _id: '4',
    name: 'Sara Ahmed',
    rating: 4,
    createdAt: '2025-12-28',
    branch: 'Besar',
    comment: 'Great food and atmosphere. We celebrated our anniversary here and it was memorable.',
  },
  {
    _id: '5',
    name: 'Usman Malik',
    rating: 5,
    createdAt: '2025-12-20',
    branch: 'Naran',
    comment: 'Outstanding from appetizers to desserts. The chef really knows how to bring out authentic flavors.',
  },
  {
    _id: '6',
    name: 'Ayesha Tariq',
    rating: 5,
    createdAt: '2025-12-15',
    branch: 'Besar',
    comment: 'Wonderful experience with family. The staff was attentive and accommodated all our requests.',
  },
];

const mapReviewRow = (review: ReviewRow): Review => ({
  _id: review.id,
  name: review.name,
  rating: review.rating,
  createdAt: review.created_at,
  branch: review.branch,
  comment: review.comment,
});

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [isLoadingReviews, setIsLoadingReviews] = useState(isSupabaseConfigured);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [reviewsError, setReviewsError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
    rating: 5,
    comment: '',
  });

  const averageRating = useMemo(() => {
    if (!reviews.length) return '0.0';
    return (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    const fetchReviews = async () => {
      setIsLoadingReviews(true);
      setReviewsError('');

      const { data, error } = await client
        .from('reviews')
        .select('id,name,email,rating,branch,comment,created_at,is_published')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setReviews(data.map(review => mapReviewRow(review as ReviewRow)));
      } else if (error) {
        setReviewsError(
          error.message.includes("Could not find the table")
            ? 'Supabase is connected, but the public.reviews table has not been created yet.'
            : error.message
        );
      }

      setIsLoadingReviews(false);
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const localReview: Review = {
      _id: `local-${Date.now()}`,
      name: formData.name,
      rating: formData.rating,
      createdAt: new Date().toISOString(),
      branch: formData.branch,
      comment: formData.comment,
    };

    const client = supabase;

    if (!client) {
      setReviews(currentReviews => [localReview, ...currentReviews]);
      setSubmitStatus('preview');
      setFormData({ name: '', email: '', branch: '', rating: 5, comment: '' });
      setIsSubmitting(false);
      window.setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    const { data, error } = await client
      .from('reviews')
      .insert({
        name: formData.name,
        email: formData.email,
        branch: formData.branch,
        rating: formData.rating,
        comment: formData.comment,
        is_published: true,
      })
      .select('id,name,email,rating,branch,comment,created_at,is_published')
      .single();

    if (error || !data) {
      setSubmitStatus('error');
      setErrorMessage(error?.message || 'Failed to publish review. Please try again.');
      setIsSubmitting(false);
      window.setTimeout(() => setSubmitStatus('idle'), 6000);
      return;
    }

    setReviews(currentReviews => [mapReviewRow(data as ReviewRow), ...currentReviews]);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', branch: '', rating: 5, comment: '' });
    setIsSubmitting(false);
    window.setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const marqueeReviews = reviews.length ? reviews : fallbackReviews;

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden bg-[rgb(var(--primary))] py-12 text-white sm:py-16 lg:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="mb-4 text-center text-4xl font-bold sm:mb-6 sm:text-5xl lg:text-6xl">
              Customer Reviews
            </h1>
            <p className="mx-auto mb-6 max-w-2xl px-4 text-center text-base text-white/90 sm:mb-8 sm:text-lg lg:text-xl">
              Hear what our valued guests have to say about their Moon Restaurant experience
            </p>

            <div className="mx-auto max-w-sm">
              <BorderGlow
                animated
                borderRadius={28}
                glowColor="38 82 56"
                backgroundColor="rgba(255,255,255,0.12)"
                colors={['rgba(217,119,6,0.75)', 'rgba(20,83,45,0.85)', 'rgba(255,255,255,0.35)']}
                className="border-white/20 p-6 text-center backdrop-blur-md"
              >
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <div className="text-5xl font-bold sm:text-6xl lg:text-7xl">{averageRating}</div>
                  <div className="flex gap-1 text-2xl sm:text-3xl">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="star"
                        size={32}
                        className={i < Math.round(Number(averageRating)) ? 'text-yellow-300' : 'text-white/30'}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-white/80 sm:text-base lg:text-lg">
                    {isLoadingReviews ? 'Loading reviews...' : `Based on ${reviews.length} reviews`}
                  </p>
                </div>
              </BorderGlow>
              {!isSupabaseConfigured && (
                <p className="mt-3 text-center text-xs text-white/60">
                  Preview mode until Supabase env vars are added.
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white/90 py-12 backdrop-blur-[1px] sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="mb-8 text-center text-2xl font-bold text-[rgb(var(--primary))] sm:mb-10 sm:text-3xl lg:mb-12 lg:text-4xl">
              What Our Guests Say
            </h2>
          </ScrollReveal>

          {reviewsError && (
            <div className="mb-8 rounded-2xl border border-yellow-500 bg-yellow-50 p-4 text-sm font-medium text-yellow-900">
              {reviewsError} Run the SQL in <span className="font-bold">SUPABASE_REVIEWS_SETUP.md</span>, then refresh this page.
            </div>
          )}

          {isLoadingReviews ? (
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {[1, 2, 3].map(item => (
                <div key={item} className="h-64 animate-pulse rounded-2xl border border-[rgb(var(--border))] bg-white/80" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <ScrollReveal key={review._id} delay={index * 0.08} direction="up">
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.25 }}>
                    <BorderGlow
                      borderRadius={20}
                      glowColor="38 78 58"
                      backgroundColor="#ffffff"
                      colors={['rgba(217,119,6,0.72)', 'rgba(20,83,45,0.72)', 'rgba(252,211,77,0.55)']}
                      glowRadius={24}
                      glowIntensity={0.45}
                      fillOpacity={0.22}
                      className="h-full min-h-64 border-[rgb(var(--border))] bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-2xl sm:p-6"
                    >
                      <ReviewCard review={review} formatDate={formatDate} />
                    </BorderGlow>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white/90 py-12 backdrop-blur-[1px] sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="mb-3 text-center text-2xl font-bold text-[rgb(var(--primary))] sm:mb-4 sm:text-3xl lg:text-4xl">
              Share Your Experience
            </h2>
            <p className="mb-6 text-center text-sm text-[rgb(var(--muted-foreground))] sm:mb-8 sm:text-base">
              We value your feedback and would love to hear about your visit
            </p>

            <BorderGlow
              animated
              borderRadius={28}
              glowColor="38 78 58"
              backgroundColor="#ffffff"
              colors={['rgba(217,119,6,0.7)', 'rgba(20,83,45,0.78)', 'rgba(255,255,255,0.3)']}
              glowRadius={28}
              glowIntensity={0.5}
              fillOpacity={0.18}
              className="border-[rgb(var(--border))] bg-white shadow-xl"
            >
              <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                <div className="mb-4 grid gap-4 sm:mb-6 sm:grid-cols-2 sm:gap-6">
                  <FormInput
                    id="name"
                    label="Your Name *"
                    value={formData.name}
                    onChange={value => setFormData({ ...formData, name: value })}
                    placeholder="John Doe"
                    required
                  />
                  <FormInput
                    id="email"
                    label="Email Address *"
                    type="email"
                    value={formData.email}
                    onChange={value => setFormData({ ...formData, email: value })}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="mb-4 sm:mb-6">
                  <label htmlFor="branch" className="mb-2 block text-sm font-semibold text-[rgb(var(--foreground))]">
                    Which Branch Did You Visit? *
                  </label>
                  <select
                    id="branch"
                    value={formData.branch}
                    onChange={e => setFormData({ ...formData, branch: e.target.value })}
                    required
                    className="w-full rounded-xl border-2 border-[rgb(var(--border))] bg-white px-3 py-2.5 text-sm transition-colors focus:border-[rgb(var(--primary))] focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                  >
                    <option value="">Select a branch</option>
                    <option value="Naran">Naran Branch</option>
                    <option value="Besar">Besar Branch</option>
                  </select>
                </div>

                <div className="mb-4 sm:mb-6">
                  <label className="mb-2 block text-sm font-semibold text-[rgb(var(--foreground))]">
                    Your Rating *
                  </label>
                  <div className="flex gap-1 sm:gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="transition-transform hover:scale-125 focus:outline-none"
                        aria-label={`${star} star rating`}
                      >
                        <Icon name="star" size={32} className={star <= formData.rating ? 'text-yellow-500' : 'text-gray-300'} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <label htmlFor="comment" className="mb-2 block text-sm font-semibold text-[rgb(var(--foreground))]">
                    Your Review *
                  </label>
                  <textarea
                    id="comment"
                    value={formData.comment}
                    onChange={e => setFormData({ ...formData, comment: e.target.value })}
                    required
                    rows={5}
                    className="w-full resize-none rounded-xl border-2 border-[rgb(var(--border))] bg-white px-3 py-2.5 text-sm transition-colors focus:border-[rgb(var(--primary))] focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                    placeholder="Tell us about your experience..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[rgb(var(--primary))] py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-[rgb(var(--secondary))] hover:shadow-xl disabled:opacity-50 sm:py-4 sm:text-lg"
                >
                  {isSubmitting ? 'Publishing...' : (
                    <>
                      <Icon name="star" size={20} />
                      <span>Publish Review</span>
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <StatusMessage tone="success" text="Thank you. Your review is published." />
                )}
                {submitStatus === 'preview' && (
                  <StatusMessage tone="preview" text="Supabase is not configured yet, so this review was added only to the local preview." />
                )}
                {submitStatus === 'error' && (
                  <StatusMessage tone="error" text={errorMessage || 'Something went wrong. Please try again.'} />
                )}
              </form>
            </BorderGlow>
          </ScrollReveal>
        </div>
      </section>

      <section className="overflow-hidden bg-[rgb(var(--primary))] py-8 sm:py-12">
        <div className="mb-6 text-center sm:mb-8">
          <h3 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
            What People Are Saying
          </h3>
        </div>

        <ReviewMarquee reviews={marqueeReviews} />
      </section>
    </div>
  );
}

function ReviewCard({ review, formatDate }: { review: Review; formatDate: (dateString: string) => string }) {
  return (
    <>
      <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] sm:h-12 sm:w-12">
            <Icon name="star" size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-[rgb(var(--foreground))] sm:text-base">
              {review.name}
            </h3>
            <p className="text-xs text-[rgb(var(--muted-foreground))] sm:text-sm">
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>
        <span className="flex-shrink-0 whitespace-nowrap rounded-full bg-[rgb(var(--primary))]/10 px-2 py-1 text-xs font-semibold text-[rgb(var(--primary))] sm:px-3 sm:text-sm">
          {review.branch}
        </span>
      </div>

      <div className="mb-2 flex gap-0.5 sm:mb-3 sm:gap-1">
        {[...Array(5)].map((_, i) => (
          <Icon key={i} name="star" size={20} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'} />
        ))}
      </div>

      <p className="text-sm leading-relaxed text-[rgb(var(--foreground))] sm:text-base">
        &quot;{review.comment}&quot;
      </p>
    </>
  );
}

function FormInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-[rgb(var(--foreground))]">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border-2 border-[rgb(var(--border))] bg-white px-3 py-2.5 text-sm transition-colors focus:border-[rgb(var(--primary))] focus:outline-none sm:px-4 sm:py-3 sm:text-base"
        placeholder={placeholder}
      />
    </div>
  );
}

function StatusMessage({ tone, text }: { tone: 'success' | 'preview' | 'error'; text: string }) {
  const toneClass = {
    success: 'border-green-500 bg-green-50 text-green-700',
    preview: 'border-yellow-500 bg-yellow-50 text-yellow-800',
    error: 'border-red-500 bg-red-50 text-red-700',
  }[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-3 rounded-xl border-2 p-3 text-center text-sm font-semibold sm:mt-4 sm:p-4 sm:text-base ${toneClass}`}
    >
      {text}
    </motion.div>
  );
}

function ReviewMarquee({ reviews }: { reviews: Review[] }) {
  const firstRow = [...reviews, ...reviews];
  const secondRow = [...reviews].reverse().concat([...reviews].reverse());

  return (
    <>
      <div className="relative mb-4 sm:mb-6">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-4 sm:gap-6"
        >
          {firstRow.map((review, index) => (
            <MarqueeCard key={`row1-${review._id}-${index}`} review={review} />
          ))}
        </motion.div>
      </div>

      <div className="relative">
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="flex gap-4 sm:gap-6"
        >
          {secondRow.map((review, index) => (
            <MarqueeCard key={`row2-${review._id}-${index}`} review={review} />
          ))}
        </motion.div>
      </div>
    </>
  );
}

function MarqueeCard({ review }: { review: Review }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="w-[300px] flex-shrink-0 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm sm:w-[350px] sm:rounded-2xl sm:p-5"
    >
      <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white sm:h-10 sm:w-10">
          <Icon name="star" size={16} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white sm:text-base">{review.name}</h4>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="star" size={12} className={i < review.rating ? 'text-yellow-300' : 'text-white/30'} />
            ))}
          </div>
        </div>
      </div>
      <p className="line-clamp-3 text-xs leading-relaxed text-white/90 sm:text-sm">
        &quot;{review.comment}&quot;
      </p>
    </motion.div>
  );
}
