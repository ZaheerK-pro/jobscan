import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Building2, Users } from 'lucide-react'

const stats = [
  {
    icon: Briefcase,
    value: 'Thousands',
    label: 'Active job listings',
  },
  {
    icon: Building2,
    value: 'Top',
    label: 'Companies hiring',
  },
  {
    icon: Users,
    value: 'Growing',
    label: 'Community of job seekers',
  },
]

const StatsSection = () => {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#4C1D95] via-[#6A38C2] to-[#7C3AED]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 items-center justify-center mb-5 group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
                  {item.value}
                </div>
                <div className="text-base sm:text-lg text-white/90 font-medium">
                  {item.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
