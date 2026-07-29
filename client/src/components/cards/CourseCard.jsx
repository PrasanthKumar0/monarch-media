import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, GraduationCap } from 'lucide-react';
import { formatCurrency, levelLabels } from '../../utils/helpers';


const CourseCard = ({ course, index = 0 }) => (

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


    {/* Top badges */}

    <div className="
    flex
    items-center
    justify-between
    gap-3
    "
    >

      <span
      className="
      rounded-full
      bg-brand-100
      px-3
      py-1
      text-xs
      font-semibold
      text-brand-700
      "
      >

        {levelLabels[course.level] || course.level || "Program"}

      </span>



      <span
      className="
      flex
      items-center
      gap-1
      text-xs
      text-ink-500
      "
      >

        <Clock size={14}/>

        {course.duration || "Flexible"}

      </span>


    </div>




    {/* Icon */}

    <div
    className="
    mt-5
    flex
    h-14
    w-14
    items-center
    justify-center
    rounded-2xl
    bg-gradient-to-br
    from-brand-500
    to-purple-500
    text-white
    "
    >

      <GraduationCap size={28}/>

    </div>




    {/* Title */}

    <h3
    className="
    mt-5
    font-display
    text-xl
    font-bold
    text-ink-900
    transition
    group-hover:text-brand-600
    "
    >

      {course.title}

    </h3>




    {/* University */}

    <p
    className="
    mt-2
    text-sm
    text-ink-500
    "
    >

      {course.university?.name || "University"}

      {" · "}

      {course.country?.flagEmoji}

      {" "}

      {course.country?.name}


    </p>




    {/* Description */}

    <p
    className="
    mt-4
    line-clamp-3
    text-sm
    leading-relaxed
    text-ink-500
    "
    >

      {course.description ||
      "Explore course structure, eligibility, fees and admission requirements."}

    </p>





    {/* Bottom */}

    <div
    className="
    mt-6
    flex
    items-center
    justify-between
    "
    >


      <div>

        <p className="
        text-xs
        text-ink-500
        ">
          Tuition Fee
        </p>


        <p
        className="
        mt-1
        font-semibold
        text-brand-700
        "
        >

          {formatCurrency(
            course.tuitionFee,
            course.currency
          )}

        </p>


      </div>



      <Link

      to={`/courses/${course.slug || course._id}`}

      className="
      flex
      items-center
      gap-2
      rounded-xl
      bg-ink-900
      px-4
      py-2.5
      text-sm
      font-semibold
      text-white
      transition
      hover:bg-brand-600
      "

      >

        Details

        <ArrowRight size={15}/>

      </Link>


    </div>


  </motion.article>

);


export default CourseCard;