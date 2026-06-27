import React from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Bookmark, ArrowRight } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate()

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
  }

  const daysAgo = daysAgoFunction(job?.createdAt)
  const timeLabel = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative h-full rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-[#6A38C2]/30 hover:shadow-xl hover:shadow-[#6A38C2]/10"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {timeLabel}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 rounded-full border border-slate-200 text-slate-500 hover:border-[#6A38C2]/30 hover:bg-[#6A38C2]/5 hover:text-[#6A38C2]"
          aria-label="Save for later"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-slate-100 bg-slate-50">
          <Avatar className="h-10 w-10">
            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
          </Avatar>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-900 truncate">{job?.company?.name}</h3>
          <p className="text-sm text-slate-500">{job?.location || '—'}</p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-bold text-lg text-slate-900 line-clamp-2">{job?.title}</h3>
        <p className="mt-1 text-sm text-slate-600 line-clamp-2">{job?.description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
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

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          onClick={() => navigate(`/description/${job?.id ?? job?._id}`)}
          className="flex-1 min-w-[100px] rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] font-semibold shadow-lg shadow-[#6A38C2]/25 hover:shadow-xl hover:shadow-[#6A38C2]/30"
        >
          View details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="rounded-xl border-2 border-slate-200 font-semibold hover:border-[#6A38C2]/30 hover:bg-[#6A38C2]/5 hover:text-[#6A38C2]"
        >
          Save for later
        </Button>
      </div>
    </motion.div>
  )
}

export default Job
