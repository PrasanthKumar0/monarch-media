import { useState } from 'react';

const Contact = () => {
  const [isClapped, setIsClapped] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phone: '',
    email: '',
    purpose: '',
    idea: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const playClapSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  const handleClapClick = () => {
    playClapSound();
    setIsClapped(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen pt-32 pb-20 bg-[#000000] relative overflow-hidden flex items-center justify-center px-4">
      {/* Background Red Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#d80000]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#d80000]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-2xl w-full mx-auto relative z-10 text-center">
        {!isClapped ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0a0a0a]/80 backdrop-blur-2xl border border-[#d80000]/40 text-center flex flex-col items-center justify-center shadow-[0_0_50px_rgba(216,0,0,0.2)]">
            <span className="px-3 py-1 rounded-md bg-[#d80000]/10 border border-[#d80000]/30 text-[#d80000] font-mono text-xs font-bold uppercase tracking-widest mb-6">
              // PRODUCTION START
            </span>
            
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display mb-4 tracking-tight">
              Ready to <span className="text-[#d80000] drop-shadow-[0_0_15px_rgba(216,0,0,0.8)]">Action?</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mb-8 max-w-md">
              Tap the clapboard below to open the production brief and get your project rolling.
            </p>

            {/* INTERACTIVE CLAPBOARD */}
            <div 
              onClick={handleClapClick}
              className="cursor-pointer group relative w-64 h-52 bg-[#000000] rounded-2xl border-2 border-[#d80000] p-4 shadow-[0_0_30px_rgba(216,0,0,0.35)] hover:scale-105 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Clapboard Top Bar */}
              <div className="w-full h-10 bg-[#0a0a0a] rounded-lg border border-zinc-800 flex items-center overflow-hidden relative group-hover:rotate-[-6deg] transition-transform origin-bottom-left duration-200">
                <div className="flex w-full h-full">
                  <div className="w-1/4 h-full bg-zinc-100 -skew-x-12"></div>
                  <div className="w-1/4 h-full bg-[#d80000] -skew-x-12"></div>
                  <div className="w-1/4 h-full bg-zinc-100 -skew-x-12"></div>
                  <div className="w-1/4 h-full bg-[#d80000] -skew-x-12"></div>
                </div>
              </div>

              {/* Clapboard Info */}
              <div className="text-left font-mono text-[11px] text-zinc-300 space-y-1 my-auto">
                <p><span className="text-[#d80000] font-bold">PROD:</span> MONARCH MEDIA</p>
                <p><span className="text-[#d80000] font-bold">SCENE:</span> 01 &nbsp;&nbsp; <span className="text-[#d80000] font-bold">TAKE:</span> 01</p>
                <p><span className="text-[#d80000] font-bold">DIRECTOR:</span> YOU</p>
              </div>

              <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest bg-[#d80000]/20 py-2 rounded-lg border border-[#d80000]/40 animate-pulse">
                🎬 CLICK TO CLAP!
              </div>
            </div>
          </div>
        ) : submitted ? (
          /* SUBMISSION SUCCESS */
          <div className="p-10 rounded-3xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-[#d80000]/50 shadow-[0_0_50px_rgba(216,0,0,0.3)] text-center">
            <div className="w-16 h-16 rounded-full bg-[#d80000]/20 border border-[#d80000] flex items-center justify-center text-[#d80000] font-bold text-3xl mx-auto mb-6">
              ✓
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display mb-3">SCENE WRAPPED!</h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              Thanks <strong className="text-[#d80000]">{formData.name}</strong>! We received your project details and will review them shortly.
            </p>
            <button
              onClick={() => { setIsClapped(false); setSubmitted(false); }}
              className="mt-8 px-8 py-3 rounded-full bg-[#000000] border border-[#d80000]/50 text-[#d80000] font-mono text-xs font-bold uppercase tracking-wider hover:border-[#d80000] hover:shadow-[0_0_15px_rgba(216,0,0,0.5)] transition-all"
            >
              Start Another Brief
            </button>
          </div>
        ) : (
          /* PROJECT BRIEF FORM */
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-[#d80000]/30 text-left shadow-[0_0_40px_rgba(216,0,0,0.15)]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-900">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-[#d80000]">// PRODUCTION BRIEF</span>
                <h2 className="text-3xl font-black text-white font-display mt-1">Start Your Project</h2>
              </div>
              <button 
                type="button"
                onClick={playClapSound}
                className="px-3 py-1.5 rounded-lg bg-[#d80000]/10 border border-[#d80000]/30 text-[#d80000] font-mono text-[10px] uppercase font-bold hover:bg-[#d80000]/20 transition-colors"
              >
                🎬 Clap Sound
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#d80000] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Hyderabad, Los Angeles"
                    className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#d80000] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#d80000] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#d80000] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">Purpose *</label>
                <select
                  name="purpose"
                  required
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#d80000] transition-colors"
                >
                  <option value="" disabled>Select Purpose...</option>
                  <option value="Video Editing">Video Editing & Motion Graphics</option>
                  <option value="Branding">Brand Identity & Visual System</option>
                  <option value="Social Content">Viral Social Reels & Shorts</option>
                  <option value="Design">Poster & Thumbnail Design</option>
                  <option value="Full Production">Full Studio Campaign</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">Project Idea & Vision *</label>
                <textarea
                  name="idea"
                  required
                  rows="4"
                  value={formData.idea}
                  onChange={handleChange}
                  placeholder="Tell us about your project, style preferences, timeline, or reference videos..."
                  className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#d80000] transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#d80000] text-white font-black font-mono text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(216,0,0,0.5)] hover:bg-[#b00000] transition-all duration-300 mt-4"
              >
                Submit Brief 🚀
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;