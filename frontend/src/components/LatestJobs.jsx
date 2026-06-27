import React from 'react'
import { motion } from 'framer-motion'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job)

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6A38C2]/20 to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
          <span className="text-gradient">Latest & top</span> job openings
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-2xl">
          Fresh roles from verified companies. Apply now and get one step closer to your next opportunity.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allJobs.length <= 0 ? (
          <div className="col-span-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-16 text-center text-slate-500 font-medium">
            No jobs available right now. Check back soon!
          </div>
        ) : (
          allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job?.id ?? job._id} job={job} />)
        )}
      </div>
    </div>
  )
}

export default LatestJobs