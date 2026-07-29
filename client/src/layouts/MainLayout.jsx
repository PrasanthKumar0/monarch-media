import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#05070b] text-slate-100 flex flex-col font-sans antialiased selection:bg-sky-500 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 sm:px-8 text-center text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 MONARCH MEDIA. All rights reserved[cite: 1].</p>
          <p className="tracking-widest uppercase font-semibold text-sky-400">Create. Connect. Stand Out.[cite: 1]</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;