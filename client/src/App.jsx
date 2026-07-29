import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home, { WorkSection, ServicesSection } from './pages/Home';
import Contact from './pages/Contact';

const WorkPage = () => (
  <div className="min-h-screen pt-32 pb-20 text-zinc-100">
    <WorkSection />
  </div>
);

const ServicesPage = () => (
  <div className="min-h-screen pt-32 pb-20 text-zinc-100">
    <ServicesSection />
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-100 font-sans selection:bg-[#d80000] selection:text-white relative overflow-hidden">
      
      {/* MM Logo Background Overlay across all pages */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-0 opacity-10">
        <img 
          src="/logo-mm.png" 
          alt="" 
          className="w-[80vw] max-w-[800px] object-contain filter drop-shadow-[0_0_50px_#d80000]" 
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;