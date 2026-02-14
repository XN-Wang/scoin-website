
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations/index';

interface DisclosureProps { lang: Language; }

type TabType = 'reserves' | 'circulation' | 'audit' | 'whitepaper';
type CurrencyType = 'HK' | 'US';

const Disclosure: React.FC<DisclosureProps> = ({ lang }) => {
  const t = (key: string) => translations[key]?.[lang] || key;
  const [activeTab, setActiveTab] = useState<TabType>('reserves');
  const [activeCurrency, setActiveCurrency] = useState<CurrencyType>('HK');

  // Handle Initial Load and Hash Changes
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace('#', '') as TabType;
      const validTabs: TabType[] = ['reserves', 'circulation', 'audit', 'whitepaper'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  const lastUpdated = "2024-12-31 24:00";

  // Mock Data
  const data = {
    HK: {
      totalIssued: "HK$ 1,250,000,000",
      totalReserves: "HK$ 1,250,450,000",
      inCirculation: "HK$ 1,248,120,000",
      change7d: "+HK$ 12,000,000",
      change30d: "+HK$ 85,400,000",
      composition: [
        { label: t('disc_comp_cash'), value: 92, color: 'bg-scoin-primary' },
        { label: t('disc_comp_assets'), value: 8, color: 'bg-indigo-300' }
      ]
    },
    US: {
      totalIssued: "$ 850,000,000",
      totalReserves: "$ 850,120,000",
      inCirculation: "$ 845,900,000",
      change7d: "+$ 4,500,000",
      change30d: "+$ 22,100,000",
      composition: [
        { label: t('disc_comp_cash'), value: 85, color: 'bg-scoin-primary' },
        { label: t('disc_comp_assets'), value: 15, color: 'bg-indigo-300' }
      ]
    }
  };

  const auditReports = [
    { title: '2024 Q4 Attestation Report', date: '2025-01-15', size: '2.4 MB' },
    { title: '2024 Q3 Attestation Report', date: '2024-10-12', size: '2.1 MB' },
    { title: '2024 Q2 Attestation Report', date: '2024-07-08', size: '2.5 MB' },
    { title: '2023 Annual Security Audit', date: '2024-03-30', size: '4.8 MB' },
  ];

  const renderReserves = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500" id="reserves">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <p className="text-sm text-slate-400 font-medium mb-1">{t('disc_last_updated')} {lastUpdated}</p>
          <h3 className="text-2xl font-bold text-slate-900">{t('disc_tab_reserves')}</h3>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
           <button onClick={() => setActiveCurrency('HK')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeCurrency === 'HK' ? 'bg-white shadow-sm text-scoin-primary' : 'text-slate-500 hover:text-slate-800'}`}>Scoin-HK</button>
           <button onClick={() => setActiveCurrency('US')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeCurrency === 'US' ? 'bg-white shadow-sm text-scoin-primary' : 'text-slate-500 hover:text-slate-800'}`}>Scoin-US</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('disc_total_issued')}</p>
          <div className="text-3xl font-black text-slate-900">{data[activeCurrency].totalIssued}</div>
        </div>
        <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('disc_total_reserves')}</p>
          <div className="text-3xl font-black text-scoin-primary">{data[activeCurrency].totalReserves}</div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-100 p-10 rounded-[2.5rem]">
         <h4 className="text-lg font-bold text-slate-900 mb-8">{t('disc_composition')}</h4>
         <div className="space-y-10">
            <div className="h-6 w-full flex rounded-full overflow-hidden bg-slate-200">
               {data[activeCurrency].composition.map((item, i) => (
                 <div key={i} style={{ width: `${item.value}%` }} className={`${item.color} h-full transition-all duration-1000`} title={`${item.label}: ${item.value}%`}></div>
               ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
               {data[activeCurrency].composition.map((item, i) => (
                 <div key={i} className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <div className="flex-grow">
                       <div className="text-sm font-bold text-slate-800">{item.label}</div>
                       <div className="text-slate-400 text-xs">{item.value}%</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );

  const renderCirculation = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500" id="circulation">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <p className="text-sm text-slate-400 font-medium mb-1">{t('disc_last_updated')} {lastUpdated}</p>
          <h3 className="text-2xl font-bold text-slate-900">{t('disc_tab_circulation')}</h3>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
           <button onClick={() => setActiveCurrency('HK')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeCurrency === 'HK' ? 'bg-white shadow-sm text-scoin-primary' : 'text-slate-500 hover:text-slate-800'}`}>Scoin-HK</button>
           <button onClick={() => setActiveCurrency('US')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeCurrency === 'US' ? 'bg-white shadow-sm text-scoin-primary' : 'text-slate-500 hover:text-slate-800'}`}>Scoin-US</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {[
          { label: t('disc_total_issued'), val: data[activeCurrency].totalIssued },
          { label: t('disc_in_circulation'), val: data[activeCurrency].inCirculation },
          { label: t('disc_7d_change'), val: data[activeCurrency].change7d, positive: true },
          { label: t('disc_30d_change'), val: data[activeCurrency].change30d, positive: true },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{item.label}</p>
            <div className={`text-2xl font-black ${item.positive ? 'text-emerald-500' : 'text-slate-900'}`}>{item.val}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAudit = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500" id="audit">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <h3 className="text-2xl font-bold text-slate-900">{t('disc_reports')}</h3>
        <div className="flex bg-slate-100 p-1 rounded-xl">
           <button onClick={() => setActiveCurrency('HK')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeCurrency === 'HK' ? 'bg-white shadow-sm text-scoin-primary' : 'text-slate-500 hover:text-slate-800'}`}>Scoin-HK</button>
           <button onClick={() => setActiveCurrency('US')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeCurrency === 'US' ? 'bg-white shadow-sm text-scoin-primary' : 'text-slate-500 hover:text-slate-800'}`}>Scoin-US</button>
        </div>
      </div>

      <div className="space-y-4">
        {auditReports.map((report, i) => (
          <div key={i} className="group p-6 border border-slate-100 rounded-2xl bg-white hover:bg-slate-50 hover:border-scoin-primary transition-all flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-scoin-primary flex items-center justify-center">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{activeCurrency}-{report.title}</h4>
                <div className="flex gap-4 mt-1 text-xs text-slate-400 font-medium uppercase tracking-wider">
                  <span>{report.date}</span>
                  <span>•</span>
                  <span>{report.size}</span>
                </div>
              </div>
            </div>
            <button className="text-scoin-primary font-bold text-sm flex items-center group-hover:underline">
              {t('disc_download')}
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWhitepaper = () => (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500" id="whitepaper">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="p-10 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
          </div>
          <div className="relative z-10 space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">Active</div>
            <h3 className="text-3xl font-bold">Scoin-HK Whitepaper</h3>
            <div className="space-y-2 text-slate-400">
              <p className="text-sm">{t('disc_version')}: v1.2.0</p>
              <p className="text-sm">Release: 2024-11-20</p>
            </div>
            <button className="w-full py-4 rounded-2xl bg-scoin-primary text-white font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
              {t('disc_download')} (PDF)
            </button>
          </div>
        </div>

        <div className="p-10 bg-indigo-950 rounded-[2.5rem] text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">
            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
          </div>
          <div className="relative z-10 space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">Active</div>
            <h3 className="text-3xl font-bold">Scoin-US Whitepaper</h3>
            <div className="space-y-2 text-slate-400">
              <p className="text-sm">{t('disc_version')}: v2.1.4</p>
              <p className="text-sm">Release: 2024-12-05</p>
            </div>
            <button className="w-full py-4 rounded-2xl bg-scoin-primary text-white font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
              {t('disc_download')} (PDF)
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h4 className="text-xl font-bold text-slate-900 flex items-center">
          <svg className="w-6 h-6 text-scoin-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
          {t('disc_other_legal')}
        </h4>
        <div className="grid sm:grid-cols-3 gap-6">
          {['User Agreement', 'Privacy Policy', 'Risk Disclosure'].map((name, i) => (
            <div key={i} className="p-8 border border-slate-100 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
              <div className="font-bold text-slate-800 mb-2 group-hover:text-scoin-primary">{name}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Last Updated: Jan 2025</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-scoin-dark tracking-tight">{t('nav_disclosure')}</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Committed to radical transparency and full regulation.</p>
        </div>
        
        {/* Main Tab Bar */}
        <div className="flex flex-wrap justify-center border-b border-slate-100 mb-16 gap-2 md:gap-8">
          {[
            { id: 'reserves', label: t('disc_tab_reserves') },
            { id: 'circulation', label: t('disc_tab_circulation') },
            { id: 'audit', label: t('disc_reports') },
            { id: 'whitepaper', label: t('disc_whitepaper') }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as TabType)}
              className={`px-4 md:px-8 py-5 text-sm md:text-base font-bold transition-all relative border-b-2 ${
                activeTab === tab.id 
                ? 'text-scoin-primary border-scoin-primary' 
                : 'text-slate-400 border-transparent hover:text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          {activeTab === 'reserves' && renderReserves()}
          {activeTab === 'circulation' && renderCirculation()}
          {activeTab === 'audit' && renderAudit()}
          {activeTab === 'whitepaper' && renderWhitepaper()}
        </div>

        <section className="mt-32 p-10 md:p-16 rounded-[3rem] bg-blue-50/50 border border-blue-100 text-center space-y-8">
           <h3 className="text-2xl font-bold text-slate-900">Need real-time verification?</h3>
           <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">Our blockchain attestation engine provides 24/7 transparent snapshots of our reserve wallets.</p>
           <button className="px-10 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-scoin-primary hover:shadow-xl hover:-translate-y-1 transition-all">
             Launch Proof-of-Reserve Dashboard
           </button>
        </section>
      </div>
    </div>
  );
};

export default Disclosure;
