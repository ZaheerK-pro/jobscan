import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const HeroSection = () => {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-[#8B5CF6]/20 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-32 right-[15%] w-96 h-96 rounded-full bg-[#6A38C2]/15 blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#A78BFA]/10 blur-3xl pointer-events-none" />
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(106,56,194,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(106,56,194,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-20 sm:pb-28 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border-[#6A38C2]/20 text-[#6A38C2] font-semibold text-base sm:text-lg mb-6 sm:mb-8 shadow-lg shadow-[#6A38C2]/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6A38C2] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6A38C2]" />
          </span>
          No. 1 Job Hunt Website
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-6 sm:mb-8"
        >
          Search, Apply & <br className="hidden sm:block" />
          Get Your <span className="text-gradient">Dream Job</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12 font-medium"
        >
          Find thousands of real jobs from top companies. One place to search, apply, and track your applications—all for free.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex w-full max-w-xl sm:max-w-2xl mx-auto rounded-2xl p-2 glass shadow-glow border-[#6A38C2]/20 focus-within:shadow-glow-lg focus-within:border-[#6A38C2]/40 transition-all duration-300"
        >
          <input
            type="text"
            placeholder="Job title, keyword, or company"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
            className="flex-1 outline-none border-none bg-transparent py-4 pl-5 sm:pl-6 text-base sm:text-lg placeholder:text-slate-400 text-slate-900"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] hover:from-[#5a2fb0] hover:to-[#7c3aed] px-6 sm:px-8 py-4 text-base font-semibold shrink-0 shadow-lg shadow-[#6A38C2]/30 hover:shadow-xl hover:shadow-[#6A38C2]/40 transition-all duration-300"
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-sm sm:text-base text-slate-500 flex flex-wrap items-center justify-center gap-2"
        >
          <span>Try:</span>
          {['Frontend Developer', 'Data Science', 'Full Stack', 'Graphic Designer'].map((term, i) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setQuery(term)
                dispatch(setSearchedQuery(term))
                navigate('/browse')
              }}
              className="px-3 py-1 rounded-full bg-slate-100 hover:bg-[#6A38C2]/10 hover:text-[#6A38C2] text-slate-600 transition-colors"
            >
              {term}
            </button>
          ))}
        </motion.p>
      </div>
    </section>
  )
}

export default HeroSection
