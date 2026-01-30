import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, UserPlus, Mail, Lock, User, Phone, ImagePlus, Briefcase, Sparkles, ArrowRight } from 'lucide-react'

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const Signup = () => {
  const [input, setInput] = useState({ fullname: '', email: '', phoneNumber: '', password: '', role: '', file: '' })
  const { loading, user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })
  const changeFileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] })

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('fullname', input.fullname)
    formData.append('email', input.email)
    formData.append('phoneNumber', input.phoneNumber)
    formData.append('password', input.password)
    formData.append('role', input.role)
    if (input.file) formData.append('file', input.file)
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true })
      if (res.data.success) { navigate('/login'); toast.success(res.data.message) }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Sign up failed')
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => { if (user) navigate('/') }, [user, navigate])

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left: gradient brand panel */}
        <div className="hidden lg:flex lg:w-[48%] flex-col justify-between relative overflow-hidden bg-gradient-to-br from-purple-900 via-[#5B21B6] to-violet-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-90" />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-white blur-3xl" />
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.18, 0.08] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-20 bottom-1/4 h-64 w-64 rounded-full bg-purple-400 blur-3xl" />
          <div className="relative z-10 p-10 xl:p-14">
            <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <span className="text-2xl font-bold">Job<span className="text-purple-300">Scan</span></span>
            </Link>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="mt-20">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-amber-300" />
                Join JobScan
              </div>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white xl:text-5xl">
                Create your free account
              </h1>
              <p className="mt-4 max-w-sm text-lg text-white/70">
                One profile. Thousands of jobs. Start applying in minutes.
              </p>
              <ul className="mt-10 space-y-4">
                {['One profile for all applications', 'Get hired by top companies', 'Track every application'].map((text, i) => (
                  <motion.li key={text} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex items-center gap-3 text-white/80">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-sm font-bold text-white">{i + 1}</span>
                    {text}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          <div className="relative z-10 p-10 xl:p-14">
            <p className="text-sm text-white/50">© JobScan. Find your dream job.</p>
          </div>
        </div>

        {/* Right: form */}
        <div className="flex flex-1 items-center justify-center overflow-y-auto bg-gradient-to-br from-slate-100 via-slate-50 to-purple-50/40 px-4 py-10 lg:py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-[420px]">
            <div className="mb-6 text-center lg:hidden">
              <span className="text-2xl font-bold text-slate-900">Job<span className="text-[#6A38C2]">Scan</span></span>
              <p className="mt-2 text-sm text-slate-500">Create your account</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-sm sm:p-8">
              <div className="mb-6 lg:mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] text-white shadow-lg shadow-[#6A38C2]/25">
                  <UserPlus className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-xl font-bold text-slate-900">Sign up</h2>
                <p className="mt-1 text-sm text-slate-500">Fill in your details to get started</p>
              </div>

              <form onSubmit={submitHandler}>
                <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                  {[
                    { id: 'fullname', label: 'Full name', icon: User, name: 'fullname', type: 'text', placeholder: 'John Doe', required: true },
                    { id: 'email', label: 'Email', icon: Mail, name: 'email', type: 'email', placeholder: 'you@example.com', required: true },
                    { id: 'phoneNumber', label: 'Phone', icon: Phone, name: 'phoneNumber', type: 'text', placeholder: '8080808080', required: false },
                    { id: 'password', label: 'Password', icon: Lock, name: 'password', type: 'password', placeholder: '••••••••', required: true },
                  ].map((field) => {
                    const Icon = field.icon
                    return (
                      <motion.div key={field.id} variants={item}>
                        <Label htmlFor={field.id} className="text-xs font-semibold uppercase tracking-wider text-slate-600">{field.label}</Label>
                        <div className="relative mt-1.5">
                          <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <Input id={field.id} type={field.type} name={field.name} value={input[field.name]} onChange={changeEventHandler} placeholder={field.placeholder} required={field.required} className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50/80 pl-10 text-sm focus:border-[#6A38C2] focus:bg-white focus:ring-2 focus:ring-[#6A38C2]/20" />
                        </div>
                      </motion.div>
                    )
                  })}

                  <motion.div variants={item}>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">I am a</Label>
                    <div className="mt-2 flex gap-2">
                      <label className="flex flex-1 cursor-pointer">
                        <input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className="peer sr-only" />
                        <span className="flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-slate-200 bg-slate-50/80 py-2.5 text-xs font-semibold text-slate-600 transition-all peer-checked:border-[#6A38C2] peer-checked:bg-[#6A38C2]/15 peer-checked:text-[#6A38C2] peer-checked:shadow-md peer-checked:shadow-[#6A38C2]/15">
                          <User className="h-3.5 w-3.5" /> Job seeker
                        </span>
                      </label>
                      <label className="flex flex-1 cursor-pointer">
                        <input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} className="peer sr-only" />
                        <span className="flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-slate-200 bg-slate-50/80 py-2.5 text-xs font-semibold text-slate-600 transition-all peer-checked:border-[#6A38C2] peer-checked:bg-[#6A38C2]/15 peer-checked:text-[#6A38C2] peer-checked:shadow-md peer-checked:shadow-[#6A38C2]/15">
                          <Briefcase className="h-3.5 w-3.5" /> Recruiter
                        </span>
                      </label>
                    </div>
                  </motion.div>

                  <motion.div variants={item}>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Profile photo (optional)</Label>
                    <label className="mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/80 py-4 px-3 transition-colors hover:border-[#6A38C2]/40 hover:bg-[#6A38C2]/5">
                      <input type="file" accept="image/*" onChange={changeFileHandler} className="sr-only" />
                      <ImagePlus className="h-6 w-6 text-slate-400" />
                      <span className="mt-1.5 text-xs font-medium text-slate-500">{input.file ? input.file.name : 'Click to upload'}</span>
                    </label>
                  </motion.div>

                  <motion.div variants={item}>
                    <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] text-sm font-semibold shadow-lg shadow-[#6A38C2]/25 hover:shadow-xl hover:shadow-[#6A38C2]/30 disabled:opacity-80">
                      {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...</> : <><span>Create account</span><ArrowRight className="ml-2 h-4 w-4" /></>}
                    </Button>
                  </motion.div>
                </motion.div>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account? <Link to="/login" className="font-semibold text-[#6A38C2] hover:underline">Sign in</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Signup
