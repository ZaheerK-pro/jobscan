import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Briefcase, Building2, Plus, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allAdminJobs } = useSelector((store) => store.job);

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      {/* Recruiter jobs dashboard strip */}
      <div className="bg-gradient-to-r from-[#6A38C2]/10 via-[#8B5CF6]/10 to-[#6A38C2]/10 border-b border-[#6A38C2]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#6A38C2]" />
                Your jobs
              </h2>
              <p className="text-slate-600 mt-0.5 text-sm">Post and manage job openings.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-xl bg-white/80 border border-slate-200/80 px-4 py-2.5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6A38C2]/10 text-[#6A38C2]">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Total jobs</p>
                  <p className="text-lg font-bold text-slate-900">{allAdminJobs?.length ?? 0}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => navigate("/admin/jobs/create")}
                  className="rounded-xl border-2 border-[#6A38C2] bg-[#6A38C2] text-white hover:bg-[#5a2db8] hover:border-[#5a2db8] shadow-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New job
                </Button>
                <Button asChild variant="outline" className="rounded-xl border-2 border-[#6A38C2]/30 text-[#6A38C2] hover:bg-[#6A38C2]/5">
                  <Link to="/admin/companies" className="inline-flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Companies
                    <ArrowRight className="h-3.5 w-3.5 opacity-70" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50"
        >
          <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
            <h3 className="text-lg font-semibold text-slate-900">All posted jobs</h3>
            <Input
              className="w-full sm:w-64"
              placeholder="Filter by title or company"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <AdminJobsTable />
        </motion.div>
      </div>
    </div>
  )
}

export default AdminJobs