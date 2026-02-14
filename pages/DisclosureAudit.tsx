
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations/index';

interface Props { lang: Language; }

const DisclosureAudit: React.FC<Props> = ({ lang }) => {
  const t = (key: string) => translations[key]?.[lang] || key;
  const [currency, setCurrency] = useState<'HK' | 'US'>('HK');

  const auditReports = [
    { title: '2024 Q4 Attestation Report', date: '2025-01-15', size: '2.4 MB' },
    { title: '2024 Q3 Attestation Report', date: '2024-10-12', size: '2.1 MB' },
    { title: '2024 Q2 Attestation Report', date: '2024-07-08', size: '2.5 MB' },
    { title: '2023 Annual Security Audit', date: '2024-03-30', size: '4.8 MB' },
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-scoin-dark tracking-tight">{t('sub_audit')}</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Independent, third-party attestation reports for your peace of mind.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center mb-12">
            <div className="flex bg-slate-100 p-1 rounded-xl">
               <button onClick={() => setCurrency('HK')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${currency === 'HK' ? 'bg-white shadow-sm text-scoin-primary' : 'text-slate-500 hover:text-slate-800'}`}>Scoin-HK</button>
               <button onClick={() => setCurrency('US')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${currency === 'US' ? 'bg-white shadow-sm text-scoin-primary' : 'text-slate-500 hover:text-slate-800'}`}>Scoin-US</button>
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
                    <h4 className="font-bold text-slate-900">{currency}-{report.title}</h4>
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
      </div>
    </div>
  );
};

export default DisclosureAudit;
