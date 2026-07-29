import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';


const faqs = [
  {
    q: 'When should I start my study abroad application?',
    a: 'Ideally 12–18 months before your intended intake. Competitive programs and scholarships close earlier, so an early roadmap prevents rushed decisions.',
  },
  {
    q: 'Do you help with visa documentation?',
    a: 'Yes. We provide country-specific checklists, mock interviews, and counselor review of financial and academic documents before submission.',
  },
  {
    q: 'Can I apply without IELTS or TOEFL?',
    a: 'Some universities accept MOI letters or internal assessments. We identify alternatives based on your academic background and destination.',
  },
  {
    q: 'How are universities shortlisted for me?',
    a: 'We score programs against your budget, career goals, academic profile, and location preferences — not commission tiers.',
  },
];


const FAQ = () => {

  const [open,setOpen] = useState(0);


  return (

<section className="section-padding">


<div className="container-wide">


{/* Header */}

<div className="mx-auto mb-12 max-w-3xl text-center">

<p className="
text-sm
font-semibold
uppercase
tracking-widest
text-brand-600
">
Frequently Asked Questions
</p>


<h2 className="
mt-3
font-display
text-3xl
font-bold
text-ink-900
sm:text-4xl
">

Everything you need before starting your journey

</h2>


<p className="
mt-4
text-ink-500
">

Transparent guidance about applications, visas, universities and admissions.

</p>

</div>




<div className="
mx-auto
max-w-4xl
space-y-4
">


{faqs.map((item,index)=>{


const active=open===index;


return (

<motion.div

key={item.q}

initial={{opacity:0,y:15}}

whileInView={{opacity:1,y:0}}

viewport={{once:true}}

transition={{
delay:index*.08
}}

className={`
rounded-3xl
border
p-5
backdrop-blur-xl
transition

${active
?
'bg-white shadow-xl border-brand-200'
:
'bg-white/60 border-white/40'
}

`}

>


<button

onClick={()=>setOpen(active ? -1:index)}

className="
flex
w-full
items-center
gap-4
text-left
"


>


<div className="
flex
h-8
w-8
shrink-0
items-center
justify-center
rounded-full
bg-brand-100
text-sm
font-bold
text-brand-700
">

{index+1}

</div>



<span className="
flex-1
font-semibold
text-ink-900
">

{item.q}

</span>




<HiChevronDown

size={22}

className={`
transition-transform
duration-300

${active ? 'rotate-180 text-brand-600':'text-ink-500'}

`}

/>


</button>




<AnimatePresence>


{active && (

<motion.div

initial={{
height:0,
opacity:0
}}

animate={{
height:'auto',
opacity:1
}}

exit={{
height:0,
opacity:0
}}

className="
overflow-hidden
"


>


<p className="
pt-4
pl-12
text-sm
leading-relaxed
text-ink-500
">

{item.a}

</p>


</motion.div>


)}


</AnimatePresence>


</motion.div>


)

})}


</div>


</div>


</section>

  );

};


export default FAQ;