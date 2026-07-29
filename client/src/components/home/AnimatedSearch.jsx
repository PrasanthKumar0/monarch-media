import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';
import { Globe2, GraduationCap, MapPin } from 'lucide-react';

const popular = [
  "USA",
  "UK",
  "Canada",
  "Australia",
  "Germany"
];

const AnimatedSearch = () => {

  const [query,setQuery] = useState('');
  const [focus,setFocus] = useState(false);

  const navigate = useNavigate();


  const submit = (e)=>{
    e.preventDefault();

    if(query.trim()){
      navigate(`/courses?search=${encodeURIComponent(query)}`);
    }
  };


  const selectPopular=(item)=>{
    setQuery(item);
    navigate(`/courses?search=${item}`);
  };


  return (

<section className="relative section-padding pt-0">

<div className="container-wide">


<motion.div

initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{duration:.6}}

className="
mx-auto max-w-5xl
rounded-3xl
glass
p-6
shadow-xl
"

>


<div className="mb-5 text-center">


<h2 className="
font-display
text-2xl
font-bold
text-ink-900
sm:text-3xl
">

Find your perfect study destination

</h2>


<p className="
mt-2
text-sm
text-ink-500
">

Search universities, courses and countries

</p>


</div>



<form

onSubmit={submit}

className={`
flex flex-col gap-3
rounded-2xl
bg-white/70
p-3
transition
md:flex-row
${focus ? "ring-2 ring-brand-500" : ""}
`}

>


<div className="flex flex-1 items-center gap-3 px-3">

<HiSearch
className="text-2xl text-brand-600"
/>


<input

value={query}

onChange={(e)=>setQuery(e.target.value)}

onFocus={()=>setFocus(true)}

onBlur={()=>setFocus(false)}

placeholder="
Search university, country or course...
"

className="
w-full
bg-transparent
outline-none
text-sm
"

/>


</div>



<button

className="
rounded-xl
bg-brand-600
px-8
py-3
font-semibold
text-white
transition
hover:bg-brand-700
"

>

Search

</button>


</form>



<div className="mt-6">


<p className="
mb-3
text-xs
font-semibold
uppercase
tracking-wide
text-ink-500
">

Popular searches

</p>



<div className="
flex
flex-wrap
gap-3
">


{popular.map((item)=>(

<button

key={item}

onClick={()=>selectPopular(item)}

className="
flex
items-center
gap-2
rounded-full
bg-white
px-4
py-2
text-sm
font-medium
text-ink-700
shadow-sm
transition
hover:-translate-y-1
hover:bg-brand-50
"

>

<Globe2 size={15}/>

{item}

</button>

))}


</div>


</div>




<div className="
mt-8
grid
gap-4
sm:grid-cols-3
">


<div className="
rounded-2xl
bg-white/70
p-4
">

<GraduationCap className="text-brand-600"/>

<p className="mt-2 font-semibold">
Universities
</p>

<p className="text-xs text-ink-500">
Explore top institutions
</p>

</div>



<div className="
rounded-2xl
bg-white/70
p-4
">

<MapPin className="text-brand-600"/>

<p className="mt-2 font-semibold">
Countries
</p>

<p className="text-xs text-ink-500">
Choose your destination
</p>

</div>



<div className="
rounded-2xl
bg-white/70
p-4
">

<Globe2 className="text-brand-600"/>

<p className="mt-2 font-semibold">
Courses
</p>

<p className="text-xs text-ink-500">
Find your program
</p>

</div>


</div>



</motion.div>


</div>

</section>

  );
};


export default AnimatedSearch;