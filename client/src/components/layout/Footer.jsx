import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube
} from 'react-icons/fa';
import { Mail, Phone, MapPin } from 'lucide-react';


const Footer = () => {


const explore = [
  ['Universities','/universities'],
  ['Countries','/countries'],
  ['Courses','/courses'],
  ['Scholarships','/scholarships'],
  ['Blog','/blog'],
];


const support = [
  ['Services','/services'],
  ['About Us','/about'],
  ['Contact','/contact'],
  ['Login','/login'],
];



return (

<footer className="
relative
mt-20
overflow-hidden
bg-ink-900
text-slate-300
">


{/* Background */}

<div className="
absolute
-left-20
-top-20
h-80
w-80
rounded-full
bg-brand-600/20
blur-3xl
"/>


<div className="
absolute
-bottom-20
-right-20
h-80
w-80
rounded-full
bg-purple-500/10
blur-3xl
"/>




<div className="
container-wide
relative
grid
gap-12
section-padding
md:grid-cols-2
lg:grid-cols-4
">





{/* Brand */}

<div>

<h3 className="
font-display
text-3xl
font-bold
text-white
">

EduPath Global

</h3>


<p className="
mt-4
text-sm
leading-relaxed
text-slate-400
">

Helping students discover global education opportunities,
universities, scholarships and career pathways.

</p>



<div className="
mt-6
rounded-2xl
bg-white/5
p-4
backdrop-blur
">

<p className="
text-sm
font-semibold
text-white
">

Trusted Study Abroad Partner

</p>

<p className="
mt-1
text-xs
text-slate-400
">

Admissions • Visa • Scholarships

</p>

</div>


</div>






{/* Explore */}

<div>

<h4 className="
mb-5
font-semibold
uppercase
tracking-wider
text-white
">

Explore

</h4>


<ul className="space-y-3 text-sm">

{explore.map(([name,path])=>(

<li key={name}>

<Link

to={path}

className="
transition
hover:text-white
"

>

{name}

</Link>

</li>

))}


</ul>


</div>







{/* Support */}

<div>


<h4 className="
mb-5
font-semibold
uppercase
tracking-wider
text-white
">

Support

</h4>



<ul className="space-y-3 text-sm">


{support.map(([name,path])=>(

<li key={name}>

<Link

to={path}

className="
transition
hover:text-white
"

>

{name}

</Link>

</li>

))}


</ul>


</div>







{/* Contact */}

<div>


<h4 className="
mb-5
font-semibold
uppercase
tracking-wider
text-white
">

Contact

</h4>



<div className="
space-y-4
text-sm
">


<p className="
flex
gap-3
items-center
text-slate-400
">

<Mail size={16}/>

hello@edupath.global

</p>


<p className="
flex
gap-3
items-center
text-slate-400
">

<Phone size={16}/>

+1 800 555 0199

</p>



<p className="
flex
gap-3
items-center
text-slate-400
">

<MapPin size={16}/>

Global Education Services

</p>


</div>





<div className="
mt-6
flex
gap-3
">


{[
FaLinkedinIn,
FaInstagram,
FaFacebookF,
FaYoutube
].map((Icon,index)=>(


<a

key={index}

href="#"

className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-white/10
transition
hover:bg-brand-600
hover:text-white
"

>

<Icon size={17}/>

</a>


))}


</div>



</div>



</div>







{/* Bottom */}

<div className="
relative
border-t
border-white/10
py-6
text-center
text-xs
text-slate-500
">

© {new Date().getFullYear()} EduPath Global. All rights reserved.

</div>



</footer>

);

};


export default Footer;