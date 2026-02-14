
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Support from './pages/Support';
import Partners from './pages/Partners';
import ScoinHK from './pages/ScoinHK';
import ScoinUS from './pages/ScoinUS';
import DisclosureReserves from './pages/DisclosureReserves';
import DisclosureCirculation from './pages/DisclosureCirculation';
import DisclosureAudit from './pages/DisclosureAudit';
import DisclosureWhitepaper from './pages/DisclosureWhitepaper';
import { Language } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ZH');
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home lang={lang} setCurrentPage={setCurrentPage} />;
      case 'disclosure-reserves': return <DisclosureReserves lang={lang} />;
      case 'disclosure-circulation': return <DisclosureCirculation lang={lang} />;
      case 'disclosure-audit': return <DisclosureAudit lang={lang} />;
      case 'disclosure-whitepaper': return <DisclosureWhitepaper lang={lang} />;
      case 'about': return <About lang={lang} />;
      case 'support': return <Support lang={lang} />;
      case 'partners': return <Partners lang={lang} />;
      case 'scoin-hk': return <ScoinHK lang={lang} />;
      case 'scoin-us': return <ScoinUS lang={lang} />;
      default: return <Home lang={lang} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col antialiased selection:bg-blue-100 selection:text-scoin-primary">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer lang={lang} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;
