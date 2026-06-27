import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Mail, Phone, Pen, FileText, Briefcase, Upload } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector, useDispatch } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Profile = () => {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false)
  const [importingResume, setImportingResume] = useState(false)
  const fileInputRef = useRef(null)
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.auth)
  const { allAppliedJobs } = useSelector((store) => store.job)
  const pending = allAppliedJobs?.filter((a) => a?.status === 'pending')?.length ?? 0
  const viewed = allAppliedJobs?.filter((a) => ['viewed', 'accepted', 'rejected'].includes(a?.status))?.length ?? 0

  const handleImportResume = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      toast.error('Please select a PDF file.')
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    try {
      setImportingResume(true)
      const res = await axios.post(`${USER_API_END_POINT}/profile/import-resume`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to import resume')
    } finally {
      setImportingResume(false)
      e.target.value = ''
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/50"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-24 w-24 rounded-2xl border-2 border-slate-200 shadow-md">
                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} className="object-cover" />
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{user?.fullname}</h1>
                <p className="text-slate-600 mt-1">{user?.profile?.bio || 'Add a short bio in your profile.'}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-[#6A38C2]" />
                    {user?.email}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-[#6A38C2]" />
                    {user?.phoneNumber}
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="rounded-xl border-2 border-[#6A38C2]/30 text-[#6A38C2] hover:bg-[#6A38C2]/5 hover:border-[#6A38C2]/50 shrink-0"
            >
              <Pen className="h-4 w-4 mr-2" />
              Edit profile
            </Button>
          </div>

          {/* Skills */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((item, index) => (
                  <Badge key={index} variant="secondary" className="rounded-lg px-3 py-1">
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-slate-500 text-sm">No skills added yet.</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">Resume</h3>
            <div className="flex flex-wrap items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleImportResume}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={importingResume}
                className="rounded-xl border-2 border-[#6A38C2]/30 text-[#6A38C2] hover:bg-[#6A38C2]/5"
              >
                {importingResume ? (
                  <>Importing…</>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    {user?.profile?.resume ? 'Replace resume' : 'Import resume'}
                  </>
                )}
              </Button>
              {user?.profile?.resume ? (
                <a
                  href={user.profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#6A38C2] font-medium hover:underline"
                >
                  <FileText className="h-4 w-4" />
                  {user?.profile?.resumeOriginalName || 'View resume'}
                </a>
              ) : (
                <span className="text-slate-500 text-sm">Upload a PDF to auto-fill your profile and use it when you apply.</span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Application stats + Applied jobs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-[#6A38C2]" />
              Applied jobs
            </h2>
            <div className="flex gap-3">
              <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
                Total: {allAppliedJobs?.length ?? 0}
              </span>
              {pending > 0 && (
                <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
                  Pending: {pending}
                </span>
              )}
              {viewed > 0 && (
                <span className="rounded-lg bg-[#6A38C2]/10 px-3 py-1.5 text-sm font-medium text-[#6A38C2]">
                  Viewed: {viewed}
                </span>
              )}
            </div>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
            <AppliedJobTable />
          </div>
        </motion.div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
