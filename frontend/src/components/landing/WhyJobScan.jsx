import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Zap, FileCheck, Building2 } from 'lucide-react'

const features = [
  {
    icon: Briefcase,
    title: 'Real jobs from real companies',
    description: 'Every listing is posted by verified companies. No spam, no fake postings—just genuine opportunities that match your skills and goals.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Zap,
    title: 'Apply in minutes',
    description: 'Create one profile and apply to multiple jobs quickly. Save time with a simple application flow and track all your applications in one place.',
    gradient: 'from-purple-500 to-fuchsia-500',
  },
  {
    icon: FileCheck,
    title: 'Track your applications',
    description: 'See the status of every application at a glance. Know when employers view your profile and never lose track of where you applied.',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    icon: Building2,
    title: 'For job seekers & recruiters',
    description: "Whether you're looking for your next role or hiring talent, JobScan connects the right people with the right opportunities.",
    gradient: 'from-indigo-500 to-violet-500',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const WhyJobScan = () => {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6A38C2]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#6A38C2]/10 text-[#6A38C2] font-semibold text-sm uppercase tracking-wider mb-6">
            Why us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight">
            Why choose <span className="text-gradient">JobScan</span>?
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We built JobScan to make job hunting simple, transparent, and effective. Here's what makes us different.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={item}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] opacity-0 group-hover:opacity-20 blur transition duration-500" />
                <div className="relative h-full rounded-2xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-lg shadow-slate-200/50 group-hover:shadow-xl group-hover:shadow-[#6A38C2]/10 group-hover:border-[#6A38C2]/30 transition-all duration-300 group-hover:-translate-y-1">
                  <div className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-[2px] shadow-lg`}>
                    <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center">
                      <Icon className="w-7 h-7 text-[#6A38C2]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-5 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyJobScan
