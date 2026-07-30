import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const activeClass = "text-[#d80000] drop-shadow-[0_0_10px_rgba(216,0,0,0.8)] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-[#d80000] after:shadow-[0_0_8px_#d80000]";
  const inactiveClass = "text-zinc-300 hover:text-[#d80000] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(216,0,0,0.5)]";

  const handleNavClick = (tabName, path) => {
    setActiveTab(tabName);
    setMobileMenuOpen(false); // Close mobile menu when clicked
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
    <header className="fixed top-0 left-0 right-0 z-50 py-3 px-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full bg-[#0a0a0a]/90 border border-[#d80000]/30 shadow-[0_0_30px_rgba(216,0,0,0.15)] relative backdrop-blur-2xl">
        
        {/* Logo - Adjusted responsive scaling */}
        <div className="flex items-center">
          <Link 
            to="/" 
            onClick={() => setActiveTab('home')}
            className="flex items-center group"
          >
            <img 
              src="/logo-full.png" 
              alt="Monarch Media" 
              className="h-10 sm:h-14 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
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

        {/* Actions & Hamburger */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => handleNavClick('contact', '/contact')}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-[10px] sm:text-xs font-mono font-bold text-white rounded-full group bg-[#d80000] shadow-[0_0_20px_rgba(216,0,0,0.4)] transition-all duration-300 hover:scale-105"
          >
            <span className="relative px-3 sm:px-5 py-1.5 sm:py-2 transition-all ease-in duration-200 bg-[#000000] rounded-full group-hover:bg-transparent font-bold uppercase tracking-wider">
              Start a Project
            </span>
          </button>

          {/* Hamburger Icon for Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl rounded-2xl bg-[#0a0a0a]/95 border border-[#d80000]/30 backdrop-blur-2xl p-4 flex flex-col gap-4 text-center font-mono font-bold tracking-wider text-sm uppercase">
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
        </div>
      )}
    </header>
  );
};

export default Navbar;
