import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, Users, Globe2 } from 'lucide-react';


const CTA = () => (

<section className="section-padding pt-0">


<div className="container-wide">


<motion.div


initial={{
opacity:0,
y:30
}}


whileInView={{
opacity:1,
y:0
}}


viewport={{
once:true
}}


transition={{
duration:.6
}}



className="
relative
overflow-hidden
rounded-[2.5rem]
bg-gradient-to-br
from-brand-700
via-brand-600
to-purple-700
px-8
py-14
text-white
lg:px-16
"

>


{/* Background effects */}

<div className="
absolute
-left-10
-top-10
h-72
w-72
rounded-full
bg-white/10
blur-3xl
"/>


<div className="
absolute
-bottom-20
-right-10
h-80
w-80
rounded-full
bg-purple-300/20
blur-3xl
"/>





<div className="
relative
grid
gap-10
lg:grid-cols-2
items-center
">


{/* Left */}

<div>


<p className="
inline-flex
rounded-full
bg-white/20
px-4
py-2
text-xs
font-semibold
uppercase
tracking-widest
">

Start your journey

</p>



<h2 className="
mt-5
font-display
text-3xl
font-bold
leading-tight
sm:text-5xl
">

Your dream university is closer than you think

</h2>



<p className="
mt-5
max-w-xl
text-brand-100
leading-relaxed
">

Get personalised counselling, university shortlisting,
application support and visa guidance from experts.

</p>




<div className="
mt-8
flex
flex-wrap
gap-4
">


<Link

to="/contact"

className="
flex
items-center
gap-2
rounded-xl
bg-white
px-6
py-3
text-sm
font-bold
text-brand-700
transition
hover:bg-brand-50
"

>

Book Consultation

<ArrowRight size={17}/>

</Link>




<Link

to="/register"

className="
rounded-xl
border
border-white/40
px-6
py-3
text-sm
font-semibold
transition
hover:bg-white/10
"

>

Create Account

</Link>


</div>


</div>






{/* Right Stats */}

<div className="
grid
grid-cols-2
gap-4
">


<div className="
rounded-2xl
bg-white/10
p-5
backdrop-blur-lg
">

<Globe2 size={25}/>

<p className="
mt-3
text-2xl
font-bold
">

20+

</p>

<p className="
text-sm
text-brand-100
">

Countries

</p>


</div>





<div className="
rounded-2xl
bg-white/10
p-5
backdrop-blur-lg
">

<Users size={25}/>

<p className="
mt-3
text-2xl
font-bold
">

5000+

</p>

<p className="
text-sm
text-brand-100
">

Students

</p>


</div>





<div className="
col-span-2
rounded-2xl
bg-white/10
p-5
backdrop-blur-lg
flex
items-center
gap-4
">


<CalendarCheck size={30}/>


<div>

<p className="
font-semibold
">

Free Profile Evaluation

</p>

<p className="
text-sm
text-brand-100
">

Check eligibility before applying

</p>

</div>


</div>



</div>


</div>



</motion.div>


</div>


</section>

);


export default CTA;