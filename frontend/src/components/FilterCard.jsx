import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { SlidersHorizontal, X } from 'lucide-react'

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
  },
  {
    filterType: 'Salary',
    array: ['0-40k', '42-1lakh', '1lakh to 5lakh'],
  },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const dispatch = useDispatch()

  const changeHandler = (value) => setSelectedValue(value)

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue, dispatch])

  const clearFilters = () => {
    setSelectedValue('')
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
          <h2 className="text-xl font-bold text-slate-900">Filter jobs</h2>
        </div>
        {selectedValue && (
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

      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-8">
        {filterData.map((data, index) => (
          <div key={data.filterType}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
              {data.filterType}
            </h3>
            <div className="space-y-2.5">
              {data.array.map((item, idx) => {
                const itemId = `filter-${index}-${idx}`
                const isSelected = selectedValue === item
                return (
                  <Label
                    key={itemId}
                    htmlFor={itemId}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-200 ${
                      isSelected
                        ? 'border-[#6A38C2]/50 bg-[#6A38C2]/5 text-slate-900'
                        : 'border-slate-100 bg-slate-50/50 text-slate-600 hover:border-slate-200 hover:bg-slate-100/50'
                    }`}
                  >
                    <RadioGroupItem value={item} id={itemId} className="border-2 border-slate-300" />
                    <span className="font-medium">{item}</span>
                  </Label>
                )
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </motion.aside>
  )
}

export default FilterCard
