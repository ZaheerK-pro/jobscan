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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, LogIn, Mail, Lock, User, Briefcase, Sparkles, ArrowRight } from 'lucide-react'

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '', role: '' })
  const { loading, user } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-900">
      <Navbar />

      <main className="flex min-h-0 flex-1">
        {/* Left: gradient brand panel */}
        <div className="hidden lg:flex lg:w-[48%] flex-col justify-between relative overflow-hidden bg-gradient-to-br from-violet-900 via-[#5B21B6] to-purple-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-90" />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-white blur-3xl" />
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-24 bottom-1/3 h-64 w-64 rounded-full bg-purple-400 blur-3xl" />
          <div className="relative z-10 p-10 xl:p-14">
            <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <span className="text-2xl font-bold">Job<span className="text-purple-300">Scan</span></span>
            </Link>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="mt-20">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-amber-300" />
                Welcome back
              </div>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white xl:text-5xl">
                Sign in to find your next role
              </h1>
              <p className="mt-4 max-w-sm text-lg text-white/70">
                Thousands of jobs from top companies. One place to search, apply, and get hired.
              </p>
              <ul className="mt-10 space-y-4">
                {['Real jobs from verified companies', 'Apply in one click', 'Track all your applications'].map((text, i) => (
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
        <div className="flex flex-1 items-center justify-center overflow-y-auto bg-gradient-to-br from-slate-100 via-slate-50 to-purple-50/40 px-4 py-8 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[400px]"
          >
            {/* Mobile brand */}
            <div className="mb-8 text-center lg:hidden">
              <span className="text-2xl font-bold text-slate-900">Job<span className="text-[#6A38C2]">Scan</span></span>
              <p className="mt-2 text-sm text-slate-500">Sign in to continue</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-sm sm:p-8">
              <div className="mb-6 lg:mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] text-white shadow-lg shadow-[#6A38C2]/25">
                  <LogIn className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-xl font-bold text-slate-900">Sign in</h2>
                <p className="mt-1 text-sm text-slate-500">Enter your details to continue</p>
              </div>

              <form onSubmit={submitHandler}>
                <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                  <motion.div variants={item}>
                    <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-600">Email</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input id="email" type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="you@example.com" required className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50/80 pl-10 text-sm focus:border-[#6A38C2] focus:bg-white focus:ring-2 focus:ring-[#6A38C2]/20" />
                    </div>
                  </motion.div>
                  <motion.div variants={item}>
                    <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-600">Password</Label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input id="password" type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="••••••••" required className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50/80 pl-10 text-sm focus:border-[#6A38C2] focus:bg-white focus:ring-2 focus:ring-[#6A38C2]/20" />
                    </div>
                  </motion.div>
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
                    <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] text-sm font-semibold shadow-lg shadow-[#6A38C2]/25 hover:shadow-xl hover:shadow-[#6A38C2]/30 disabled:opacity-80">
                      {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : <><span>Sign in</span><ArrowRight className="ml-2 h-4 w-4" /></>}
                    </Button>
                  </motion.div>
                </motion.div>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-[#6A38C2] hover:underline">Sign up</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default Login
