import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
    }
  }

  const navLinkClass =
    'relative text-sm font-semibold text-slate-600 transition-colors hover:text-[#6A38C2] after:absolute after:left-0 after:bottom-0.5 after:h-0.5 after:w-0 after:bg-[#6A38C2] after:transition-all after:content-[""] hover:after:w-full'

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-200/50 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-1.5">
            <span className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Job<span className="bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] bg-clip-text text-transparent">Scan</span>
            </span>
          </Link>

          <nav className="flex flex-1 items-center justify-center overflow-x-auto">
            <ul className="flex items-center gap-4 sm:gap-6 lg:gap-8">
              {user && user.role === 'recruiter' ? (
                <>
                  <li>
                    <Link to="/admin/companies" className={navLinkClass}>
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs" className={navLinkClass}>
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" className={navLinkClass}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs" className={navLinkClass}>
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/browse" className={navLinkClass}>
                      Browse
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className={navLinkClass}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className={navLinkClass}>
                      Careers
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login" className="hidden sm:block">
                  <Button
                    variant="outline"
                    className="h-9 rounded-lg border-2 border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:border-[#6A38C2]/40 hover:bg-[#6A38C2]/5 hover:text-[#6A38C2]"
                  >
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
                <PopoverContent className="w-72 rounded-xl border-2 border-slate-200 p-4 shadow-xl shadow-slate-200/50" align="end">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                    <Avatar className="h-12 w-12 border-2 border-slate-100">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 truncate">{user?.fullname}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.profile?.bio || 'JobScan member'}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col gap-0.5">
                    {user?.role === 'student' && (
                      <Link to="/profile">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-slate-700 hover:bg-[#6A38C2]/10 hover:text-[#6A38C2]">
                          <User2 className="h-4 w-4" />
                          View profile
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-slate-700 hover:bg-red-50 hover:text-red-600"
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
      {/* Spacer so content is not hidden under fixed header */}
      <div className="h-16 shrink-0" aria-hidden="true" />
    </>
  )
}

export default Navbar
