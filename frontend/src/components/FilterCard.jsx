import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { SlidersHorizontal, X } from 'lucide-react'

const JOB_TYPES = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship', 'Remote', 'Freelance']

const FilterCard = ({ allJobs = [], filterLocation, filterJobType, onLocationChange, onJobTypeChange }) => {
  const locations = useMemo(() => {
    const set = new Set()
    ;(allJobs ?? []).forEach((job) => job?.location && set.add(job.location))
    return ['All', ...Array.from(set).sort()]
  }, [allJobs])

  const hasActiveFilters = (filterLocation && filterLocation !== 'All') || (filterJobType && filterJobType !== 'All')

  const clearFilters = () => {
    onLocationChange?.('All')
    onJobTypeChange?.('All')
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] text-white">
            <SlidersHorizontal className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Filters</h2>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-slate-500 hover:text-[#6A38C2]"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6" />

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2 block">Location</Label>
          <Select value={filterLocation || 'All'} onValueChange={(v) => onLocationChange?.(v)}>
            <SelectTrigger className="rounded-xl border-2 border-slate-200 focus:ring-[#6A38C2]/30">
              <SelectValue placeholder="All locations" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc} className="rounded-lg">
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2 block">Job type</Label>
          <Select value={filterJobType || 'All'} onValueChange={(v) => onJobTypeChange?.(v)}>
            <SelectTrigger className="rounded-xl border-2 border-slate-200 focus:ring-[#6A38C2]/30">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              {JOB_TYPES.map((type) => (
                <SelectItem key={type} value={type} className="rounded-lg">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.aside>
  )
}

export default FilterCard
