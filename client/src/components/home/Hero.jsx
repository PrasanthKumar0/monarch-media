import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Globe2, Plane, CheckCircle2 } from 'lucide-react';

const Hero = ({ settings }) => {
  const hero = settings?.hero || {};

  const stats = settings?.stats || [
    { label: 'Partner universities', value: '120+' },
    { label: 'Countries covered', value: '18' },
    { label: 'Visa success rate', value: '96%' },
    { label: 'Students guided', value: '4500+' },
  ];

  return (
    <section className="relative overflow-hidden section-padding pb-10">

      {/* Background glow */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />


      <div className="container-wide relative grid items-center gap-14 lg:grid-cols-2">


        {/* LEFT CONTENT */}
        <motion.div
          initial={{opacity:0,y:30}}
          animate={{opacity:1,y:0}}
          transition={{duration:.7}}
        >

          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700">
            <Globe2 size={16}/>
            Trusted global education partners
          </div>


          <h1 className="font-display text-4xl font-bold leading-tight text-ink-900 sm:text-5xl lg:text-6xl">

            {hero.title || (
              <>
                Build your future with
                <span className="text-gradient">
                  {' '}world-class education
                </span>
              </>
            )}

          </h1>


          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">

            {hero.subtitle ||
              "Personalised university selection, admission guidance and visa assistance for students dreaming bigger."
            }

          </p>


          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              to="/contact"
              className="
              rounded-2xl bg-brand-600 px-7 py-3.5
              font-semibold text-white shadow-xl
              shadow-brand-600/30
              transition hover:-translate-y-1 hover:bg-brand-700
              "
            >
              {hero.ctaPrimary || "Start Your Journey"}
            </Link>


            <Link
              to="/universities"
              className="
              rounded-2xl border border-slate-200
              bg-white/60 px-7 py-3.5
              font-semibold text-ink-800
              backdrop-blur
              transition hover:-translate-y-1
              "
            >
              Explore Universities
            </Link>

          </div>


          <div className="mt-8 flex items-center gap-3 text-sm text-ink-500">

            <CheckCircle2 className="text-green-500"/>

            <span>
              5000+ students successfully guided
            </span>

          </div>


        </motion.div>



        {/* RIGHT CARD */}

        <motion.div
          initial={{opacity:0,scale:.9}}
          animate={{opacity:1,scale:1}}
          transition={{duration:.8}}
          className="relative"
        >

          <div
            className="
            glass relative overflow-hidden
            rounded-3xl p-6 shadow-2xl
            "
          >


            {/* Floating icon */}

            <motion.div
              animate={{y:[0,-15,0]}}
              transition={{
                duration:3,
                repeat:Infinity
              }}
              className="
              absolute right-8 top-8
              flex h-16 w-16
              items-center justify-center
              rounded-2xl bg-brand-600
              text-white shadow-xl
              "
            >
              <GraduationCap size={32}/>
            </motion.div>



            <div className="mb-8">

              <p className="text-sm text-ink-500">
                Your global admission partner
              </p>

              <h3 className="mt-2 text-2xl font-bold text-ink-900">
                Study Abroad Made Simple
              </h3>

            </div>



            <div className="grid grid-cols-2 gap-4">

              {stats.map((stat)=>(
                <div
                  key={stat.label}
                  className="
                  rounded-2xl bg-white/80
                  p-5 shadow-sm
                  "
                >

                  <p className="
                  text-2xl font-bold
                  text-brand-700
                  ">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-ink-500">
                    {stat.label}
                  </p>

                </div>
              ))}

            </div>



            <div
              className="
              mt-6 flex items-center gap-3
              rounded-2xl
              bg-gradient-to-r
              from-brand-600 to-purple-600
              p-5 text-white
              "
            >

              <Plane/>

              <div>
                <p className="text-sm">
                  Next Admission Intake
                </p>

                <p className="font-bold">
                  September 2026
                </p>
              </div>

            </div>


          </div>


        </motion.div>


      </div>

    </section>
  );
};

export default Hero;