import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Search, Briefcase, Building2, Plus, FileText } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { setSearchedQuery } from '@/redux/jobSlice'
import { toast } from 'sonner'

const Navbar = () => {
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const handleSearchSubmit = (e) => {
    e?.preventDefault?.()
    if (user?.role !== 'student') return
    dispatch(setSearchedQuery(searchQuery.trim()))
    navigate('/browse')
  }

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-semibold transition-colors after:absolute after:left-0 after:bottom-0.5 after:h-0.5 after:bg-[#6A38C2] after:transition-all after:content-[""] ${
      isActive
        ? 'text-[#6A38C2] after:w-full'
        : 'text-slate-600 hover:text-[#6A38C2] after:w-0 hover:after:w-full'
    }`

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm shadow-slate-200/50 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-1.5">
            <span className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Job<span className="bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] bg-clip-text text-transparent">Scan</span>
            </span>
          </Link>

          {/* Center: search (students only) or nav */}
          {user?.role === 'student' && (
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex flex-1 max-w-md mx-4 items-center rounded-xl border-2 border-slate-200 bg-slate-50/50 px-3 py-1.5 focus-within:border-[#6A38C2]/50 focus-within:bg-white transition-colors"
            >
              <Search className="h-4 w-4 text-slate-400 shrink-0 mr-2" />
              <Input
                type="search"
                placeholder="Search jobs, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 min-w-0 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-8 text-sm"
              />
              <Button type="submit" size="sm" className="rounded-lg bg-[#6A38C2] hover:bg-[#5a2db8] text-white h-8 px-3">
                Search
              </Button>
            </form>
          )}

          <nav className="flex items-center overflow-x-auto">
            <ul className="flex items-center gap-3 sm:gap-5 lg:gap-6">
              {!user ? (
                <>
                  <li>
                    <NavLink to="/about" className={navLinkClass}>About</NavLink>
                  </li>
                  <li>
                    <NavLink to="/careers" className={navLinkClass}>Careers</NavLink>
                  </li>
                </>
              ) : user.role === 'recruiter' ? (
                <>
                  <li>
                    <NavLink to="/admin/companies" className={navLinkClass}>Companies</NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/jobs" className={navLinkClass}>Jobs</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/" className={navLinkClass}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/jobs" className={navLinkClass}>Jobs</NavLink>
                  </li>
                  <li>
                    <NavLink to="/browse" className={navLinkClass}>Browse</NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" className={navLinkClass}>About</NavLink>
                  </li>
                  <li>
                    <NavLink to="/careers" className={navLinkClass}>Careers</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {!user ? (
              <>
                <Link to="/login" className="hidden sm:block">
                  <Button variant="outline" className="h-9 rounded-lg border-2 border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:border-[#6A38C2]/40 hover:bg-[#6A38C2]/5 hover:text-[#6A38C2]">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="h-9 rounded-lg bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] px-4 text-sm font-semibold shadow-md shadow-[#6A38C2]/20 hover:shadow-lg hover:shadow-[#6A38C2]/25">
                    Sign up
                  </Button>
                </Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="rounded-xl ring-2 ring-transparent transition-all hover:ring-[#6A38C2]/30 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]/50"
                    aria-label="Open account menu"
                  >
                    <Avatar className="h-9 w-9 border-2 border-slate-200">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    </Avatar>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-72 rounded-xl border-2 border-slate-200 p-0 shadow-xl shadow-slate-200/50 overflow-hidden" align="end">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-slate-50 to-white border-b border-slate-200">
                    <Avatar className="h-12 w-12 border-2 border-slate-100 shrink-0">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 truncate">{user?.fullname}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.profile?.bio || (user?.role === 'recruiter' ? 'Recruiter' : 'Job seeker')}</p>
                    </div>
                  </div>
                  <div className="p-2">
                    {user?.role === 'student' && (
                      <>
                        <Link to="/profile">
                          <Button variant="ghost" className="w-full justify-start gap-2 text-slate-700 hover:bg-[#6A38C2]/10 hover:text-[#6A38C2] rounded-lg">
                            <User2 className="h-4 w-4" />
                            View profile
                          </Button>
                        </Link>
                        <Link to="/profile">
                          <Button variant="ghost" className="w-full justify-start gap-2 text-slate-700 hover:bg-[#6A38C2]/10 hover:text-[#6A38C2] rounded-lg">
                            <FileText className="h-4 w-4" />
                            My applications
                          </Button>
                        </Link>
                        <Link to="/browse">
                          <Button variant="ghost" className="w-full justify-start gap-2 text-slate-700 hover:bg-[#6A38C2]/10 hover:text-[#6A38C2] rounded-lg">
                            <Briefcase className="h-4 w-4" />
                            Browse jobs
                          </Button>
                        </Link>
                      </>
                    )}
                    {user?.role === 'recruiter' && (
                      <>
                        <Link to="/admin/jobs/create">
                          <Button variant="ghost" className="w-full justify-start gap-2 text-slate-700 hover:bg-[#6A38C2]/10 hover:text-[#6A38C2] rounded-lg">
                            <Plus className="h-4 w-4" />
                            Post a job
                          </Button>
                        </Link>
                        <Link to="/admin/companies">
                          <Button variant="ghost" className="w-full justify-start gap-2 text-slate-700 hover:bg-[#6A38C2]/10 hover:text-[#6A38C2] rounded-lg">
                            <Building2 className="h-4 w-4" />
                            Companies
                          </Button>
                        </Link>
                        <Link to="/admin/jobs">
                          <Button variant="ghost" className="w-full justify-start gap-2 text-slate-700 hover:bg-[#6A38C2]/10 hover:text-[#6A38C2] rounded-lg">
                            <Briefcase className="h-4 w-4" />
                            My jobs
                          </Button>
                        </Link>
                      </>
                    )}
                    <div className="h-px bg-slate-200 my-1" />
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg"
                      onClick={logoutHandler}
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6A38C2]/20 to-transparent" />
      </header>
      <div className="h-16 shrink-0" aria-hidden="true" />
    </>
  )
}

export default Navbar
