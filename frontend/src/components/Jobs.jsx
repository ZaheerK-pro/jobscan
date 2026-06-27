import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Briefcase, Search } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const Jobs = () => {
  useGetAllJobs()
  const { allJobs, searchedQuery } = useSelector((store) => store.job)
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState(searchedQuery ?? '')
  const [filterLocation, setFilterLocation] = useState('All')
  const [filterJobType, setFilterJobType] = useState('All')

  const filterJobs = useMemo(() => {
    let list = allJobs ?? []
    const q = searchInput?.trim()?.toLowerCase()
    if (q) {
      list = list.filter(
        (job) =>
          job.title?.toLowerCase().includes(q) ||
          job.description?.toLowerCase().includes(q) ||
          job.location?.toLowerCase().includes(q) ||
          job.company?.name?.toLowerCase().includes(q)
      )
    }
    if (filterLocation && filterLocation !== 'All') {
      list = list.filter((job) => job?.location === filterLocation)
    }
    if (filterJobType && filterJobType !== 'All') {
      list = list.filter((job) => job?.jobType === filterJobType)
    }
    return list
  }, [allJobs, searchInput, filterLocation, filterJobType])

  const handleSearch = () => {
    dispatch(setSearchedQuery(searchInput.trim()))
  }

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
                  placeholder="Job title, company, location..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
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
          </div>
        </motion.section>

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
                Find your <span className="bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] bg-clip-text text-transparent">next role</span>
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
              <FilterCard
                allJobs={allJobs}
                filterLocation={filterLocation}
                filterJobType={filterJobType}
                onLocationChange={setFilterLocation}
                onJobTypeChange={setFilterJobType}
              />
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
                      key={job?.id ?? job?._id}
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
