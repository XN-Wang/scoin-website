
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations/index';

interface FooterProps {
  lang: Language;
  setCurrentPage: (p: string) => void;
}

const Footer: React.FC<FooterProps> = ({ lang, setCurrentPage }) => {
  const t = (key: string) => translations[key]?.[lang] || key;

  const handleNav = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Left-Right Layout: Logo + Contact (left) | Nav Links + Social (right) */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-16 mb-20">
          {/* Left: Logo + Contact */}
          <div className="w-1/3 flex-shrink-0 space-y-8">
            <button onClick={() => handleNav('home')} className="inline-block text-2xl font-bold tracking-tight text-scoin-dark hover:opacity-90 transition-opacity">
              S<span className="text-scoin-primary">COIN</span>
            </button>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('about_location')}</p>
                <p className="text-sm text-slate-600 font-medium">Central, Hong Kong SAR</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('about_phone')}</p>
                <p className="text-sm text-slate-600 font-medium">+852 2345 6789</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('about_email')}</p>
                <p className="text-sm text-slate-600 font-medium">info@scoin-hk.com</p>
              </div>
              <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('footer_social_media')}</p>
              <div className="flex gap-6">
                <a href="#" className="text-slate-400 hover:text-scoin-primary transition-colors" title="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-scoin-primary transition-colors" title="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-scoin-primary transition-colors" title="WeChat">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.22 2.977c-4.542 0-8.223 3.344-8.223 7.471 0 2.235 1.077 4.246 2.785 5.656l-.721 2.149 2.459-1.228c.556.126 1.134.197 1.7.197.354 0 .703-.027 1.045-.078-.168-.432-.26-.893-.26-1.378 0-3.957 3.515-7.164 7.85-7.164.551 0 1.085.052 1.597.152-.61-3.328-4.463-5.777-8.232-5.777zm10.74 7.647c-3.612 0-6.541 2.658-6.541 5.937 0 3.279 2.929 5.937 6.541 5.937.452 0 .891-.042 1.314-.118l1.797.898-.526-1.57c1.365-1.037 2.225-2.531 2.225-4.184.001-3.279-2.928-5.937-6.541-5.937h.001z"/></svg>
                </a>
              </div>
            </div>
            </div>
          </div>

          {/* Right: Navigation Grid (5 columns) + Social */}
          <div className="flex-grow">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-12 mb-12">
              <div>
                <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">{t('nav_products')}</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><button onClick={() => handleNav('scoin-hk')} className="hover:text-scoin-primary transition-colors text-left">{t('sub_scoin_hk')}</button></li>
                  <li><button onClick={() => handleNav('scoin-us')} className="hover:text-scoin-primary transition-colors text-left">{t('sub_scoin_us')}</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">{t('nav_disclosure')}</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><button onClick={() => handleNav('disclosure-reserves')} className="hover:text-scoin-primary transition-colors text-left">{t('sub_reserves')}</button></li>
                  <li><button onClick={() => handleNav('disclosure-circulation')} className="hover:text-scoin-primary transition-colors text-left">{t('sub_circulation')}</button></li>
                  <li><button onClick={() => handleNav('disclosure-audit')} className="hover:text-scoin-primary transition-colors text-left">{t('sub_audit')}</button></li>
                  <li><button onClick={() => handleNav('disclosure-whitepaper')} className="hover:text-scoin-primary transition-colors text-left">{t('sub_whitepaper')}</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">{t('nav_partners')}</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><button onClick={() => handleNav('partners')} className="hover:text-scoin-primary transition-colors text-left">{t('nav_partners')}</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">{t('nav_about')}</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><button onClick={() => handleNav('about')} className="hover:text-scoin-primary transition-colors text-left">{t('sub_intro')}</button></li>
                  <li><button onClick={() => handleNav('about')} className="hover:text-scoin-primary transition-colors text-left">{t('sub_team')}</button></li>
                  <li><button onClick={() => handleNav('about')} className="hover:text-scoin-primary transition-colors text-left">{t('sub_contact')}</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">{t('nav_support')}</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><button onClick={() => handleNav('support')} className="hover:text-scoin-primary transition-colors text-left">{t('sub_faq')}</button></li>
                  <li><button onClick={() => handleNav('support')} className="hover:text-scoin-primary transition-colors text-left">{t('sub_complaints')}</button></li>
                </ul>
              </div>
            </div>
           
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-slate-400 font-medium">
            {t('footer_copy_2026')}
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <button className="text-xs text-slate-400 hover:text-slate-600 transition-colors font-semibold">{t('footer_user_agreement')}</button>
            <button className="text-xs text-slate-400 hover:text-slate-600 transition-colors font-semibold">{t('footer_privacy_policy')}</button>
            <button className="text-xs text-slate-400 hover:text-slate-600 transition-colors font-semibold">{t('footer_risk_warning')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
