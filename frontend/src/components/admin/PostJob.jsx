import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2, ArrowLeft, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote', 'Freelance']
const EXPERIENCE_OPTIONS = [
  { value: 0, label: '0 years (Fresher)' },
  { value: 1, label: '1 year' },
  { value: 2, label: '2 years' },
  { value: 3, label: '3 years' },
  { value: 5, label: '5 years' },
  { value: 10, label: '10+ years' },
]

const PostJob = () => {
  useGetAllCompanies()
  const { companies } = useSelector((store) => store.company)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: 1,
    companyId: '',
  })

  const changeHandler = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: name === 'position' ? (value === '' ? '' : Number(value)) : value }))
  }

  const selectCompanyHandler = (companyId) => {
    setInput((prev) => ({ ...prev, companyId }))
  }

  const selectJobTypeHandler = (value) => {
    setInput((prev) => ({ ...prev, jobType: value }))
  }

  const selectExperienceHandler = (value) => {
    setInput((prev) => ({ ...prev, experience: value === '' ? '' : Number(value) }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const payload = {
      ...input,
      salary: input.salary === '' ? 0 : Number(input.salary),
      position: input.position === '' ? 1 : Number(input.position),
      experience: input.experience === '' ? 0 : Number(input.experience),
    }
    if (!payload.companyId || !payload.title || !payload.description || !payload.location || !payload.jobType) {
      toast.error('Please fill required fields: title, description, location, job type, and company.')
      return
    }
    try {
      setLoading(true)
      const res = await axios.post(`${JOB_API_END_POINT}/post`, payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/jobs')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post job')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/50"
        >
          <div className="flex items-center gap-4 mb-8">
            <Button asChild variant="ghost" size="icon" className="rounded-xl shrink-0">
              <Link to="/admin/jobs">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] text-white">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Post a new job</h1>
                <p className="text-sm text-slate-600">Fill in the details below to publish your job.</p>
              </div>
            </div>
          </div>

          {companies?.length === 0 ? (
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6 text-center">
              <p className="text-amber-800 font-semibold">Register a company first</p>
              <p className="text-sm text-amber-700 mt-1">You need at least one company before posting a job.</p>
              <Button asChild className="mt-4 rounded-xl bg-[#6A38C2] hover:bg-[#5a2db8]">
                <Link to="/admin/companies/create">Create company</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={submitHandler} className="space-y-8">
              {/* Basic info */}
              <div className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Basic info</h2>
                <div>
                  <Label htmlFor="title" className="text-slate-700">Job title *</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    value={input.title}
                    onChange={changeHandler}
                    placeholder="e.g. Senior Frontend Developer"
                    className="mt-1.5 rounded-xl border-2 border-slate-200 focus-visible:ring-[#6A38C2]/30"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-slate-700">Description *</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={input.description}
                    onChange={changeHandler}
                    placeholder="Describe the role and responsibilities..."
                    rows={4}
                    className="mt-1.5 flex w-full rounded-xl border-2 border-slate-200 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A38C2]/30 focus-visible:ring-offset-0"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="requirements" className="text-slate-700">Requirements</Label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={input.requirements}
                    onChange={changeHandler}
                    placeholder="Comma-separated: React, Node.js, 2+ years..."
                    rows={2}
                    className="mt-1.5 flex w-full rounded-xl border-2 border-slate-200 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A38C2]/30 focus-visible:ring-offset-0"
                  />
                  <p className="text-xs text-slate-500 mt-1">Separate multiple requirements with commas.</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location" className="text-slate-700">Location *</Label>
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      value={input.location}
                      onChange={changeHandler}
                      placeholder="e.g. Remote, Mumbai"
                      className="mt-1.5 rounded-xl border-2 border-slate-200 focus-visible:ring-[#6A38C2]/30"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="salary" className="text-slate-700">Salary (LPA)</Label>
                    <Input
                      id="salary"
                      name="salary"
                      type="number"
                      min={0}
                      step={0.5}
                      value={input.salary}
                      onChange={changeHandler}
                      placeholder="e.g. 12"
                      className="mt-1.5 rounded-xl border-2 border-slate-200 focus-visible:ring-[#6A38C2]/30"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-700">Job type *</Label>
                    <Select value={input.jobType} onValueChange={selectJobTypeHandler} required>
                      <SelectTrigger className="mt-1.5 rounded-xl border-2 border-slate-200 focus:ring-[#6A38C2]/30">
                        <SelectValue placeholder="Select type" />
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
                  <div>
                    <Label className="text-slate-700">Experience (years)</Label>
                    <Select
                      value={input.experience === '' ? '' : String(input.experience)}
                      onValueChange={(v) => selectExperienceHandler(v)}
                    >
                      <SelectTrigger className="mt-1.5 rounded-xl border-2 border-slate-200 focus:ring-[#6A38C2]/30">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXPERIENCE_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={String(opt.value)} className="rounded-lg">
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="position" className="text-slate-700">No. of positions</Label>
                    <Input
                      id="position"
                      name="position"
                      type="number"
                      min={1}
                      value={input.position}
                      onChange={changeHandler}
                      className="mt-1.5 rounded-xl border-2 border-slate-200 focus-visible:ring-[#6A38C2]/30"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-700">Company *</Label>
                    <Select value={input.companyId} onValueChange={selectCompanyHandler} required>
                      <SelectTrigger className="mt-1.5 rounded-xl border-2 border-slate-200 focus:ring-[#6A38C2]/30">
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        {(companies ?? []).map((company) => (
                          <SelectItem
                            key={company?.id ?? company?._id}
                            value={company?.id ?? company?._id}
                            className="rounded-lg"
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] font-semibold shadow-md hover:shadow-lg h-11"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    'Post job'
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/admin/jobs')} className="rounded-xl border-2 h-11">
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default PostJob
