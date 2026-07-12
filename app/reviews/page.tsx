'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
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
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [isConfigured, setIsConfigured] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [reviewsError, setReviewsError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    branch: '',
    rating: 5,
    comment: '',
  });

  const [branchFilter, setBranchFilter] = useState<'All' | 'Naran' | 'Besar'>('All');

  const averageRating = useMemo(() => {
    if (!reviews.length) return '0.0';
    return (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const ratingBreakdown = useMemo(() => {
    const counts = [5, 4, 3, 2, 1].map(stars => reviews.filter(review => review.rating === stars).length);
    const max = Math.max(1, ...counts);
    return [5, 4, 3, 2, 1].map((stars, i) => ({
      stars,
      count: counts[i],
      percent: reviews.length ? Math.round((counts[i] / reviews.length) * 100) : 0,
      barWidth: Math.round((counts[i] / max) * 100),
    }));
  }, [reviews]);

  const filteredReviews = useMemo(
    () => (branchFilter === 'All' ? reviews : reviews.filter(review => review.branch === branchFilter)),
    [reviews, branchFilter]
  );

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoadingReviews(true);
      setReviewsError('');

      if (!isSupabaseConfigured || !supabase) {
        setIsConfigured(false);
        setIsLoadingReviews(false);
        return;
      }

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        setReviewsError(error.message || 'Failed to load reviews');
      } else {
        setReviews((data as ReviewRow[]).map(mapReviewRow));
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

    if (!isConfigured) {
      setReviews(currentReviews => [localReview, ...currentReviews]);
      setSubmitStatus('preview');
      setFormData({ name: '', phone: '', branch: '', rating: 5, comment: '' });
      setIsSubmitting(false);
      window.setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    if (!supabase) {
      setSubmitStatus('error');
      setErrorMessage('Supabase is not configured.');
      setIsSubmitting(false);
      window.setTimeout(() => setSubmitStatus('idle'), 6000);
      return;
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        name: formData.name,
        email: formData.phone || null,
        branch: formData.branch,
        rating: formData.rating,
        comment: formData.comment,
        is_published: true,
      })
      .select()
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

    setFormData({ name: '', phone: '', branch: '', rating: 5, comment: '' });
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

            <div className="mx-auto max-w-2xl">
              <div className="grid gap-6 rounded-[28px] border border-white/15 bg-white p-6 text-[rgb(var(--foreground))] shadow-sm sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-8">
                <div className="flex flex-col items-center justify-center gap-2 border-b border-[rgb(var(--border))] pb-6 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-8">
                  <div className="text-5xl font-bold sm:text-6xl">{averageRating}</div>
                  <div className="flex gap-1 text-lg sm:text-xl">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="star"
                        size={22}
                        className={i < Math.round(Number(averageRating)) ? 'text-[rgb(var(--secondary))]' : 'text-[rgb(var(--border))]'}
                      />
                    ))}
                  </div>
                  <p className="whitespace-nowrap text-xs text-[rgb(var(--muted-foreground))] sm:text-sm">
                    {isLoadingReviews ? 'Loading reviews...' : `${reviews.length} verified review${reviews.length === 1 ? '' : 's'}`}
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-1.5">
                  {ratingBreakdown.map(row => (
                    <div key={row.stars} className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="w-3 flex-shrink-0 font-semibold text-[rgb(var(--muted-foreground))]">{row.stars}</span>
                      <Icon name="star" size={12} className="flex-shrink-0 text-[rgb(var(--secondary))]" />
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[rgb(var(--muted))]">
                        <div
                          className="h-full rounded-full bg-[rgb(var(--secondary))]"
                          style={{ width: `${row.barWidth}%` }}
                        />
                      </div>
                      <span className="w-6 flex-shrink-0 text-right text-[rgb(var(--muted-foreground))]">{row.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              {!isConfigured && (
                <p className="mt-3 text-center text-xs text-white/60">
                  Preview mode until Supabase env vars are added.
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="mb-6 text-center text-2xl font-bold text-[rgb(var(--primary))] sm:mb-8 sm:text-3xl lg:text-4xl">
              What Our Guests Say
            </h2>

            <div className="mb-8 flex items-center justify-center gap-2 sm:mb-10 lg:mb-12">
              {(['All', 'Naran', 'Besar'] as const).map(branch => (
                <button
                  key={branch}
                  type="button"
                  onClick={() => setBranchFilter(branch)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
                    branchFilter === branch
                      ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))] text-white'
                      : 'border-[rgb(var(--border))] bg-white text-[rgb(var(--muted-foreground))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))]'
                  }`}
                >
                  {branch === 'All' ? 'All Branches' : `${branch} Branch`}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {reviewsError && (
            <div className="mb-8 rounded-2xl border border-yellow-500 bg-yellow-50 p-4 text-sm font-medium text-yellow-900">
              {reviewsError} See <span className="font-bold">SUPABASE_REVIEWS_SETUP.md</span>, then refresh this page.
            </div>
          )}

          {isLoadingReviews ? (
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {[1, 2, 3].map(item => (
                <div key={item} className="h-64 animate-pulse rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--muted))]" />
              ))}
            </div>
          ) : filteredReviews.length ? (
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {filteredReviews.map((review, index) => (
                <ScrollReveal key={review._id} delay={index * 0.08} direction="up">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="h-full min-h-64 rounded-[20px] border border-[rgb(var(--border))] bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
                  >
                    <ReviewCard review={review} formatDate={formatDate} />
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-[rgb(var(--muted-foreground))] sm:text-base">
              No reviews yet for this branch.
            </p>
          )}
        </div>
      </section>

      <section className="bg-[rgb(var(--muted))] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="mb-3 text-center text-2xl font-bold text-[rgb(var(--primary))] sm:mb-4 sm:text-3xl lg:text-4xl">
              Share Your Experience
            </h2>
            <p className="mb-6 text-center text-sm text-[rgb(var(--muted-foreground))] sm:mb-8 sm:text-base">
              We value your feedback and would love to hear about your visit
            </p>

            <div className="rounded-[28px] border border-[rgb(var(--border))] bg-white shadow-sm">
              <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                <div className="mb-4 grid gap-4 sm:mb-6 sm:grid-cols-2 sm:gap-6">
                  <FormInput
                    id="name"
                    label="Your Name *"
                    value={formData.name}
                    onChange={value => setFormData({ ...formData, name: value })}
                    required
                  />
                  <FormInput
                    id="phone"
                    label="Phone Number *"
                    type="tel"
                    value={formData.phone}
                    onChange={value => setFormData({ ...formData, phone: value })}
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
                        <Icon name="star" size={32} className={star <= formData.rating ? 'text-[rgb(var(--secondary))]' : 'text-[rgb(var(--border))]'} />
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
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[rgb(var(--primary))] py-3 text-base font-bold text-white shadow-sm transition-all duration-300 hover:bg-[rgb(var(--secondary))] disabled:opacity-50 sm:py-4 sm:text-lg"
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
            </div>
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
          <Icon key={i} name="star" size={20} className={i < review.rating ? 'text-[rgb(var(--secondary))]' : 'text-[rgb(var(--border))]'} />
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
  type = 'text',
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
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
      className="w-[300px] flex-shrink-0 rounded-xl border border-white/15 bg-white/[0.06] p-4 sm:w-[350px] sm:rounded-2xl sm:p-5"
    >
      <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white sm:h-10 sm:w-10">
          <Icon name="star" size={16} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white sm:text-base">{review.name}</h4>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="star" size={12} className={i < review.rating ? 'text-[rgb(var(--secondary))]' : 'text-white/30'} />
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
