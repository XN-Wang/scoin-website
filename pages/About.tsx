import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../translations/index';

interface AboutProps { lang: Language; }

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemFade = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };
const itemSlideLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } };
const itemSlideRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };

const ABOUT_BANNER = '/images/about_banner.png';
const INTRO_IMG = 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80';

const About: React.FC<AboutProps> = ({ lang }) => {
  const t = (key: string) => translations[key]?.[lang] || key;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Business', message: '' });

  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const introInView = useInView(introRef, { once: true, margin: '-80px' });
  const missionInView = useInView(missionRef, { once: true, margin: '-80px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-80px' });
  const trustInView = useInView(trustRef, { once: true, margin: '-80px' });
  const contactInView = useInView(contactRef, { once: true, margin: '-80px' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen text-slate-900 antialiased pt-24 overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-indigo-50/30">
      {/* Floating soft orbs (light mode) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.4] blur-[120px] animate-float-slow"
          style={{ background: 'radial-gradient(circle, #c7d2fe 0%, transparent 70%)', top: '10%', left: '-10%' }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.35] blur-[100px] animate-float-slower"
          style={{ background: 'radial-gradient(circle, #bfdbfe 0%, transparent 70%)', top: '50%', right: '-5%' }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.3] blur-[80px] animate-float-slow"
          style={{ background: 'radial-gradient(circle, #e0e7ff 0%, transparent 70%)', bottom: '20%', left: '30%' }}
        />
      </div>

      {/* 1) HERO */}
      <header
        ref={heroRef}
        className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-24 overflow-hidden"
        aria-labelledby="about-heading"
      >
        {/* Banner background layer: image + overlay */}
        <div
          className="absolute inset-0 z-0 min-h-full w-full bg-slate-800 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${ABOUT_BANNER})` }}
        />
        <div
          className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900/50 via-slate-800/35 to-slate-50/98"
          aria-hidden
        />
        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.h1
            id="about-heading"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6"
            variants={itemFade}
            style={{ letterSpacing: '-0.03em', lineHeight: 1.05, textShadow: '0 2px 20px rgba(0,0,0,0.25)' }}
          >
            {t('nav_about')}
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-white/90 font-medium mb-12 max-w-2xl mx-auto"
            variants={itemFade}
          >
            {t('about_hero_subtitle')}
          </motion.p>
          <motion.a
            href="#intro"
            className="inline-flex items-center justify-center px-10 py-4 rounded-2xl font-bold text-lg bg-white text-slate-900 hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl"
            variants={itemFade}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('btn_learn_more')}
          </motion.a>
        </motion.div>
      </header>

      {/* 2) COMPANY INTRODUCTION — two columns */}
      <section
        ref={introRef}
        id="intro"
        className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-24"
        aria-labelledby="intro-heading"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            id="intro-heading"
            className="text-3xl md:text-4xl font-black text-slate-900 mb-16 text-center md:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {t('about_section_intro')}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              className="space-y-8"
              initial="hidden"
              animate={introInView ? 'visible' : 'hidden'}
              variants={container}
            >
              <motion.p className="text-lg text-slate-700 leading-relaxed" variants={itemSlideLeft} style={{ lineHeight: 1.8 }}>
                {t('about_intro_para1')}
              </motion.p>
              <motion.p className="text-lg text-slate-600 leading-relaxed" variants={itemSlideLeft} style={{ lineHeight: 1.8 }}>
                {t('about_intro_para2')}
              </motion.p>
            </motion.div>
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80"
              initial={{ opacity: 0, x: 60 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={INTRO_IMG}
                alt=""
                className="w-full h-[320px] md:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3) MISSION & POSITIONING — 3 cards */}
      <section
        ref={missionRef}
        className="py-24 px-4 sm:px-6 lg:px-8"
        aria-labelledby="mission-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="group relative rounded-2xl p-8 md:p-10 bg-white border border-slate-200/80 shadow-lg shadow-slate-200/50"
                initial={{ opacity: 0, y: 40 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (i - 1) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  y: -8,
                  borderColor: 'rgba(99,102,241,0.3)',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.08), 0 0 0 1px rgba(99,102,241,0.15)',
                }}
              >
                <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-6 text-indigo-600 group-hover:bg-indigo-200/80 transition-colors">
                  {i === 1 && (
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {i === 3 && (
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5v-1.565M12 12.99V15a2 2 0 002 2 2 2 0 002-2v-.99" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t(`about_mission_${i}_title`)}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t(`about_mission_${i}_text`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4) MANAGEMENT TEAM */}
      <section
        ref={teamRef}
        id="team"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-24"
        aria-labelledby="team-heading"
      >
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 rounded-3xl bg-white border border-slate-200/80 shadow-xl overflow-hidden" />
          <motion.div
            className="relative z-10 p-12 md:p-16"
            initial={{ opacity: 0, y: 40 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 id="team-heading" className="text-3xl md:text-4xl font-black text-slate-900 mb-4 text-center">
              {t('sub_team')}
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('about_team_intro')}
            </p>
            <p className="text-slate-700 text-lg text-center max-w-2xl mx-auto leading-relaxed" style={{ lineHeight: 1.85 }}>
              {t('about_team_body')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5) TRUST & STRENGTH — 4 blocks */}
      <section
        ref={trustRef}
        className="py-24 px-4 sm:px-6 lg:px-8"
        aria-labelledby="trust-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="rounded-2xl p-8 bg-white border border-slate-200/80 shadow-md hover:shadow-lg hover:border-slate-300/80 transition-all duration-300"
                initial={{ opacity: 0, y: 32 }}
                animate={trustInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (i - 1) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-5">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{t(`about_trust_${i}_title`)}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t(`about_trust_${i}_desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6) CONTACT US */}
      <section
        ref={contactRef}
        id="contact"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-24"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="p-10 md:p-16">
              <div className="text-center mb-14">
                <h2 id="contact-heading" className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                  {t('sub_contact')}
                </h2>
                <p className="text-slate-600 text-lg max-w-xl mx-auto">
                  {t('about_contact_tagline')}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left: contact info */}
                <div className="space-y-8">
                  {[
                    { label: t('about_location'), value: 'Central, Hong Kong SAR', icon: 'location' },
                    { label: t('about_phone'), value: '+852 2345 6789', icon: 'phone' },
                    { label: t('about_email'), value: 'info@scoin-hk.com', icon: 'email' },
                  ].map((item) => (
                    <div key={item.icon} className="flex items-start gap-4">
                      <span className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        {item.icon === 'location' && (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                        {item.icon === 'phone' && (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        )}
                        {item.icon === 'email' && (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-lg font-semibold text-slate-900">{item.value}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-4 pt-4">
                    <motion.a
                      href="#"
                      className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t('btn_partner_portal')}
                    </motion.a>
                    <motion.a
                      href="mailto:info@scoin-hk.com"
                      className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold border-2 border-slate-300 text-slate-700 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t('btn_email_us')}
                    </motion.a>
                  </div>
                </div>

                {/* Right: form */}
                <div>
                  {formSubmitted ? (
                    <motion.div
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p className="text-lg text-slate-700 leading-relaxed">{t('about_form_success')}</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="about-name" className="block text-sm font-bold text-slate-600 uppercase tracking-wider mb-2">
                          {t('form_name')} *
                        </label>
                        <input
                          id="about-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder={t('form_name')}
                        />
                      </div>
                      <div>
                        <label htmlFor="about-email" className="block text-sm font-bold text-slate-600 uppercase tracking-wider mb-2">
                          {t('form_email')} *
                        </label>
                        <input
                          id="about-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder={t('form_email')}
                        />
                      </div>
                      <div>
                        <label htmlFor="about-subject" className="block text-sm font-bold text-slate-600 uppercase tracking-wider mb-2">
                          {t('form_subject')}
                        </label>
                        <select
                          id="about-subject"
                          value={formData.subject}
                          onChange={(e) => setFormData((d) => ({ ...d, subject: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="Business">{t('about_subject_business')}</option>
                          <option value="Media">{t('about_subject_media')}</option>
                          <option value="Other">{t('about_subject_other')}</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="about-message" className="block text-sm font-bold text-slate-600 uppercase tracking-wider mb-2">
                          {t('form_message')} *
                        </label>
                        <textarea
                          id="about-message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                          placeholder={t('form_message')}
                        />
                      </div>
                      <motion.button
                        type="submit"
                        className="w-full py-4 rounded-xl font-bold text-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md"
                        whileHover={{ boxShadow: '0 4px 20px rgba(79,70,229,0.4)' }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {t('form_submit')}
                      </motion.button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global styles for floating animation */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -15px) scale(1.05); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 20px) scale(1.03); }
        }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 18s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default About;
