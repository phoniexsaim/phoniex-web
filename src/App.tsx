import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { Hrms } from './pages/Hrms';
import './App.css';

function App() {
  const getInitialTab = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validTabs = ['home', 'about', 'services', 'portfolio', 'contact', 'hrms'];
    return validTabs.includes(hash) ? hash : 'home';
  };

  const [currentTab, setCurrentTab] = useState<string>(getInitialTab);

  const setTab = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab;
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validTabs = ['home', 'about', 'services', 'portfolio', 'contact', 'hrms'];
      if (validTabs.includes(hash)) {
        setCurrentTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Smoothly scroll window to top whenever tab changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentTab]);

  const renderActivePage = () => {
    switch (currentTab) {
      case 'home':
        return <Home setTab={setTab} />;
      case 'about':
        return <About />;
      case 'services':
        return <Services />;
      case 'portfolio':
        return <Portfolio />;
      case 'contact':
        return <Contact />;
      case 'hrms':
        return <Hrms />;
      default:
        return <Home setTab={setTab} />;
    }
  };

  return (
    <div className="app-container">
      {/* Dynamic 3D interactive background canvas */}
      <ParticleCanvas />

      {/* Floating dynamic navbar navigation */}
      <Navbar currentTab={currentTab} setTab={setTab} />

      {/* Dynamic Main Workspace viewport with smooth animated transition */}
      <main className="main-content">
        <div key={currentTab} className="page-transition-wrapper">
          {renderActivePage()}
        </div>
      </main>

      {/* Corporate Glassmorphic Footer */}
      <Footer setTab={setTab} />
    </div>
  );
}

export default App;
