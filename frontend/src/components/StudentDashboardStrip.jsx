import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Briefcase, FileText, User, ArrowRight, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const StudentDashboardStrip = () => {
  const { user } = useSelector((store) => store.auth)
  const { allAppliedJobs } = useSelector((store) => store.job)
  const pending = allAppliedJobs?.filter((a) => a?.status === 'pending')?.length ?? 0
  const viewed = allAppliedJobs?.filter((a) => ['viewed', 'accepted', 'rejected'].includes(a?.status))?.length ?? 0

  const quickActions = [
    { to: '/jobs', label: 'Browse jobs', icon: Briefcase },
    { to: '/profile', label: 'My profile', icon: User },
    { to: '/browse', label: 'Search all', icon: TrendingUp },
  ]

  return (
    <div className="bg-gradient-to-r from-[#6A38C2]/10 via-[#8B5CF6]/10 to-[#6A38C2]/10 border-b border-[#6A38C2]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Welcome back, <span className="text-[#6A38C2]">{user?.fullname}</span>
            </h2>
            <p className="text-slate-600 mt-0.5 text-sm">Here’s a quick overview of your activity.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/80 border border-slate-200/80 px-4 py-2.5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6A38C2]/10 text-[#6A38C2]">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Applications</p>
                <p className="text-lg font-bold text-slate-900">{allAppliedJobs?.length ?? 0}</p>
                {(pending > 0 || viewed > 0) && (
                  <p className="text-xs text-slate-600">
                    {pending} pending · {viewed} viewed by recruiter
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-[#6A38C2]/30 bg-white px-4 py-2.5 text-sm font-semibold text-[#6A38C2] shadow-sm transition-all hover:border-[#6A38C2]/50 hover:bg-[#6A38C2]/5 hover:shadow-md"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                    <ArrowRight className="h-3.5 w-3.5 opacity-70" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboardStrip
