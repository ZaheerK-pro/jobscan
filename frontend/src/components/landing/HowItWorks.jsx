import React from 'react'
import { motion } from 'framer-motion'
import { Search, Send, PartyPopper } from 'lucide-react'

const steps = [
  {
    step: '1',
    icon: Search,
    title: 'Search jobs',
    description: 'Use the search bar or browse by category. Filter by role, company, or keyword to find openings that fit your experience and interests.',
  },
  {
    step: '2',
    icon: Send,
    title: 'Apply with one click',
    description: 'Sign up once, build your profile, and apply to as many jobs as you want. No need to re-enter your details for every application.',
  },
  {
    step: '3',
    icon: PartyPopper,
    title: 'Get hired',
    description: 'Track your applications and respond when employers reach out. Land interviews and take the next step in your career.',
  },
]

const HowItWorks = () => {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden bg-slate-900">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#6A38C2]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#8B5CF6]/15 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-slate-300 font-semibold text-sm uppercase tracking-wider mb-6">
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight">
            How it <span className="bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] bg-clip-text text-transparent">works</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            From search to offer—three simple steps to move your career forward.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
          {/* Gradient connector line */}
          <div className="hidden md:block absolute top-20 left-[16.666%] right-[16.666%] h-0.5 bg-gradient-to-r from-transparent via-[#6A38C2]/60 to-transparent" />

          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] p-[2px] animate-glow">
                    <div className="w-24 h-24 rounded-3xl bg-slate-900 flex items-center justify-center">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <span className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-[#6A38C2]/50">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-base text-slate-400 leading-relaxed max-w-sm mx-auto">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
