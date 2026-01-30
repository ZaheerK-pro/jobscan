import React, { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { Search, Briefcase } from 'lucide-react'

const Browse = () => {
  useGetAllJobs()
  const { allJobs, searchedQuery } = useSelector((store) => store.job)
  const dispatch = useDispatch()

  const filteredJobs = useMemo(() => {
    if (!searchedQuery?.trim()) return allJobs
    const q = searchedQuery.toLowerCase().trim()
    return allJobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(q) ||
        job.description?.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q) ||
        job.company?.name?.toLowerCase().includes(q)
    )
  }, [allJobs, searchedQuery])

  useEffect(() => {
    return () => dispatch(setSearchedQuery(''))
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] text-white shadow-lg shadow-[#6A38C2]/25">
                <Search className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {searchedQuery ? (
                    <>
                      Search results <span className="text-gradient">for “{searchedQuery}”</span>
                    </>
                  ) : (
                    <>
                      Browse <span className="text-gradient">all jobs</span>
                    </>
                  )}
                </h1>
                <p className="text-slate-600 mt-0.5">
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
                </p>
              </div>
            </div>
          </div>
          <div className="h-px mt-6 bg-gradient-to-r from-[#6A38C2]/20 via-slate-200 to-transparent" />
        </motion.header>

        {/* Job grid */}
        {filteredJobs.length <= 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-20 px-6 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-200/80 text-slate-400 mb-6">
              <Briefcase className="h-10 w-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              {searchedQuery ? 'No jobs match your search' : 'No jobs available yet'}
            </h2>
            <p className="text-slate-600 max-w-sm">
              {searchedQuery
                ? 'Try a different keyword or browse all jobs.'
                : 'Check back soon for new openings.'}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Browse
