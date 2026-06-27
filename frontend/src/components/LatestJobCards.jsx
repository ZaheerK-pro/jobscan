import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate()
  return (
    <motion.div
      onClick={() => navigate(`/description/${job?.id ?? job._id}`)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative cursor-pointer rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-[#6A38C2]/30 hover:shadow-xl hover:shadow-[#6A38C2]/10"
    >
      <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#6A38C2]/10 text-[#6A38C2]">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div>
        <h3 className="font-bold text-lg text-slate-900">{job?.company?.name}</h3>
        <p className="text-sm text-slate-500">India</p>
      </div>
      <div className="mt-4">
        <h3 className="font-bold text-xl text-slate-900 my-2">{job?.title}</h3>
        <p className="text-sm text-slate-600 line-clamp-2">{job?.description}</p>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Badge className="border border-blue-200 bg-blue-50 text-blue-700 font-semibold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="border border-rose-200 bg-rose-50 text-rose-700 font-semibold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="border border-violet-200 bg-violet-50 text-[#6A38C2] font-semibold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  )
}

export default LatestJobCards
