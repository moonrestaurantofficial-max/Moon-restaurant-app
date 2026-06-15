'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';

const features = [
  {
    icon: 'party',
    title: 'Perfect Gathering Place',
    desc: 'Bringing families and friends together',
    longDesc: 'Moon Restaurant is the perfect destination for gatherings of all kinds. Whether it\'s a family reunion, friends catching up, or special celebrations, our welcoming atmosphere and spacious seating create the ideal setting for creating cherished memories together.',
    image: '/assets/images/1.jpeg'
  },
  {
    icon: 'restaurant',
    title: 'International Experience',
    desc: 'Welcoming guests from around the world',
    longDesc: 'We take pride in serving international visitors who seek authentic Pakistani cuisine. Foreigners and tourists consistently choose Moon Restaurant for our exceptional hospitality, delicious meals, and the unique cultural dining experience that makes their journey through Pakistan truly memorable.',
    image: '/assets/images/2.jpeg'
  },
  {
    icon: 'star',
    title: 'Best Cuisine in Naran',
    desc: 'Authentic flavors in the heart of the mountains',
    longDesc: 'Experience the finest Pakistani cuisine in the heart of Naran. Our expertly crafted dishes showcase traditional recipes passed down through generations, prepared with the freshest ingredients and authentic spices that capture the true essence of Pakistani gastronomy.',
    image: '/assets/images/3.jpeg'
  },
  {
    icon: 'landscape',
    title: 'Breathtaking Mountain Views',
    desc: 'Dine surrounded by scenic natural beauty',
    longDesc: 'Enjoy your meal with stunning panoramic views of majestic mountains and pristine landscapes. Our strategic location offers an unparalleled dining experience where spectacular scenery complements exceptional cuisine, making every visit a feast for both the palate and the eyes.',
    image: '/assets/images/4.jpeg'
  },
  {
    icon: 'award',
    title: 'Luxury & Comfort',
    desc: 'Premium amenities with convenient parking',
    longDesc: 'Experience luxury at its finest with our premium facilities designed for your ultimate comfort. From elegant interiors and plush seating to ample secure parking space, every detail ensures a hassle-free and sophisticated dining experience that reflects our commitment to excellence.',
    image: '/assets/images/5.jpeg'
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative mx-2 mt-2 flex min-h-[720px] items-center overflow-hidden rounded-[28px] pt-24 sm:mx-0 sm:mt-0 sm:min-h-screen sm:rounded-none sm:pt-28">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/naran-branch.jpeg"
            alt="Moon Restaurant branch"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,25,14,.82)_0%,rgba(3,25,14,.65)_48%,rgba(3,25,14,.92)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,25,14,.4)_75%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-center px-5 pb-20 sm:px-6 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75 sm:mb-7 sm:gap-3 sm:text-xs sm:tracking-[0.28em]">
              <span className="h-px w-8 bg-[rgb(var(--secondary))]" />
              Naran &amp; Besar
              <span className="h-px w-8 bg-[rgb(var(--secondary))]" />
            </div>
            <h1
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.6), 0 0 80px rgba(217,119,6,0.15)' }}
              className="mb-5 font-serif text-5xl font-semibold leading-[.92] tracking-[-.04em] text-white min-[380px]:text-6xl sm:text-8xl lg:text-9xl"
            >
              Moon <span className="block text-[rgb(var(--secondary))]">Restaurant</span>
            </h1>
            <p className="mx-auto mb-7 max-w-xl text-sm leading-relaxed text-white/75 sm:mb-9 sm:text-xl">
              Authentic Pakistani cuisine, generous hospitality, and memorable moments in the heart of the mountains.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <a href="tel:+923312241322" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[rgb(var(--secondary))] px-6 py-3.5 text-sm font-semibold text-white shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:bg-amber-500 sm:px-7 sm:py-4 sm:text-base">
                <Icon name="phone" size={20} /> Call for Reservation
              </a>
              <Link href="#branches" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/20 sm:px-7 sm:py-4 sm:text-base">
                Explore Our Branches <Icon name="down-arrow" size={20} />
              </Link>
            </div>
            <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 divide-x divide-white/20 rounded-2xl border border-white/15 bg-black/15 px-2 py-3 text-white/65 backdrop-blur-md sm:mt-12 sm:px-6 sm:py-4">
              <div><strong className="block text-lg text-white sm:text-xl">2</strong><span className="text-[10px] uppercase tracking-wider sm:text-xs">Branches</span></div>
              <div><strong className="block text-lg text-white sm:text-xl">Daily</strong><span className="text-[10px] uppercase tracking-wider sm:text-xs">11AM - 11PM</span></div>
              <div><strong className="block text-lg text-white sm:text-xl">100%</strong><span className="text-[10px] uppercase tracking-wider sm:text-xs">Halal</span></div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-white/50 text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="text-white/70"
          >
            <Icon name="down-arrow" size={32} />
          </motion.div>
        </motion.div>
      </section>

      {/* Branches Section */}
      <section id="branches" className="bg-white/90 py-12 backdrop-blur-[1px] sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-1.5 sm:px-3 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[rgb(var(--primary))] mb-3 sm:mb-4">
              Our Branches
            </h2>
            <p className="text-center text-[rgb(var(--muted-foreground))] text-base sm:text-lg mb-10 sm:mb-12 lg:mb-16 max-w-2xl mx-auto px-4">
              Experience authentic Pakistani cuisine at our premium locations
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Naran Branch */}
            <ScrollReveal direction="left" delay={0.2}>
              <div className="group relative overflow-hidden rounded-[28px] bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:rounded-3xl">
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <Image
                    src="/assets/images/naran-branch.jpeg"
                    alt="Naran Branch"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/45" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="location" size={20} />
                      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Location</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold">Naran</h3>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-[rgb(var(--foreground))] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    Experience authentic Pakistani cuisine in the heart of Naran&apos;s scenic beauty. 
                    Perfect for tourists and families seeking memorable dining experiences surrounded by mountains.
                  </p>
                  <div className="flex items-center gap-2 text-[rgb(var(--primary))] font-semibold text-sm sm:text-base">
                    <Icon name="location" size={18} />
                    <span>Naran, Pakistan</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Besar Branch */}
            <ScrollReveal direction="right" delay={0.4}>
              <div className="group relative overflow-hidden rounded-[28px] bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:rounded-3xl">
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <Image
                    src="/assets/images/naran.jpeg"
                    alt="Besar Branch"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/45" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="location" size={20} />
                      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Location</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold">Besar</h3>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-[rgb(var(--foreground))] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    Discover culinary excellence in Besar with our premium dining experience. 
                    Ideal for group celebrations, special occasions, and unforgettable moments.
                  </p>
                  <div className="flex items-center gap-2 text-[rgb(var(--primary))] font-semibold text-sm sm:text-base">
                    <Icon name="location" size={18} />
                    <span>Besar, Pakistan</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Section - React Bits Scroll Stack */}
      <section className="bg-white/85 py-10 backdrop-blur-[1px] sm:py-12 lg:py-28">
        <div className="mx-auto max-w-7xl px-1.5 sm:px-3 lg:px-8">
          <ScrollReveal>
            <div className="mb-5 text-center sm:mb-7 lg:mb-14">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-3 inline-block rounded-full bg-[rgb(var(--primary))]/10 px-4 py-2 text-sm font-semibold text-[rgb(var(--primary))] sm:mb-4"
              >
                Our Excellence
              </motion.span>
              <h2 className="mx-auto max-w-sm text-3xl font-bold leading-tight text-[rgb(var(--primary))] sm:max-w-none sm:text-4xl lg:text-5xl">
                Why Choose Moon Restaurant
              </h2>
            </div>
          </ScrollReveal>

          <ScrollStack
            useWindowScroll
            itemDistance={72}
            itemStackDistance={16}
            itemScale={0.012}
            baseScale={0.96}
            stackPosition="9%"
            scaleEndPosition="5%"
            rotationAmount={0}
            blurAmount={0.4}
            className="h-auto overflow-visible"
          >
            {features.map((feature, index) => (
              <ScrollStackItem
                key={feature.title}
                itemClassName="h-auto min-h-[620px] overflow-hidden rounded-[24px] border border-[rgb(var(--border))] bg-white p-0 shadow-2xl shadow-black/10 sm:rounded-[28px] md:min-h-[430px] lg:rounded-2xl"
              >
                <div className="grid h-full min-h-[calc(100svh-108px)] md:min-h-[430px] md:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative min-h-[44svh] overflow-hidden md:min-h-full">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes="(min-width: 768px) 42vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/18" />
                    <div className="absolute left-4 top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--primary))] text-white shadow-xl sm:left-6 sm:top-6">
                      <Icon name={feature.icon} size={28} />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-12">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="text-sm font-bold tracking-[0.2em] text-[rgb(var(--secondary))]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px flex-1 bg-[rgb(var(--border))]" />
                    </div>
                    <h3 className="text-2xl font-bold leading-tight text-[rgb(var(--primary))] sm:text-3xl lg:text-4xl">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-lg font-semibold text-[rgb(var(--secondary))] sm:text-xl">
                      {feature.desc}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[rgb(var(--muted-foreground))] sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
                      {feature.longDesc}
                    </p>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>

      {/* Scrolling Reviews Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[rgb(var(--primary))] overflow-hidden">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              What Our Guests Say
            </h2>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Real experiences from our valued customers
            </p>
          </div>
        </ScrollReveal>
        
        {/* First Row - Left to Right */}
        <div className="relative mb-4 sm:mb-6">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex gap-4 sm:gap-6"
          >
            {[
              { name: 'Ahmad Hassan', avatar: 'AH', rating: 5, comment: 'Absolutely amazing experience! The food was authentic and delicious. The ambiance was perfect for our family gathering.' },
              { name: 'Fatima Khan', avatar: 'FK', rating: 5, comment: 'Best Pakistani restaurant in the area. Fresh ingredients, excellent service, and beautiful location.' },
              { name: 'Ali Raza', avatar: 'AR', rating: 5, comment: 'Perfect place for tourists! The staff was very welcoming and the food exceeded our expectations.' },
              { name: 'Sara Ahmed', avatar: 'SA', rating: 4, comment: 'Great food and atmosphere. We celebrated our anniversary here and it was memorable.' },
              { name: 'Usman Malik', avatar: 'UM', rating: 5, comment: 'Outstanding! From appetizers to desserts, everything was perfect. Authentic flavors!' },
              { name: 'Ayesha Tariq', avatar: 'AT', rating: 5, comment: 'Wonderful experience with family. The service was seamless and they accommodated all our requests.' },
              { name: 'Ahmad Hassan', avatar: 'AH', rating: 5, comment: 'Absolutely amazing experience! The food was authentic and delicious. The ambiance was perfect for our family gathering.' },
              { name: 'Fatima Khan', avatar: 'FK', rating: 5, comment: 'Best Pakistani restaurant in the area. Fresh ingredients, excellent service, and beautiful location.' },
              { name: 'Ali Raza', avatar: 'AR', rating: 5, comment: 'Perfect place for tourists! The staff was very welcoming and the food exceeded our expectations.' },
              { name: 'Sara Ahmed', avatar: 'SA', rating: 4, comment: 'Great food and atmosphere. We celebrated our anniversary here and it was memorable.' },
              { name: 'Usman Malik', avatar: 'UM', rating: 5, comment: 'Outstanding! From appetizers to desserts, everything was perfect. Authentic flavors!' },
              { name: 'Ayesha Tariq', avatar: 'AT', rating: 5, comment: 'Wonderful experience with family. The service was seamless and they accommodated all our requests.' },
            ].map((review, index) => (
              <motion.div
                key={`row1-${index}`}
                whileHover={{ scale: 1.02, y: -5 }}
                className="flex-shrink-0 w-[300px] sm:w-[350px] bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base">{review.name}</h4>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="star" size={12} className={i < review.rating ? 'text-yellow-300' : 'text-white/30'} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  &quot;{review.comment}&quot;
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Right to Left */}
        {/* <div className="relative">
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="flex gap-4 sm:gap-6"
          >
            {[
              { name: 'Ayesha Tariq', avatar: 'AT', rating: 5, comment: 'Wonderful experience with family. The service was seamless and they accommodated all our requests.' },
              { name: 'Usman Malik', avatar: 'UM', rating: 5, comment: 'Outstanding! From appetizers to desserts, everything was perfect. Authentic flavors!' },
              { name: 'Sara Ahmed', avatar: 'SA', rating: 4, comment: 'Great food and atmosphere. We celebrated our anniversary here and it was memorable.' },
              { name: 'Ali Raza', avatar: 'AR', rating: 5, comment: 'Perfect place for tourists! The staff was very welcoming and the food exceeded our expectations.' },
              { name: 'Fatima Khan', avatar: 'FK', rating: 5, comment: 'Best Pakistani restaurant in the area. Fresh ingredients, excellent service, and beautiful location.' },
              { name: 'Ahmad Hassan', avatar: 'AH', rating: 5, comment: 'Absolutely amazing experience! The food was authentic and delicious. The ambiance was perfect for our family gathering.' },
              { name: 'Ayesha Tariq', avatar: 'AT', rating: 5, comment: 'Wonderful experience with family. The service was seamless and they accommodated all our requests.' },
              { name: 'Usman Malik', avatar: 'UM', rating: 5, comment: 'Outstanding! From appetizers to desserts, everything was perfect. Authentic flavors!' },
              { name: 'Sara Ahmed', avatar: 'SA', rating: 4, comment: 'Great food and atmosphere. We celebrated our anniversary here and it was memorable.' },
              { name: 'Ali Raza', avatar: 'AR', rating: 5, comment: 'Perfect place for tourists! The staff was very welcoming and the food exceeded our expectations.' },
              { name: 'Fatima Khan', avatar: 'FK', rating: 5, comment: 'Best Pakistani restaurant in the area. Fresh ingredients, excellent service, and beautiful location.' },
              { name: 'Ahmad Hassan', avatar: 'AH', rating: 5, comment: 'Absolutely amazing experience! The food was authentic and delicious. The ambiance was perfect for our family gathering.' },
            ].map((review, index) => (
              <motion.div
                key={`row2-${index}`}
                whileHover={{ scale: 1.02, y: -5 }}
                className="flex-shrink-0 w-[300px] sm:w-[350px] bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base">{review.name}</h4>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="star" size={12} className={i < review.rating ? 'text-yellow-300' : 'text-white/30'} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  &quot;{review.comment}&quot;
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div> */}

        {/* View All Reviews Link */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[rgb(var(--primary))] rounded-full font-semibold text-sm sm:text-base shadow-lg hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            <span>View All Reviews</span>
            <Icon name="arrow" size={20} />
          </Link>
        </div>
      </section>


    </div>
  );
}
