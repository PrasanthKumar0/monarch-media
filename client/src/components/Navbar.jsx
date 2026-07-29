import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  const activeClass = "text-[#d80000] drop-shadow-[0_0_10px_rgba(216,0,0,0.8)] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-[#d80000] after:shadow-[0_0_8px_#d80000]";
  const inactiveClass = "text-zinc-300 hover:text-[#d80000] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(216,0,0,0.5)]";

  const handleNavClick = (tabName, path) => {
    setActiveTab(tabName);
    if (path.startsWith('/#')) {
      const elementId = path.replace('/#', '');
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(path);
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2.5 rounded-full bg-[#0a0a0a]/80 border border-[#d80000]/30 shadow-[0_0_30px_rgba(216,0,0,0.15)] relative backdrop-blur-2xl">
        
        {/* Full Monarch Media Logo - Pop-Out Effect */}
        <div className="relative flex items-center w-36 sm:w-44 md:w-52 h-9 sm:h-11">
          <Link 
            to="/" 
            onClick={() => setActiveTab('home')}
            className="absolute left-0 -top-3 sm:-top-4 z-10 flex items-center group"
          >
            <img 
              src="/logo-full.png" 
              alt="Monarch Media" 
              className="h-16 sm:h-20 md:h-21 w-auto max-w-none object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]" 
            />
          </Link>
        </div>

        {/* Centered Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-bold tracking-wider uppercase">
          <button 
            type="button"
            onClick={() => handleNavClick('home', '/')}
            className={activeTab === 'home' ? activeClass : inactiveClass}
          >
            Home
          </button>
          
          <button 
            type="button"
            onClick={() => handleNavClick('work', '/#work')}
            className={activeTab === 'work' ? activeClass : inactiveClass}
          >
            Our Work
          </button>

          <button 
            type="button"
            onClick={() => handleNavClick('services', '/#services')}
            className={activeTab === 'services' ? activeClass : inactiveClass}
          >
            Services
          </button>

          <button 
            type="button"
            onClick={() => handleNavClick('contact', '/contact')}
            className={activeTab === 'contact' ? activeClass : inactiveClass}
          >
            Contact
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleNavClick('contact', '/contact')}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-mono font-bold text-white rounded-full group bg-[#d80000] shadow-[0_0_20px_rgba(216,0,0,0.4)] transition-all duration-300 hover:scale-105"
          >
            <span className="relative px-5 py-2 transition-all ease-in duration-200 bg-[#000000] rounded-full group-hover:bg-transparent font-bold uppercase tracking-wider">
              Start a Project
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;