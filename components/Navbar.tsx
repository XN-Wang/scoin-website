
import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../translations/index';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  currentPage: string;
  setCurrentPage: (p: string) => void;
}

interface NavMenuItem {
  id: string;
  label: string;
  subItems?: { id: string; label: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const t = (key: string) => translations[key]?.[lang] || key;

  const menuStructure: NavMenuItem[] = [
    { 
      id: 'products', 
      label: t('nav_products'),
      subItems: [
        { id: 'scoin-hk', label: t('sub_scoin_hk') },
        { id: 'scoin-us', label: t('sub_scoin_us') }
      ]
    },
    { 
      id: 'disclosure', 
      label: t('nav_disclosure'),
      subItems: [
        { id: 'disclosure-reserves', label: t('sub_reserves') },
        { id: 'disclosure-circulation', label: t('sub_circulation') },
        { id: 'disclosure-audit', label: t('sub_audit') },
        { id: 'disclosure-whitepaper', label: t('sub_whitepaper') }
      ]
    },
    { id: 'partners', label: t('nav_partners') },
    { 
      id: 'about', 
      label: t('nav_about'),
      subItems: [
        { id: 'about#intro', label: t('sub_intro') },
        { id: 'about#team', label: t('sub_team') },
        { id: 'about#contact', label: t('sub_contact') }
      ]
    },
    { 
      id: 'support', 
      label: t('nav_support'),
      subItems: [
        { id: 'support#faq', label: t('sub_faq') },
        { id: 'support#complaints', label: t('sub_complaints') }
      ]
    },
  ];

  const handleNavClick = (id: string) => {
    const [pageId, sectionId] = id.split('#');
    setCurrentPage(pageId);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-standard ${isScrolled ? 'bg-white shadow-sm border-b' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer" 
            onClick={() => handleNavClick('home')}
          >
            <div className={`text-2xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-scoin-dark' : 'text-scoin-dark'}`}>
              S<span className="text-scoin-primary">COIN</span>
            </div>
          </div>

          <div className="hidden md:flex space-x-1 items-center" ref={dropdownRef}>
            {menuStructure.map((item) => (
              <div 
                key={item.id} 
                className="relative group h-20 flex items-center"
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => !item.subItems && handleNavClick(item.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors flex items-center ${
                    currentPage.startsWith(item.id) ? 'text-scoin-primary' : 'text-slate-600 hover:text-scoin-primary'
                  }`}
                >
                  {item.label}
                  {item.subItems && (
                    <svg className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {item.subItems && activeDropdown === item.id && (
                  <div className="absolute top-full left-0 w-56 bg-white border border-slate-100 shadow-xl rounded-xl py-3 animate-in fade-in slide-in-from-top-2">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleNavClick(sub.id)}
                        className={`block w-full text-left px-6 py-2.5 text-sm transition-colors ${
                          currentPage === sub.id ? 'text-scoin-primary bg-slate-50' : 'text-slate-600 hover:text-scoin-primary hover:bg-slate-50'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="h-4 w-px bg-slate-200 mx-4"></div>
            
            <button 
              onClick={() => setLang(lang === 'EN' ? 'ZH' : 'EN')}
              className={`text-xs font-bold px-3 py-1.5 border rounded-lg uppercase transition-colors mr-4 ${isScrolled ? 'text-slate-700 border-slate-200 hover:bg-slate-50' : 'text-white/90 border-white/30 hover:bg-white/10'}`}
            >
              {lang === 'EN' ? '繁中' : 'EN'}
            </button>

            <button className="text-sm font-semibold text-slate-600 hover:text-scoin-primary px-4">{t('nav_login')}</button>
            <button className="bg-scoin-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-md active:scale-95">
              {t('nav_signup')}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 absolute w-full top-20 shadow-2xl overflow-y-auto max-h-[80vh] animate-in slide-in-from-top-4">
          <div className="px-4 py-6 space-y-4">
            {menuStructure.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">{item.label}</div>
                {item.subItems ? (
                  <div className="grid grid-cols-1 gap-1 pl-2">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleNavClick(sub.id)}
                        className={`block w-full text-left px-3 py-3 text-base font-medium rounded-lg ${
                          currentPage === sub.id ? 'text-scoin-primary bg-blue-50' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-3 py-3 text-base font-medium rounded-lg ${
                      currentPage === item.id ? 'text-scoin-primary bg-blue-50' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
            
            <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex flex-col space-y-4">
               <button 
                 onClick={() => setLang(lang === 'EN' ? 'ZH' : 'EN')} 
                 className="flex items-center justify-between px-3 py-2 text-sm font-bold text-slate-600 dark:text-slate-200"
               >
                 <span>Language</span>
                 <span className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-white px-2 py-1 rounded uppercase">{lang === 'EN' ? '繁中' : 'English'}</span>
               </button>
               <div className="grid grid-cols-2 gap-4">
                 <button className="px-4 py-3 rounded-xl font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600">{t('nav_login')}</button>
                 <button className="px-4 py-3 rounded-xl font-bold text-white bg-scoin-primary">{t('nav_signup')}</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
