import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { Search, Briefcase } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const Browse = () => {
  useGetAllJobs()
  const { allJobs, searchedQuery } = useSelector((store) => store.job)
  const dispatch = useDispatch()
  const [localQuery, setLocalQuery] = useState(searchedQuery ?? '')

  useEffect(() => {
    setLocalQuery(searchedQuery ?? '')
  }, [searchedQuery])

  const handleSearch = () => {
    dispatch(setSearchedQuery(localQuery.trim()))
  }

  const filteredJobs = useMemo(() => {
    if (!localQuery?.trim()) return allJobs
    const q = localQuery.toLowerCase().trim()
    return allJobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(q) ||
        job.description?.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q) ||
        job.company?.name?.toLowerCase().includes(q)
    )
  }, [allJobs, localQuery])

  useEffect(() => {
    return () => dispatch(setSearchedQuery(''))
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Search bar */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 sm:p-6 shadow-lg shadow-slate-200/50">
            <label className="block text-sm font-semibold text-slate-700 mb-3">Search jobs</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Job title, company, location, keywords..."
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSearch())}
                  className="pl-10 h-11 rounded-xl border-2 border-slate-200 focus-visible:ring-[#6A38C2]/30 focus-visible:border-[#6A38C2]/50"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="h-11 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] font-semibold shadow-md hover:shadow-lg shrink-0"
              >
                <Search className="h-4 w-4 mr-2 sm:inline" />
                Search
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">Search by role, company name, location or skills</p>
          </div>
        </motion.section>

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
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {localQuery?.trim() ? (
                    <>
                      Results for <span className="text-[#6A38C2]">&ldquo;{localQuery}&rdquo;</span>
                    </>
                  ) : (
                    <>
                      Browse <span className="bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] bg-clip-text text-transparent">all jobs</span>
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
                key={job?.id ?? job._id}
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
