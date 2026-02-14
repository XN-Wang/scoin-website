import React, { useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations/index';
import AnimatedCounter from '../components/AnimatedCounter';

interface Props { lang: Language; }

// --- USD 专题视觉组件 ---
const USDVisual: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] lg:h-[650px] flex items-center justify-center">
      {/* 3D Floating Circles */}
      <div className="absolute w-[400px] h-[400px] border border-blue-500/10 rounded-full animate-spin-slow"></div>
      <div className="absolute w-[500px] h-[500px] border border-indigo-500/5 rounded-full animate-spin-slow-reverse"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] animate-pulse"></div>

      {/* Main 3D Coin Asset (Simulated with layered images) */}
      <div className="relative z-10 animate-coin-us">
        <img 
          src="images/uscoin.png" 
          alt="Scoin US 3D" 
          className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.4)]" 
        />
        {/* Glassmorphism Badge */}
        <div className="absolute -bottom-6 -right-12 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Reserve Status</div>
            <div className="text-white font-bold text-sm">100% Fully Backed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScoinUS: React.FC<Props> = ({ lang }) => {
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
    <div className="bg-white min-h-screen selection:bg-indigo-100 selection:text-indigo-600">
      
      {/* SECTION 1 — Hero */}
      <section className="relative min-h-screen flex items-center bg-[#000B26] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <div className="grid lg:grid-cols-2 items-center gap-12">
            <div className="stagger-in space-y-10">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] backdrop-blur-md">
                Institutional USD Liquidity
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight">
                A fully backed <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">digital dollar.</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-400 font-medium leading-relaxed max-w-xl">
                {lang === 'EN' 
                  ? 'Scoin-US (SUS) is the standard for institutional-grade USD stablecoins, strictly pegged 1:1 and fully backed by liquid reserves.' 
                  : 'Scoin-US (SUS) 是機構級美元穩定幣的標準，嚴格 1:1 掛鈎，並由高流動性儲備全額支持。'}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-indigo-600 text-white px-8 py-5 rounded-2xl font-black text-lg hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 active:scale-95">
                  {t('shk_cta_reserves')}
                </button>
                <button className="bg-white/5 border border-white/10 text-white px-8 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all backdrop-blur-md active:scale-95">
                  {t('hero_btn_partner')}
                </button>
              </div>
            </div>
            <USDVisual />
          </div>
        </div>
      </section>

      {/* SECTION 2 — Product Overview */}
      <section className="py-32 bg-white reveal-item">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {lang === 'EN' ? 'Built for the modern global economy' : '為現代全球經濟而建'}
              </h2>
              <div className="w-20 h-2 bg-indigo-600 rounded-full"></div>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                {t('sus_ov_desc')}
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                {lang === 'EN' 
                  ? 'Together with Scoin-HK, SUS forms a powerful dual-currency ecosystem, enabling seamless capital movement between major financial hubs.' 
                  : 'SUS 與 Scoin-HK 共同構成強大的雙幣生態系統，實現主要金融中心之間無縫的資金流動。'}
              </p>
            </div>
            <div className="aspect-video bg-slate-50 rounded-[3rem] p-12 border border-slate-100 flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="text-8xl font-black text-indigo-100 italic tracking-tighter group-hover:scale-110 transition-transform duration-700">SUS</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Why Choose SUS (4 Cards) */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
             <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{t('sus_features')}</h2>
             <p className="text-slate-500 text-lg max-w-2xl mx-auto">Regulated. Transparent. Globally Accessible.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: t('sus_f1_t'), d: t('sus_f1_d'), icon: '🛡️' },
              { t: t('sus_f2_t'), d: t('sus_f2_d'), icon: '⚡' },
              { t: t('sus_f3_t'), d: t('sus_f3_d'), icon: '🌐' },
              { t: lang === 'EN' ? 'Developer Friendly' : '開發者友好', d: lang === 'EN' ? 'Full API & smart contract integration' : '完整的 API 與智能合約集成', icon: '💻' }
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
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Trust through <br />total transparency.</h2>
                <p className="text-xl text-slate-500 leading-relaxed">
                   Every Scoin-US in circulation is backed by at least the equivalent value of US dollar-denominated assets held in segregated accounts at regulated financial institutions.
                </p>
                <button className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
                   {t('shk_cta_reserves')}
                </button>
             </div>
             <div className="space-y-16">
                <div className="reveal-item">
                   <AnimatedCounter end={382.9} decimals={1} prefix="$" suffix="M" labelSuffix="Total Circulation" />
                </div>
                <div className="reveal-item" style={{ transitionDelay: '0.2s' }}>
                   <AnimatedCounter end={385.7} decimals={1} prefix="$" suffix="M" labelSuffix="Total Reserve Assets" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Multi-chain Support (With Interactive Logos) */}
      <section className="py-32 bg-slate-900 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-12">
                  <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">Native interoperability.</h2>
                  <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                     Available natively on the world's most liquid networks for instant, low-cost global settlement.
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
               <div className="reveal-item p-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[3.5rem] shadow-2xl">
                  <div className="bg-slate-950 p-12 rounded-[3.4rem] space-y-10">
                     <div className="space-y-4">
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">SUS Contract Address</div>
                        <code className="text-indigo-400 font-mono text-lg block bg-slate-900/50 p-4 rounded-xl border border-slate-800 break-all">
                           0x3c8...e921b021a0219c82b091a0219c11
                        </code>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04kM12 21.48l.342-.057A11.955 11.955 0 014.016 12.035L12 21.48z"></path></svg>
                        </div>
                        <span className="text-sm font-bold text-slate-300">Audited by Tier-1 Security Firms</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 7 — Start Now CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-2 gap-8">
              <div className="reveal-item p-12 bg-slate-50 rounded-[3rem] border border-slate-100 group cursor-pointer hover:border-indigo-500 transition-all">
                 <h3 className="text-3xl font-black text-slate-900 mb-6">For Institutions</h3>
                 <p className="text-slate-500 text-lg mb-10 leading-relaxed">Access the world's most stable digital currency for treasury and cross-border operations.</p>
                 <button className="text-indigo-600 font-black text-lg flex items-center group-hover:translate-x-2 transition-transform">
                   Become a Partner <span className="ml-2">→</span>
                 </button>
              </div>
              <div className="reveal-item p-12 bg-[#001D4A] rounded-[3rem] text-white group cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/20 transition-all" style={{ transitionDelay: '0.1s' }}>
                 <h3 className="text-3xl font-black mb-6">For Developers</h3>
                 <p className="text-slate-400 text-lg mb-10 leading-relaxed">Integrate Scoin-US into your application with our robust APIs and SDKs.</p>
                 <button className="text-white font-black text-lg flex items-center group-hover:translate-x-2 transition-transform">
                   Read Documentation <span className="ml-2">→</span>
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* SECTION 8 — FAQ */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-black text-slate-900 mb-16 text-center tracking-tight">Questions & Answers</h2>
          <div className="space-y-6">
            {[
              { q: 'What makes Scoin-US different?', a: 'Scoin-US is the only USD stablecoin issued by a Hong Kong licensed entity, providing a unique bridge between Asian regulation and global liquidity.' },
              { q: 'How do I mint Scoin-US?', a: 'Institutional clients can mint SUS via our partner portal by depositing USD through traditional bank wires.' },
              { q: 'Is SUS audited?', a: 'Yes, our reserves are attested monthly by a top-tier independent accounting firm to ensure 100% backing.' }
            ].map((faq, i) => (
              <div key={i} className="reveal-item bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="text-lg font-bold text-slate-900 mb-4">{faq.q}</h4>
                <p className="text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ScoinUS;
