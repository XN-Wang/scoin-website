
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations/index';

interface SupportProps { lang: Language; }

const Support: React.FC<SupportProps> = ({ lang }) => {
  const t = (key: string) => translations[key][lang];
  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState('');

  const generateComplaintId = () => {
    return 'SC-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    const id = generateComplaintId();
    setComplaintId(id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-24 bg-white min-h-screen text-center px-4">
        <div className="max-w-xl mx-auto p-12 bg-emerald-50 border border-emerald-100 rounded-[3rem] animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4">{t('form_success_title')}</h1>
          <div className="bg-white py-4 px-6 rounded-2xl shadow-sm border border-emerald-200 inline-block mb-8">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block mb-1">{t('form_success_id')}</span>
            <span className="text-2xl font-black text-scoin-primary font-mono">{complaintId}</span>
          </div>
          <p className="text-slate-600 text-lg mb-8">{t('form_success_desc')}</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
          >
            {lang === 'EN' ? 'Back to Support' : '返回支持頁面'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-scoin-dark mb-16 tracking-tight text-center">{t('nav_support')}</h1>

        {/* FAQ Section */}
        <section className="mb-24 scroll-mt-24" id="faq">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('support_faq_title')}</h2>
            <div className="w-16 h-1 bg-scoin-primary mx-auto rounded-full mb-8"></div>
          </div>
          <div className="p-12 bg-slate-50 border border-slate-100 rounded-3xl text-center">
            <p className="text-lg text-slate-400 font-medium italic">{t('support_faq_coming_soon')}</p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="scroll-mt-24" id="complaints">
          <div className="bg-white p-8 md:p-16 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('sub_complaints')}</h2>
              <p className="text-slate-500 leading-relaxed max-w-2xl mx-auto">
                {t('support_complaints_desc')}
              </p>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1 tracking-wide uppercase">
                  {t('form_name')} <span className="text-rose-500">*</span>
                </label>
                <input required type="text" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-scoin-primary transition-all bg-slate-50/50" placeholder={lang === 'EN' ? "Full Name" : "請輸入姓名"} />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1 tracking-wide uppercase">
                  {t('form_phone')} <span className="text-rose-500">*</span>
                </label>
                <input required type="tel" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-scoin-primary transition-all bg-slate-50/50" placeholder="+852" />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 ml-1 tracking-wide uppercase">
                  {t('form_account_email')} <span className="text-rose-500">*</span>
                </label>
                <input required type="email" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-scoin-primary transition-all bg-slate-50/50" placeholder="account@company.com" />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 ml-1 tracking-wide uppercase">
                  {t('form_type')} <span className="text-rose-500">*</span>
                </label>
                <select required className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-scoin-primary transition-all bg-slate-50/50 appearance-none cursor-pointer">
                   <option value="">{lang === 'EN' ? '-- Select Type --' : '-- 請選擇投訴類型 --'}</option>
                   <option value="quality">{t('form_type_1')}</option>
                   <option value="product">{t('form_type_2')}</option>
                   <option value="behavior">{t('form_type_3')}</option>
                   <option value="other">{t('form_type_4')}</option>
                </select>
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 ml-1 tracking-wide uppercase">
                  {t('form_details')} <span className="text-rose-500">*</span>
                </label>
                <textarea required maxLength={500} rows={5} className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-scoin-primary transition-all bg-slate-50/50 resize-none" placeholder={lang === 'EN' ? "Max 500 characters..." : "請輸入詳情，500字以內..."}></textarea>
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 ml-1 tracking-wide uppercase">{t('form_attachment')}</label>
                <div className="group relative mt-1 flex justify-center px-8 pt-8 pb-8 border-2 border-slate-300 border-dashed rounded-3xl bg-slate-50/30 hover:bg-slate-50 hover:border-scoin-primary transition-all cursor-pointer">
                  <div className="space-y-2 text-center">
                    <div className="mx-auto h-12 w-12 text-slate-300 group-hover:text-scoin-primary transition-colors">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </div>
                    <div className="flex text-base font-bold text-slate-600">
                      <span className="text-scoin-primary">Upload file</span>
                      <p className="pl-1">or drag and drop</p>
                      <input type="file" accept="image/*,.pdf" className="sr-only" />
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Image or PDF, max 5MB</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 mt-6">
                <button type="submit" className="w-full bg-scoin-dark text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl active:scale-[0.98]">
                   {t('form_submit')}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Support;
