import { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { navLinks } from '../../constants'

gsap.registerPlugin(ScrollTrigger)

const Navbar = () => {
  const [open, setOpen] = useState(false)

  useGSAP(() => {
    gsap.fromTo(
      'nav',
      {
        backgroundColor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(0px)',
        boxShadow: 'none'
      },
      {
        backgroundColor: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(18px)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
        scrollTrigger: {
          trigger: 'nav',
          start: 'bottom top+=10',
          toggleActions: 'play none none reverse'
        },
        duration: 0.6,
        ease: 'power2.out'
      }
    )
  })

  return (
    <nav
      className="
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        w-[92%] max-w-5xl
        rounded-full
        border border-white/20
        bg-white/10
        backdrop-blur-md
        px-4 sm:px-6
        transition-all
      "
    >
      <div className="relative flex items-center justify-between h-12">
        
        <a href="#home" className="flex items-center gap-2 text-white">
         {/* Logo <img src="/images/logo.png" alt="logo" className="h-6 w-6" />*/}
          <span className="font-semibold tracking-wide text-sm sm:text-base">
            Can-GOLF
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="
          hidden md:flex items-center gap-6
          text-[17px] text-white/80
        ">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="hover:text-white transition-colors hover:underline hover:underline-offset-3 "
              >
                {link.title}
              </a>
            </li>

          ))}
		   <li className="block text-black/90 hover:text-white hover:bg-green-500 -mr-5 transition-colors bg-green-600 px-3 rounded-full py-2 hover:border-1 hover:border-white/80"><a href="#book">Book Now</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-300
          ${open ? 'max-h-64 mt-3' : 'max-h-0'}
        `}
      >
        <ul
          className="
            rounded-2xl
            border border-white/20
            bg-white/10
            backdrop-blur-xl
            px-4 py-3
            space-y-3
            text-white/80 text-sm
          "
        >
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="block hover:text-white transition-colors"
              >
                {link.title}
              </a>
			  
            </li>
          ))}
		  <li className="block hover:text-white transition-colors"><a href="#book">Book Now</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
