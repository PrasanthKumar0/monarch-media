import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe2 } from 'lucide-react';


const CountryCard = ({ country, index = 0 }) => (

  <motion.article

    initial={{ opacity:0, y:25 }}

    whileInView={{ opacity:1, y:0 }}

    viewport={{ once:true }}

    transition={{
      duration:.5,
      delay:index * .08
    }}

    whileHover={{
      y:-8
    }}

    className="
    group
    relative
    overflow-hidden
    rounded-3xl
    border
    border-white/40
    bg-white/70
    p-6
    shadow-lg
    backdrop-blur-xl
    "

  >


    {/* Background glow */}

    <div
    className="
    absolute
    -right-10
    -top-10
    h-40
    w-40
    rounded-full
    bg-brand-200/50
    blur-3xl
    transition
    group-hover:bg-brand-300/70
    "
    />



    {/* Country icon */}

    <div
    className="
    relative
    flex
    h-20
    w-20
    items-center
    justify-center
    rounded-2xl
    bg-gradient-to-br
    from-brand-100
    to-purple-100
    text-5xl
    shadow-inner
    "
    >

      {country.flagEmoji || "🌍"}

    </div>



    {/* Content */}

    <div className="relative">


      <h3
      className="
      mt-6
      flex
      items-center
      gap-2
      font-display
      text-2xl
      font-bold
      text-ink-900
      "
      >

        {country.name}

        <Globe2
        size={18}
        className="text-brand-600"
        />

      </h3>



      <p
      className="
      mt-3
      line-clamp-3
      text-sm
      leading-relaxed
      text-ink-500
      "
      >

        {country.description ||
        "Discover universities, courses, scholarships and admission opportunities."}

      </p>



      {/* Highlights */}

      {country.highlights?.length > 0 && (

        <div
        className="
        mt-5
        space-y-2
        "
        >

          {country.highlights
          .slice(0,3)
          .map((item)=>(

            <div
            key={item}
            className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-brand-50
            px-3
            py-2
            text-xs
            font-medium
            text-brand-700
            "
            >

              ✓ {item}

            </div>

          ))}


        </div>

      )}



      {/* Button */}

      <Link

      to={`/countries/${country.slug || country._id}`}

      className="
      mt-6
      inline-flex
      items-center
      gap-2
      rounded-xl
      bg-ink-900
      px-5
      py-3
      text-sm
      font-semibold
      text-white
      transition
      hover:bg-brand-600
      "

      >

        Explore {country.name}

        <ArrowRight size={16}/>

      </Link>



    </div>


  </motion.article>

);


export default CountryCard;