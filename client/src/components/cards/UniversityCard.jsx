import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Trophy, ArrowRight } from 'lucide-react';

const UniversityCard = ({ university, index = 0 }) => {

  const country = university.country;


  return (

    <motion.article

      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
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
      overflow-hidden
      rounded-3xl
      border
      border-white/40
      bg-white/70
      shadow-lg
      backdrop-blur-xl
      "

    >


      {/* IMAGE */}

      <div className="
      relative
      h-52
      overflow-hidden
      ">


        {university.coverImage ? (

          <img

          src={university.coverImage}

          alt={university.name}

          className="
          h-full
          w-full
          object-cover
          transition
          duration-500
          group-hover:scale-110
          "

          />

        ) : (

          <div className="
          flex
          h-full
          items-center
          justify-center
          bg-gradient-to-br
          from-brand-100
          to-purple-200
          text-4xl
          font-bold
          text-brand-700/40
          ">
            {university.name?.slice(0,2)}
          </div>

        )}



        {/* Overlay */}

        <div className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/50
        via-transparent
        "
        />



        {/* Ranking */}

        {university.ranking && (

          <div className="
          absolute
          right-4
          top-4
          flex
          items-center
          gap-1
          rounded-full
          bg-white/90
          px-3
          py-1
          text-xs
          font-semibold
          text-brand-700
          ">

            <Trophy size={14}/>

            #{university.ranking}

          </div>

        )}


      </div>




      {/* CONTENT */}

      <div className="p-6">


        <div className="
        mb-3
        flex
        items-center
        gap-2
        text-xs
        text-ink-500
        ">

          <span className="
          rounded-full
          bg-brand-50
          px-3
          py-1
          ">

          {country?.flagEmoji || "🌍"}

          {country?.name}

          </span>


          <span className="
          flex
          items-center
          gap-1
          ">

            <MapPin size={13}/>

            {university.city}

          </span>


        </div>



        <h3 className="
        font-display
        text-xl
        font-bold
        text-ink-900
        transition
        group-hover:text-brand-600
        ">

          {university.name}

        </h3>



        <p className="
        mt-3
        line-clamp-2
        text-sm
        leading-relaxed
        text-ink-500
        ">

          {university.description ||
          "Explore admission details, courses, scholarships and requirements."}

        </p>




        <Link

          to={`/universities/${university.slug || university._id}`}

          className="
          mt-5
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-brand-600
          px-5
          py-2.5
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-brand-700
          "

        >

          View University

          <ArrowRight size={16}/>

        </Link>


      </div>


    </motion.article>

  );
};


export default UniversityCard;