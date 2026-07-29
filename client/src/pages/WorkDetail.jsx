import { useParams, Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const WorkDetail = () => {
  const { id } = useParams();

  // Mock data representing individual video edit details
  const project = {
    id: id || '1',
    title: 'Neon Odyssey - Commercial Cut',
    category: 'Commercials',
    client: 'Apex Cyberwear',
    role: 'Lead Video Editor & Colorist',
    software: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    description: 'A high-octane commercial edit designed for a futuristic streetwear campaign. Features fast-paced visual rhythm, sound design sync, custom light leaks, and an ultra-stylized teal-and-orange color grade.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder YouTube/Vimeo embed
    stats: [
      { label: 'Editing Time', value: '32 Hours' },
      { label: 'Resolution', value: '4K DCI' },
      { label: 'Color Space', value: 'Rec.709 / DaVinci YRGB' }
    ]
  };

  return (
    <>
      <SEO title={`${project.title} | Portfolio`} description={project.description} />

      <section className="section-padding pt-32">
        <div className="container-wide">
          {/* Back Button */}
          <Link to="/works" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 mb-8 transition-colors">
            ← Back to Works
          </Link>

          {/* Header */}
          <div className="max-w-4xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400 block mb-2">{project.category}</span>
            <h1 className="text-4xl sm:text-6xl font-bold text-white font-display mb-4">{project.title}</h1>
            <p className="text-ink-700 text-lg sm:text-xl leading-relaxed">{project.description}</p>
          </div>

          {/* Embedded Video Player */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden glass border border-slate-800/80 mb-12 shadow-2xl">
            <iframe
              src={project.videoUrl}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Metadata Grid */}
          <div className="grid gap-8 md:grid-cols-3 p-8 rounded-2xl glass border border-slate-800/80">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Client & Role</h4>
              <p className="text-white font-semibold">{project.client}</p>
              <p className="text-sky-400 text-sm">{project.role}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Software & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {project.software.map((tool) => (
                  <span key={tool} className="px-3 py-1 rounded-full bg-slate-800 text-xs font-mono text-slate-200 border border-slate-700">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Project Specs</h4>
              <div className="space-y-1">
                {project.stats.map((stat) => (
                  <p key={stat.label} className="text-sm text-slate-300">
                    <span className="text-slate-500">{stat.label}:</span> {stat.value}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkDetail;