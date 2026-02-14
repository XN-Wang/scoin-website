
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../translations/index';

const GROWTH_IMAGES = [
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
];

interface PartnersProps { lang: Language; }

const GrowthSection: React.FC<{ t: (key: string) => string }> = ({ t }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">{t('partner_growth_t')}</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="group overflow-hidden bg-slate-900 rounded-[2.5rem] text-white cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (i - 1) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={GROWTH_IMAGES[i - 1]}
                  alt=""
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <span className="absolute top-4 left-6 text-xs font-black text-blue-400 uppercase tracking-widest">0{i}</span>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300">{t(`partner_growth_${i}_t`)}</h3>
                <p className="text-slate-400 leading-relaxed">{t(`partner_growth_${i}_d`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnerHeroVisual: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[550px] flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]"></div>
      <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-[60px]"></div>
      
      <div className="relative z-10 w-full h-full flex items-center justify-center animate-coin-us">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rotate-45 flex items-center justify-center shadow-2xl overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="text-white text-6xl md:text-8xl font-black italic -rotate-45 tracking-tighter opacity-20">S</div>
        </div>
        
        <div className="absolute top-10 right-10 w-20 h-20 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 backdrop-blur-md rotate-12 animate-float-hk flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-blue-400/40"></div>
        </div>
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm -rotate-6 animate-pulse flex items-center justify-center">
           <div className="w-12 h-1 bg-white/20 rounded-full rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

const Partners: React.FC<PartnersProps> = ({ lang }) => {
  const t = (key: string) => translations[key]?.[lang] || key;
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleApplyScroll = () => {
    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const partnerLogos = [
    { name: 'HSBC', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg' },
    { name: 'Standard Chartered', logo: 'https://upload.wikimedia.org/wikipedia/zh/3/35/Standard_Chartered_Bank_Logo.svg' },
    { name: 'J.P. Morgan', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/af/J._P._Morgan_Logo_2008_1.svg' },
    { name: 'Fireblocks', logo: 'https://cryptologos.cc/logos/fireblocks-logo.png?v=035' },
    { name: 'Polygon', logo: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=035' },
    { name: 'Ethereum', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=035' },
    { name: 'Solana', logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=035' },
    { name: 'Arbitrum', logo: 'https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=035' },
    { name: 'Chainlink', logo: 'https://cryptologos.cc/logos/chainlink-link-logo.svg?v=035' },
    { name: 'Circle', logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=035' },
  ];

  // Split logos for two rows
  const row1 = [...partnerLogos, ...partnerLogos];
  const row2 = [...partnerLogos.reverse(), ...partnerLogos];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 5000);
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* SECTION 1 — Hero */}
      <section className="relative pt-40 pb-24 bg-[#001D4A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 items-center gap-16">
            <div className="stagger-in space-y-10">
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
                {t('partner_hero_t')}
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                {t('partner_hero_s')}
              </p>
              <button 
                onClick={handleApplyScroll}
                className="bg-scoin-primary text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-2xl shadow-blue-500/20 active:scale-95"
              >
                {t('partner_cta_apply')}
              </button>
            </div>
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[400px] overflow-hidden rounded-2xl">
              <img
                src="/images/partner_banner.png"
                alt="Partners"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Infinite Marquee Logo Wall */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
            <div className="reveal-item space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{t('partner_grid_t')}</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t('partner_grid_s')}</p>
            </div>
        </div>

        {/* Removed mask-gradient and maintained pause-on-hover */}
        <div className="space-y-12 pause-on-hover">
          {/* Row 1: Moving Left */}
          <div className="relative flex overflow-hidden">
            <div className="animate-marquee-left" style={{ '--duration': '30s' } as React.CSSProperties}>
              {row1.map((p, idx) => (
                <div key={idx} className="flex items-center justify-center px-12 group cursor-default">
                  <div className="w-32 h-16 md:w-40 md:h-20 flex items-center justify-center transition-all duration-500 hover:scale-110">
                    <img 
                      src={p.logo} 
                      alt={p.name} 
                      className="max-w-full max-h-full object-contain transition-all duration-500" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Moving Right */}
          <div className="relative flex overflow-hidden">
            <div className="animate-marquee-right" style={{ '--duration': '35s' } as React.CSSProperties}>
              {row2.map((p, idx) => (
                <div key={idx} className="flex items-center justify-center px-12 group cursor-default">
                  <div className="w-32 h-16 md:w-40 md:h-20 flex items-center justify-center transition-all duration-500 hover:scale-110">
                    <img 
                      src={p.logo} 
                      alt={p.name} 
                      className="max-w-full max-h-full object-contain transition-all duration-500" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Benefits */}
      <section className="py-32 bg-slate-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 reveal-item">
               <h2 className="text-4xl font-black text-slate-900 tracking-tight">{t('partner_ben_t')}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
               {[1, 2, 3].map(i => (
                  <div key={i} className="reveal-item p-12 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all">
                     <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-scoin-primary text-3xl mb-8">
                        {i === 1 ? '🚀' : i === 2 ? '⚖️' : '🌍'}
                     </div>
                     <h3 className="text-2xl font-black text-slate-900 mb-6">{t(`partner_ben_${i}_t`)}</h3>
                     <p className="text-slate-500 leading-relaxed text-lg">{t(`partner_ben_${i}_d`)}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* SECTION 4 — Growth Vectors */}
      <GrowthSection t={t} />

      {/* SECTION 5 — Application Form */}
      <section className="py-32 bg-slate-50 scroll-mt-24" id="apply-form">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white p-12 md:p-20 rounded-[3.5rem] border border-slate-100 shadow-2xl reveal-item">
            {isSubmitted ? (
              <div className="text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 text-4xl">✓</div>
                <h3 className="text-3xl font-black text-slate-900 mb-6">{t('partner_form_success')}</h3>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-scoin-primary font-bold hover:underline"
                >
                  {lang === 'EN' ? 'Submit another application' : '提交另一份申請'}
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{t('partner_form_t')}</h2>
                  <p className="text-slate-500 font-medium">{t('partner_form_s')}</p>
                </div>
                
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t('partner_form_company')} *</label>
                      <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-scoin-primary transition-all outline-none font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t('partner_form_type')} *</label>
                      <select required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-scoin-primary transition-all outline-none font-medium appearance-none cursor-pointer">
                        <option value="">-- {lang === 'EN' ? 'Select' : '請選擇'} --</option>
                        <option value="1">{t('partner_form_type_1')}</option>
                        <option value="2">{t('partner_form_type_2')}</option>
                        <option value="3">{t('partner_form_type_3')}</option>
                        <option value="4">{t('partner_form_type_4')}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t('partner_form_contact')} *</label>
                      <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-scoin-primary transition-all outline-none font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t('partner_form_email')} *</label>
                      <input required type="email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-scoin-primary transition-all outline-none font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t('partner_form_desc')} *</label>
                    <textarea required rows={4} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-scoin-primary transition-all outline-none font-medium resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-scoin-dark text-white py-6 rounded-2xl font-black text-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                    {t('partner_form_submit')}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
