import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full bg-slate-950/80 backdrop-blur-xl border border-slate-800 shadow-2xl">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center font-bold text-white text-sm tracking-wider">
            MM
          </div>
          <span className="font-display font-extrabold text-white text-lg tracking-tight">
            MONARCH <span className="text-sky-400 font-light">MEDIA</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-sky-400 font-semibold" : "text-slate-300 hover:text-white transition-colors"}>
            Home
          </NavLink>
          <a href="/#work" className="text-slate-300 hover:text-white transition-colors">
            Our Work
          </a>
          <NavLink to="/services" className={({ isActive }) => isActive ? "text-sky-400 font-semibold" : "text-slate-300 hover:text-white transition-colors"}>
            Services
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-sky-400 font-semibold" : "text-slate-300 hover:text-white transition-colors"}>
            Contact
          </NavLink>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="px-5 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-sky-500/20"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;