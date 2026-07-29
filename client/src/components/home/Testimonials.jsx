import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { Quote } from 'lucide-react';


const Testimonials = ({ reviews = [] }) => {


const items = reviews.length
? reviews
: [
{
name:'Placeholder Student',
role:'Graduate',
content:'Connect API and add student reviews from MongoDB.',
rating:5,
destination:'Global'
}
];



return (

<section className="section-padding">


<div className="container-wide">


{/* Heading */}

<div className="mb-12 text-center">

<p className="
text-sm
font-semibold
uppercase
tracking-widest
text-brand-600
">

Student Success Stories

</p>


<h2 className="
mt-3
font-display
text-3xl
font-bold
text-ink-900
sm:text-4xl
">

Real journeys. Real admissions.

</h2>


<p className="
mx-auto
mt-4
max-w-2xl
text-ink-500
">

Thousands of students trust our guidance to find the right universities and opportunities.

</p>


</div>





<div className="
grid
gap-6
md:grid-cols-2
lg:grid-cols-3
">


{items.slice(0,6).map((review,index)=>(


<motion.blockquote


key={review._id || review.name}


initial={{
opacity:0,
y:25
}}


whileInView={{
opacity:1,
y:0
}}


viewport={{
once:true
}}


transition={{
duration:.5,
delay:index*.08
}}


whileHover={{
y:-8
}}



className="
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



{/* Quote icon */}

<div className="
absolute
right-5
top-5
text-brand-100
">

<Quote size={45}/>

</div>





{/* Rating */}

<div className="
mb-5
flex
items-center
justify-between
">


<div className="
flex
gap-1
text-yellow-400
">

{
Array.from({
length:review.rating || 5
})
.map((_,i)=>(

<FaStar
key={i}
size={15}
/>

))
}

</div>


<span className="
rounded-full
bg-brand-50
px-3
py-1
text-xs
font-semibold
text-brand-700
">

Verified Student

</span>


</div>





{/* Review */}

<p className="
relative
text-sm
leading-relaxed
text-ink-700
">

“{review.content}”

</p>





{/* Student */}

<footer className="
mt-6
flex
items-center
gap-3
border-t
border-slate-200
pt-5
">


<div className="
flex
h-12
w-12
items-center
justify-center
rounded-full
bg-gradient-to-br
from-brand-500
to-purple-500
font-bold
text-white
">

{review.name?.charAt(0) || "S"}

</div>




<div>

<p className="
font-semibold
text-ink-900
">

{review.name}

</p>


<p className="
text-xs
text-ink-500
">

{review.role} · {review.destination}

</p>


</div>



</footer>



</motion.blockquote>


))}


</div>


</div>


</section>

);


};


export default Testimonials;