import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { Briefcase } from 'lucide-react'

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs)

  useEffect(() => {
    if (searchedQuery) {
      const filtered = allJobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchedQuery.toLowerCase())
      )
      setFilterJobs(filtered)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Page header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] text-white shadow-lg shadow-[#6A38C2]/25">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Find your <span className="text-gradient">next role</span>
              </h1>
              <p className="text-slate-600 mt-0.5">
                {filterJobs.length} {filterJobs.length === 1 ? 'job' : 'jobs'} found
              </p>
            </div>
          </div>
          <div className="h-px mt-6 bg-gradient-to-r from-[#6A38C2]/20 via-slate-200 to-transparent" />
        </motion.header>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Sidebar - filters */}
          <div className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24">
              <FilterCard />
            </div>
          </div>

          {/* Job grid */}
          <div className="flex-1 min-w-0">
            {filterJobs.length <= 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-20 px-6 text-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-200/80 text-slate-400 mb-6">
                  <Briefcase className="h-10 w-10" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">No jobs match your filters</h2>
                <p className="text-slate-600 max-w-sm">
                  Try changing your filters or search to see more results.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job?._id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs
