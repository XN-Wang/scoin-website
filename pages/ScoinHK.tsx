import React, { useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations/index';
import AnimatedCounter from '../components/AnimatedCounter';

interface Props { lang: Language; }

const PegVisual: React.FC = () => {
  return (
    <div className="relative w-full h-[550px] lg:h-[700px] flex items-center justify-center">
      <div className="absolute top-[10%] left-[5%] w-[320px] md:w-[420px] aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 z-0">
        <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Hong Kong Skyline" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001D4A]/60 to-transparent"></div>
        <div className="absolute top-[20%] -right-10 md:-right-20 w-[240px] md:w-[280px] p-5 md:p-6 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-float-us">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg className="text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
              </div>
            </div>
            <div className="flex-grow">
              <div className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-0.5">HKD → Scoin</div>
              <div className="text-white text-xs font-medium opacity-60">Peg conversion complete</div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-sm">$150,000</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[10%] right-[5%] w-[320px] md:w-[420px] aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 z-10">
        <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Professional Institutional Scene" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001D4A]/60 to-transparent"></div>
        <div className="absolute -bottom-8 -left-10 md:-left-20 w-[240px] md:w-[320px] p-6 md:p-8 bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] animate-float-hk">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
              <span className="text-white font-black text-xl italic tracking-tighter">S$</span>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span>
                Verified
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Asset Value</div>
                <div className="text-2xl font-bold text-white tracking-tight">1.00 <span className="text-sm opacity-50 font-normal">HKD</span></div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Status</div>
                <div className="text-blue-400 text-sm font-bold">1:1 Fixed</div>
              </div>
            </div>
            <div className="h-1 bg-white/10 rounded-full w-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[100%]"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-blue-400 rounded-full blur-md animate-pulse opacity-50"></div>
      <div className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-indigo-500 rounded-full blur-lg animate-bounce opacity-30"></div>
    </div>
  );
};

const ScoinHK: React.FC<Props> = ({ lang }) => {
  const t = (key: string) => translations[key]?.[lang] || key;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const networks = [
    { name: 'Ethereum', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=035', glow: 'group-hover:drop-shadow-[0_0_15px_rgba(98,126,234,0.6)]' },
    { name: 'Solana', logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=035', glow: 'group-hover:drop-shadow-[0_0_15px_rgba(20,241,149,0.6)]' },
    { name: 'Polygon', logo: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=035', glow: 'group-hover:drop-shadow-[0_0_15px_rgba(130,71,229,0.6)]' },
    { name: 'Arbitrum', logo: 'https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=035', glow: 'group-hover:drop-shadow-[0_0_15px_rgba(40,160,240,0.6)]' },
  ];

  return (
    <div className="bg-white min-h-screen selection:bg-blue-100 selection:text-blue-700">
      {/* SECTION 1 — Hero: 70% gradient glass (no banner background) */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-50">
        <div className="hero-glass-70 z-0" aria-hidden />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <div className="grid lg:grid-cols-2 items-center gap-16">
            <div className="stagger-in flex flex-col space-y-10">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.3em] backdrop-blur-md">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></span>
                Institutional Infrastructure
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight">
                <span className="hero-gradient-text">{t('shk_hero_title')}</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-200 font-medium leading-relaxed max-w-xl">
                {t('shk_hero_subtitle')}
              </p>
              <p className="text-base md:text-lg text-slate-300/90 leading-relaxed max-w-xl">
                {t('shk_hero_desc')}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-[#0070F3] text-white px-8 py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/30 active:scale-95">
                  {t('shk_cta_reserves')}
                </button>
                <button className="bg-white/10 border border-white/20 text-white px-8 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all backdrop-blur-md active:scale-95">
                  {t('shk_cta_partner')}
                </button>
              </div>
            </div>
            <div className="w-full">
              <PegVisual />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Product Overview */}
      <section className="py-32 bg-white reveal-item">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {t('shk_ov_title')}
              </h2>
              <div className="w-20 h-2 bg-[#0070F3] rounded-full"></div>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                {t('shk_ov_p1')}
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                {t('shk_ov_p2')}
              </p>
            </div>
            <div className="aspect-video bg-slate-50 rounded-[3rem] p-12 border border-slate-100 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-8xl font-black text-blue-100 italic tracking-tighter group-hover:scale-110 transition-transform duration-700">SHK</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Why Choose Scoin-HK (4 Cards) */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{t('shk_features_title')}</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t('shk_features_sub')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: t('shk_f1_t'), d: t('shk_f1_d'), icon: '🛡️' },
              { t: t('shk_f2_t'), d: t('shk_f2_d'), icon: '⚡' },
              { t: t('shk_f3_t'), d: t('shk_f3_d'), icon: '🌐' },
              { t: t('shk_f4_t'), d: t('shk_f4_d'), icon: '💻' },
            ].map((f, i) => (
              <div key={i} className="reveal-item bg-white p-10 rounded-3xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all group">
                <div className="text-4xl mb-8 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{f.t}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Reserves & Transparency */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                {t('shk_reserves_title')}
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed">
                {t('shk_reserves_desc')}
              </p>
              <button className="px-10 py-5 bg-[#0070F3] text-white rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20">
                {t('shk_cta_reserves')}
              </button>
            </div>
            <div className="space-y-16">
              <div className="reveal-item">
                <AnimatedCounter end={248.6} decimals={1} prefix="HK$" suffix="M" labelSuffix={lang === 'EN' ? 'Total Circulation' : '總流通量'} />
              </div>
              <div className="reveal-item" style={{ transitionDelay: '0.2s' }}>
                <AnimatedCounter end={250.1} decimals={1} prefix="HK$" suffix="M" labelSuffix={lang === 'EN' ? 'Total Reserve Assets' : '儲備資產總額'} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Multi-chain Support */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">{t('shk_multi_title')}</h2>
              <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                {t('shk_multi_desc')}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {networks.map(n => (
                  <div key={n.name} className="flex flex-col items-center gap-4 group cursor-pointer">
                    <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center p-5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500 relative">
                      <img
                        src={n.logo}
                        alt={n.name}
                        className={`w-full h-full object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ${n.glow}`}
                      />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-blue-400 transition-colors duration-500">{n.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-item p-1 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[3.5rem] shadow-2xl">
              <div className="bg-slate-950 p-12 rounded-[3.4rem] space-y-10">
                <div className="space-y-4">
                  <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{lang === 'EN' ? 'SHK Contract Address' : 'SHK 合約地址'}</div>
                  <code className="text-blue-400 font-mono text-lg block bg-slate-900/50 p-4 rounded-xl border border-slate-800 break-all">
                    0x821...f9103c82
                  </code>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A11.955 11.955 0 012 12c0 5.523 4.477 10 10 10s10-4.477 10-10a11.955 11.955 0 00-1.382-5.618M12 21.48l.342-.057A11.955 11.955 0 014.016 12.035L12 21.48z" /></svg>
                  </div>
                  <span className="text-sm font-bold text-slate-300">{lang === 'EN' ? 'Audited by Tier-1 Security Firms' : '經一線安全機構審計'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Start Now CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="reveal-item p-12 bg-slate-50 rounded-[3rem] border border-slate-100 group cursor-pointer hover:border-blue-500 transition-all">
              <h3 className="text-3xl font-black text-slate-900 mb-6">{t('shk_cta_institutions')}</h3>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed">{t('shk_cta_institutions_desc')}</p>
              <button className="text-[#0070F3] font-black text-lg flex items-center group-hover:translate-x-2 transition-transform">
                {t('shk_cta_partner')} <span className="ml-2">→</span>
              </button>
            </div>
            <div className="reveal-item p-12 bg-[#001D4A] rounded-[3rem] text-white group cursor-pointer hover:shadow-2xl hover:shadow-blue-500/20 transition-all" style={{ transitionDelay: '0.1s' }}>
              <h3 className="text-3xl font-black mb-6">{t('shk_cta_developers')}</h3>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">{t('shk_cta_developers_desc')}</p>
              <button className="text-white font-black text-lg flex items-center group-hover:translate-x-2 transition-transform">
                {t('btn_learn_more')} <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FAQ */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-black text-slate-900 mb-16 text-center tracking-tight">{t('shk_faq_title')}</h2>
          <div className="space-y-6">
            {[
              { q: t('shk_faq_1_q'), a: t('shk_faq_1_a') },
              { q: t('shk_faq_2_q'), a: t('shk_faq_2_a') },
              { q: t('shk_faq_3_q'), a: t('shk_faq_3_a') },
            ].map((faq, i) => (
              <div key={i} className="reveal-item bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="text-lg font-bold text-slate-900 mb-4">{faq.q}</h4>
                <p className="text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — Footer CTA */}
      <section className="py-32 bg-white text-center px-4">
        <div className="max-w-2xl mx-auto space-y-10 reveal-item">
          <div className="text-scoin-primary font-black tracking-[0.3em] text-xs uppercase">{lang === 'EN' ? 'Contact Sales' : '聯繫銷售'}</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            {lang === 'EN' ? 'Secure your financial future with digital HKD.' : '以數字港元守護您的財富未來。'}
          </h2>
          <button className="px-12 py-6 bg-scoin-dark text-white rounded-2xl font-black text-xl hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 active:scale-95">{t('btn_contact')}</button>
        </div>
      </section>
    </div>
  );
};

export default ScoinHK;
