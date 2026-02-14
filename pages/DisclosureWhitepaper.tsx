
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations/index';

interface Props { lang: Language; }

const DisclosureWhitepaper: React.FC<Props> = ({ lang }) => {
  const t = (key: string) => translations[key]?.[lang] || key;

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-scoin-dark tracking-tight">{t('sub_whitepaper')}</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Foundational documents defining our protocol, governance, and compliance framework.</p>
        </div>

        <div className="max-w-5xl mx-auto space-y-16">
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
      </div>
    </div>
  );
};

export default DisclosureWhitepaper;
