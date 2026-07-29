import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-[#000000] text-zinc-100 min-h-screen">
      
      {/* HERO SECTION WITH ENHANCED GLOW EFFECTS */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
        
        {/* Glowing Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Main Central Red Pulse */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d80000]/20 rounded-full blur-[140px] animate-pulse" />
          
          {/* Subtle Side Spotlights */}
          <div className="absolute top-10 -left-20 w-[350px] h-[350px] bg-[#d80000]/15 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 -right-20 w-[400px] h-[400px] bg-[#d80000]/10 rounded-full blur-[130px]" />

          {/* Cyber Dot Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #d80000 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d80000]/10 border border-[#d80000]/40 text-[#d80000] font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(216,0,0,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#d80000] animate-pulse"></span>
            Monarch Media Studio
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-display leading-tight">
            Crafting High-Impact <br />
            <span className="text-[#d80000] drop-shadow-[0_0_25px_rgba(216,0,0,0.6)]">
              Cinematic Visuals
            </span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            We edit high-octane video content, design striking brand identities, and create viral visual media that command attention.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#d80000] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(216,0,0,0.5)] hover:bg-[#b00000] hover:scale-105 transition-all duration-300"
            >
              Start Production 🎬
            </Link>
            <a
              href="#work"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0a0a0a] border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#d80000]/50 font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300"
            >
              Explore Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* WORK SECTION INLINE */}
      <section id="work" className="py-20 border-t border-zinc-900 bg-[#000000]">
        <WorkSection />
      </section>

      {/* SERVICES SECTION INLINE */}
      <section id="services" className="py-20 border-t border-zinc-900 bg-[#0a0a0a]">
        <ServicesSection />
      </section>
      
    </div>
  );
};

// Reusable Work Component
export const WorkSection = () => {
  const projects = [
    { id: '1', title: 'Cyberpunk Teaser Edit', category: 'Video Editing', tag: 'Cinematic Trailer' },
    { id: '2', title: 'Neon Brand System', category: 'Branding', tag: 'Visual Identity' },
    { id: '3', title: 'Action Movie Motion Poster', category: 'Graphic Design', tag: 'Poster Design' },
    { id: '4', title: 'Social Media Viral Cut', category: 'Shorts / Reels', tag: 'Vertical Video' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#d80000]">
            // FEATURED SHOWCASE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display mt-2">
            Selected Works
          </h2>
        </div>
        <p className="text-zinc-400 text-sm max-w-md mt-4 md:mt-0">
          A glimpse into our recent production cuts, motion graphics, and graphic design edits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-zinc-800 hover:border-[#d80000]/60 p-6 sm:p-8 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(216,0,0,0.25)]"
          >
            <div className="w-full h-56 rounded-xl bg-gradient-to-br from-zinc-900 to-[#000000] border border-zinc-800 group-hover:border-[#d80000]/40 transition-colors flex items-center justify-center relative overflow-hidden mb-6">
              <span className="text-4xl opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                🎞️
              </span>
              <div className="absolute inset-0 bg-[#d80000]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#d80000] uppercase tracking-wider">
                {item.category}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                {item.tag}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-[#d80000] transition-colors">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reusable Services Component
export const ServicesSection = () => {
  const services = [
    {
      icon: '✂️',
      title: 'Cinematic Video Editing',
      desc: 'Color grading, high-energy pacing, sound design, and seamless cuts tailored for films, music videos, and teasers.',
    },
    {
      icon: '🎨',
      title: 'Brand & Motion Identity',
      desc: 'Bold graphic design systems, high-converting thumbnails, social assets, and sleek animation overlays.',
    },
    {
      icon: '📱',
      title: 'Viral Social Reels',
      desc: 'Fast-paced, vertically optimized videos with dynamic captioning and trend-driven pacing built for high retention.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#d80000]">
          // WHAT WE DO
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-display mt-2">
          Studio Capabilities
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((srv, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-[#000000] border border-zinc-800 hover:border-[#d80000]/60 transition-all duration-300 group shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(216,0,0,0.2)]"
          >
            <div className="w-12 h-12 rounded-xl bg-[#d80000]/10 border border-[#d80000]/30 flex items-center justify-center text-2xl mb-6 group-hover:bg-[#d80000] transition-all duration-300">
              {srv.icon}
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#d80000] transition-colors">
              {srv.title}
            </h3>

            <p className="text-zinc-400 text-sm leading-relaxed">
              {srv.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;