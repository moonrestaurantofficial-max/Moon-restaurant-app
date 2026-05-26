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
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop"
            alt="Restaurant Interior"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/62" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {/* Premium Gold Badge */}


            {/* Main Heading — BIG on mobile */}
            <h1
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.6), 0 0 80px rgba(217,119,6,0.15)' }}
              className="text-6xl xs:text-7xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl font-bold text-white mb-4 sm:mb-5 drop-shadow-2xl leading-[1.05] tracking-tight"
            >
              Moon
              <span className="block text-[rgb(var(--secondary))] drop-shadow-[0_0_30px_rgba(217,119,6,0.5)]">Restaurant</span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="inline-flex items-center gap-2 mb-5 sm:mb-7 px-5 py-2 rounded-full border border-[rgb(var(--secondary))]/60 bg-[rgb(var(--secondary))]/15 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--secondary))] animate-pulse" />
              <span className="text-[rgb(var(--secondary))] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">Naran &amp; Besar</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--secondary))] animate-pulse" />
            </motion.div>
            {/* Decorative Gold Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
              className="flex items-center justify-center gap-3 mb-5 sm:mb-7"
            >
              <div className="h-px w-12 bg-[rgb(var(--secondary))]/70 sm:w-20" />
              <div className="w-2 h-2 rounded-full bg-[rgb(var(--secondary))]" />
              <div className="h-px w-12 bg-[rgb(var(--secondary))]/70 sm:w-20" />
            </motion.div>

            {/* Subtitle — big & clear on mobile */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 mb-8 sm:mb-10 lg:mb-12 font-light tracking-wide px-2"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
            >
              Authentic Pakistani Cuisine
            </motion.p>


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
      <section className="bg-white/90 py-12 backdrop-blur-[1px] sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
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
              <div className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
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
      <section className="bg-white/85 py-16 backdrop-blur-[1px] sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-10 text-center sm:mb-12 lg:mb-14">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block px-4 py-2 bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] rounded-full text-sm font-semibold mb-4"
              >
                Our Excellence
              </motion.span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--primary))]">
                Why Choose Moon Restaurant
              </h2>
            </div>
          </ScrollReveal>

          <ScrollStack
            useWindowScroll
            itemDistance={120}
            itemStackDistance={24}
            itemScale={0.025}
            baseScale={0.88}
            stackPosition="14%"
            scaleEndPosition="7%"
            rotationAmount={0}
            blurAmount={0.4}
            className="h-auto overflow-visible"
          >
            {features.map((feature, index) => (
              <ScrollStackItem
                key={feature.title}
                itemClassName="h-auto min-h-[620px] overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-white p-0 shadow-2xl shadow-black/10 md:min-h-[430px]"
              >
                <div className="grid h-full min-h-[620px] md:min-h-[430px] md:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative min-h-[260px] overflow-hidden md:min-h-full">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes="(min-width: 768px) 42vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/18" />
                    <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--primary))] text-white shadow-xl sm:left-6 sm:top-6">
                      <Icon name={feature.icon} size={30} />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
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
                    <p className="mt-5 text-sm leading-7 text-[rgb(var(--muted-foreground))] sm:text-base lg:text-lg">
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
