
import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../translations/index';

interface HomeProps {
  lang: Language;
  setCurrentPage: (p: string) => void;
}

const Counter: React.FC<{ end: number; decimals?: number; duration?: number; suffix?: string }> = ({ end, decimals = 0, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          setCount(easeOut * end);
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.1 });

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={elementRef}>{count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
};

const Home: React.FC<HomeProps> = ({ lang, setCurrentPage }) => {
  const t = (key: string) => translations[key]?.[lang] || key;
  const [activeTab, setActiveTab] = useState<'hk' | 'us'>('hk');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const items = sectionRef.current?.querySelectorAll('.stats-item');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const handleCTA = (id: string) => {
    if (id === 'home#products') {
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentPage(id);
      window.scrollTo(0, 0);
    }
  };

  const productFeatures = {
    hk: [
      { title: t('prod_hk_f1_t'), desc: t('prod_hk_f1_d') },
      { title: t('prod_hk_f2_t'), desc: t('prod_hk_f2_d') },
      { title: t('prod_hk_f3_t'), desc: t('prod_hk_f3_d') },
    ],
    us: [
      { title: t('prod_us_f1_t'), desc: t('prod_us_f1_d') },
      { title: t('prod_us_f2_t'), desc: t('prod_us_f2_d') },
      { title: t('prod_us_f3_t'), desc: t('prod_us_f3_d') },
    ]
  };

  const marketNews = [
    { title: t('news_1_t'), summary: t('news_1_s'), date: '2024-12-28', tag: 'Regulatory' },
    { title: t('news_2_t'), summary: t('news_2_s'), date: '2024-12-25', tag: 'Market' },
    { title: t('news_3_t'), summary: t('news_3_s'), date: '2024-12-20', tag: 'Payments' },
  ];

  const announcements = [
    { title: t('ann_1_t'), date: '2024-12-30' },
    { title: t('ann_2_t'), date: '2024-12-27' },
    { title: t('ann_3_t'), date: '2024-12-24' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-[#001D4A] overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-32 pb-24">
          <div className="grid lg:grid-cols-2 items-center gap-12">
            <div className="stagger-in flex flex-col space-y-8">
              <div>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold backdrop-blur-md">
                  <svg className="w-4 h-4 mr-2 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {t('hero_badge')}
                </span>
              </div>
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                  {t('hero_title_1')}<br />
                  <span className="hero-gradient-text">{t('hero_title_2')}</span>
                </h1>
              </div>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-slate-300 font-medium">{t('hero_subtitle')}</p>
                <p className="text-slate-400 max-w-lg leading-relaxed text-base">{t('hero_desc')}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button onClick={() => handleCTA('partners')} className="bg-white text-scoin-dark px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center group">
                  {t('hero_btn_partner')}
                  <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
                <button onClick={() => handleCTA('home#products')} className="bg-white/5 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">{t('hero_btn_scoin')}</button>
              </div>
              <div className="pt-12 border-t border-white/10 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">{t('hero_stat_1_val')}</div>
                  <div className="text-xs text-slate-400 mt-1">{t('hero_stat_1_label')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">{t('hero_stat_2_val')}</div>
                  <div className="text-xs text-slate-400 mt-1">{t('hero_stat_2_label')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">{t('hero_stat_3_val')}</div>
                  <div className="text-xs text-slate-400 mt-1">{t('hero_stat_3_label')}</div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-end items-center h-[500px] lg:h-[700px] lg:pr-[80px]">
              <div className="relative">
                <div id="Coin_HK" className="w-[150px] h-[150px] md:w-[220px] md:h-[220px] animate-coin-hk relative z-10">
                  <img 
                    src="images/hkcoin.png"
                    alt="Scoin HK Token" 
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]" 
                  />
                </div>
                <div id="Coin_US" className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] animate-coin-us absolute -right-8 -bottom-10 md:-right-12 md:-bottom-12 z-20">
                  <img 
                    src="images/uscoin.png" 
                    alt="Scoin US Token" 
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]" 
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Tab Section */}
      <section className="py-32 bg-white relative z-10" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl">
              <button onClick={() => setActiveTab('hk')} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'hk' ? 'bg-[#0070F3] text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}>Scoin-HK</button>
              <button onClick={() => setActiveTab('us')} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'us' ? 'bg-[#0070F3] text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}>Scoin-US</button>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-500">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">{activeTab === 'hk' ? t('prod_title_hk') : t('prod_title_us')}</h2>
              <div className="space-y-8">
                {productFeatures[activeTab].map((f, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                      <svg className="w-5 h-5 text-[#0070F3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-1">{f.title}</h4>
                      <p className="text-lg text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => activeTab === 'hk' ? setCurrentPage('scoin-hk') : setCurrentPage('scoin-us')}
                className="px-8 py-4 rounded-xl border-2 border-slate-900 font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition-all"
              >
                {t('prod_btn_learn_more')}
              </button>
            </div>
            <div className="relative h-[500px] flex items-center justify-center">
              <div className="absolute w-[400px] h-[280px] bg-slate-900 rounded-[2rem] shadow-2xl transform -translate-x-8 -translate-y-12 rotate-[-2deg] overflow-hidden border border-slate-800 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <div className="space-y-1">
                      <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Network Status</div>
                      <div className="text-emerald-400 font-bold flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>Operational</div>
                   </div>
                   <div className="text-white font-black text-2xl tracking-tighter italic">S$</div>
                </div>
                <div className="space-y-4">
                   <div className="h-1 bg-slate-800 rounded-full w-full"></div>
                   <div className="h-1 bg-slate-800 rounded-full w-2/3"></div>
                   <div className="flex justify-between items-end pt-4">
                      <div className="text-3xl font-bold text-white">$801,920</div>
                      <div className="text-slate-500 text-xs font-mono">HASH: 0x82...f91</div>
                   </div>
                </div>
              </div>
              <div className="absolute w-[420px] h-[300px] bg-white rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transform translate-x-8 translate-y-12 rotate-[2deg] border border-slate-100 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                   <div className="space-y-1">
                      <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Recent Transaction</div>
                      <div className="text-slate-900 font-bold">Scoin-US Deposit</div>
                   </div>
                   <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center"><svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg></div>
                </div>
                <div className="space-y-6">
                   <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl">
                      <div className="w-10 h-10 rounded-full bg-scoin-primary flex items-center justify-center text-white font-bold text-sm">$</div>
                      <div className="flex-grow">
                         <div className="text-sm font-bold text-slate-900">US Dollar</div>
                         <div className="text-xs text-slate-400">Main Account</div>
                      </div>
                      <div className="text-right font-black text-slate-900">$28,750.00</div>
                   </div>
                   <div className="flex justify-center"><div className="px-6 py-2 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100">Verified by Audit</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-scoin-dark mb-4">{t('sec_advantages_title')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group p-4">
              <div className="w-20 h-20 bg-blue-50 text-scoin-primary rounded-3xl flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04kM12 21.48l.342-.057A11.955 11.955 0 014.016 12.035L12 21.48z"></path></svg>
              </div>
              <h4 className="text-xl font-bold mb-4">{t('adv_compliance_title')}</h4>
              <p className="text-slate-500 text-sm leading-relaxed px-4">{t('adv_compliance_desc')}</p>
            </div>
            <div className="text-center group p-4">
              <div className="w-20 h-20 bg-blue-50 text-scoin-primary rounded-3xl flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110 group-hover:-rotate-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h4 className="text-xl font-bold mb-4">{t('adv_reserves_title')}</h4>
              <p className="text-slate-500 text-sm leading-relaxed px-4">{t('adv_reserves_desc')}</p>
            </div>
            <div className="text-center group p-4">
              <div className="w-20 h-20 bg-blue-50 text-scoin-primary rounded-3xl flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h4 className="text-xl font-bold mb-4">{t('adv_service_title')}</h4>
              <p className="text-slate-500 text-sm leading-relaxed px-4">{t('adv_service_desc')}</p>
            </div>
          </div>
        </div>
      </section>

       {/* Stats Section */}
      <section ref={sectionRef} className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-center justify-center">
            <div className="stats-item flex flex-col items-center group">
              <div className="text-6xl md:text-8xl font-light stats-number-gradient tracking-tighter mb-2">
                <Counter end={100} suffix="%" />
              </div>
              <div className="flex items-start">
                <span className="text-slate-600 text-sm font-semibold tracking-wide uppercase">
                  {t('stat_reserve_ratio')}
                </span>
                <sup className="text-indigo-400 ml-1 text-[10px] font-bold">1</sup>
              </div>
            </div>
            <div className="stats-item flex flex-col items-center group" style={{ transitionDelay: '0.1s' }}>
              <div className="text-6xl md:text-8xl font-light stats-number-gradient tracking-tighter mb-2">
                <Counter end={500} suffix="+" />
              </div>
              <div className="flex items-start">
                <span className="text-slate-600 text-sm font-semibold tracking-wide uppercase">
                  {t('stat_holders')}
                </span>
                <sup className="text-indigo-400 ml-1 text-[10px] font-bold">4</sup>
              </div>
            </div>
            <div className="stats-item flex flex-col items-center group" style={{ transitionDelay: '0.2s' }}>
              <div className="text-6xl md:text-8xl font-light stats-number-gradient tracking-tighter mb-2">
                <Counter end={62.7} decimals={1} suffix="T" />
              </div>
              <div className="flex items-start">
                <span className="text-slate-600 text-sm font-semibold tracking-wide uppercase">
                  {lang === 'EN' ? 'All-time volume' : '累計交易額'}
                </span>
                <sup className="text-indigo-400 ml-1 text-[10px] font-bold">8</sup>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Showcase Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
            {t('partner_headline')}
          </h2>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-4 max-w-3xl mx-auto">
            {t('partner_desc')}
          </p>
          <div className="mb-20">
            <button onClick={() => setCurrentPage('partners')} className="text-[#0070F3] font-medium text-lg hover:underline transition-all flex items-center justify-center gap-1">
              {t('partner_link')}
              <sup className="text-indigo-400 text-xs">1</sup>
            </button>
          </div>

          <div className="space-y-16">
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-90">
              <div className="flex items-center gap-2 group cursor-pointer transition-transform hover:scale-105">
                <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                  <div className="w-4 h-0.5 bg-white rotate-45 translate-y-[-1px]"></div>
                  <div className="w-4 h-0.5 bg-white -rotate-45 translate-y-[1px]"></div>
                </div>
                <span className="text-2xl font-bold text-slate-800 tracking-tight">Avenia</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer transition-transform hover:scale-105">
                <div className="w-8 h-8 bg-[#8B1A1A] rounded-lg rotate-45 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full border-2 border-white/20"></div>
                </div>
                <span className="text-2xl font-black text-[#1E293B] uppercase tracking-tighter">BDACS</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer transition-transform hover:scale-105">
                <div className="w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center">
                   <div className="w-3 h-3 bg-slate-900 rounded-full"></div>
                </div>
                <span className="text-2xl font-bold text-slate-900 tracking-tighter">Bitso</span>
              </div>
              <div className="flex items-center gap-1 group cursor-pointer transition-transform hover:scale-105">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">c</div>
                <span className="text-2xl font-medium text-blue-600 tracking-tight">coins.ph</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Insights & Announcements */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            
            {/* Market Insights Column */}
            <div className="lg:col-span-2 space-y-12">
              <div className="flex justify-between items-end border-b border-slate-100 pb-6">
                <h2 className="text-3xl font-bold text-slate-900">{t('sec_market_insights_title')}</h2>
                <button className="text-sm font-bold text-scoin-primary hover:underline flex items-center">
                  {t('btn_view_more')}
                  <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-6">
                {marketNews.map((news, idx) => (
                  <div key={idx} className="group cursor-pointer space-y-4">
                    <div className="aspect-[16/10] bg-slate-100 rounded-2xl overflow-hidden relative">
                      <div className="absolute inset-0 bg-scoin-dark/0 group-hover:bg-scoin-dark/10 transition-colors"></div>
                      <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-black uppercase tracking-widest text-scoin-primary shadow-sm">{news.tag}</div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-900 group-hover:text-scoin-primary transition-colors line-clamp-2 leading-snug">{news.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{news.summary}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pt-2">{news.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements Column */}
            <div className="space-y-12">
              <div className="flex justify-between items-end border-b border-slate-100 pb-6">
                <h2 className="text-3xl font-bold text-slate-900">{t('sec_announcements_title')}</h2>
                <button className="text-sm font-bold text-scoin-primary hover:underline flex items-center">
                  {t('btn_view_more')}
                  <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
              
              <div className="space-y-4">
                {announcements.map((ann, idx) => (
                  <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg hover:border-scoin-primary transition-all cursor-pointer flex justify-between items-center group">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-scoin-primary transition-colors">{ann.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{ann.date}</p>
                    </div>
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-scoin-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
