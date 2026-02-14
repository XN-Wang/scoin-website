
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations/index';

interface Props { lang: Language; }

const DisclosureReserves: React.FC<Props> = ({ lang }) => {
  const t = (key: string) => translations[key]?.[lang] || key;
  const [currency, setCurrency] = useState<'HK' | 'US'>('HK');

  const data = {
    HK: {
      totalIssued: "HK$ 1,250,000,000",
      totalReserves: "HK$ 1,250,450,000",
      composition: [
        { label: t('disc_comp_cash'), value: 92, color: 'bg-scoin-primary' },
        { label: t('disc_comp_assets'), value: 8, color: 'bg-indigo-300' }
      ]
    },
    US: {
      totalIssued: "$ 850,000,000",
      totalReserves: "$ 850,120,000",
      composition: [
        { label: t('disc_comp_cash'), value: 85, color: 'bg-scoin-primary' },
        { label: t('disc_comp_assets'), value: 15, color: 'bg-indigo-300' }
      ]
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-scoin-dark tracking-tight">{t('sub_reserves')}</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Committed to radical transparency and institutional-grade reserves.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <p className="text-sm text-slate-400 font-medium">{t('disc_last_updated')} 2024-12-31 24:00</p>
            <div className="flex bg-slate-100 p-1 rounded-xl">
               <button onClick={() => setCurrency('HK')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${currency === 'HK' ? 'bg-white shadow-sm text-scoin-primary' : 'text-slate-500 hover:text-slate-800'}`}>Scoin-HK</button>
               <button onClick={() => setCurrency('US')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${currency === 'US' ? 'bg-white shadow-sm text-scoin-primary' : 'text-slate-500 hover:text-slate-800'}`}>Scoin-US</button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('disc_total_issued')}</p>
              <div className="text-3xl font-black text-slate-900">{data[currency].totalIssued}</div>
            </div>
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('disc_total_reserves')}</p>
              <div className="text-3xl font-black text-scoin-primary">{data[currency].totalReserves}</div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-10 rounded-[2.5rem]">
             <h4 className="text-lg font-bold text-slate-900 mb-8">{t('disc_composition')}</h4>
             <div className="space-y-10">
                <div className="h-6 w-full flex rounded-full overflow-hidden bg-slate-200">
                   {data[currency].composition.map((item, i) => (
                     <div key={i} style={{ width: `${item.value}%` }} className={`${item.color} h-full transition-all duration-1000`} title={`${item.label}: ${item.value}%`}></div>
                   ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                   {data[currency].composition.map((item, i) => (
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
      </div>
    </div>
  );
};

export default DisclosureReserves;
