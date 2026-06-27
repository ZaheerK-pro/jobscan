import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { Button } from './ui/button'
import {
  Rocket,
  Users,
  Heart,
  GraduationCap,
  Globe,
  Zap,
  ArrowRight,
  Briefcase,
} from 'lucide-react'

const whyJoin = [
  {
    icon: Rocket,
    title: 'Impact',
    description: 'Help thousands of people find their next role. Your work directly shapes how job seekers and companies connect.',
  },
  {
    icon: Users,
    title: 'Team',
    description: 'Join a small, driven team where everyone’s voice matters. We collaborate closely and ship fast.',
  },
  {
    icon: Heart,
    title: 'Mission',
    description: 'We believe finding a job should be simple and transparent. You’ll work on products that make that real.',
  },
]

const benefits = [
  { icon: Globe, title: 'Flexible work', description: 'Remote-friendly and flexible hours so you can do your best work.' },
  { icon: GraduationCap, title: 'Learning', description: 'Budget and time for courses, conferences, and books.' },
  { icon: Heart, title: 'Health & wellness', description: 'Support for your physical and mental health.' },
  { icon: Zap, title: 'Modern stack', description: 'Work with current tools and technologies every day.' },
]

const Careers = () => {
  const { user } = useSelector((store) => store.auth)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 px-4 pt-16 pb-24 sm:px-6 sm:pt-20 sm:pb-28 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(106,56,194,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(106,56,194,0.15)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6A38C2] blur-3xl"
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm"
          >
            We're hiring
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Careers at <span className="bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] bg-clip-text text-transparent">JobScan</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-white/70 sm:text-xl max-w-2xl mx-auto"
          >
            Build your career with us. We're on a mission to make job hunting simpler for everyone—and we want you on the team.
          </motion.p>
        </div>
      </section>

      {/* Why join us */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6A38C2]/20 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Why join <span className="text-gradient">JobScan</span>?
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              We're a small team with a big mission. Here's what it's like to work here.
            </p>
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyJoin.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 transition-shadow hover:shadow-xl hover:shadow-[#6A38C2]/10 hover:border-[#6A38C2]/30 sm:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] text-white shadow-md shadow-[#6A38C2]/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-slate-50/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Benefits & <span className="text-gradient">perks</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              We want you to do your best work. Here's how we support you.
            </p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-[#6A38C2]/30 hover:shadow-md"
                >
                  <Icon className="h-8 w-8 text-[#6A38C2]" />
                  <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open roles CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6A38C2]/20 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white to-purple-50/30 p-10 shadow-xl shadow-slate-200/50 sm:p-14"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] text-white shadow-lg shadow-[#6A38C2]/25">
              <Briefcase className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">
              Open roles at companies we work with
            </h2>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto">
              JobScan helps you find jobs at top companies. Browse thousands of open positions and apply in one click.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {user ? (
                <>
                  <Button
                    asChild
                    className="h-12 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] px-8 text-base font-semibold shadow-lg shadow-[#6A38C2]/25 hover:shadow-xl hover:shadow-[#6A38C2]/30"
                  >
                    <Link to="/browse">
                      Browse all jobs
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-xl border-2 border-slate-200 px-8 text-base font-semibold hover:border-[#6A38C2]/40 hover:bg-[#6A38C2]/5 hover:text-[#6A38C2]"
                  >
                    <Link to="/jobs">Jobs with filters</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    className="h-12 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] px-8 text-base font-semibold shadow-lg shadow-[#6A38C2]/25 hover:shadow-xl hover:shadow-[#6A38C2]/30"
                  >
                    <Link to="/signup">
                      Sign up to browse jobs
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-xl border-2 border-slate-200 px-8 text-base font-semibold hover:border-[#6A38C2]/40 hover:bg-[#6A38C2]/5 hover:text-[#6A38C2]"
                  >
                    <Link to="/signup">Sign up to use filters</Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative border-t border-slate-200 bg-slate-900 py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <p className="text-lg font-medium text-white/90">
            Don't see a fit yet? We're always open to meeting talented people.
          </p>
          <p className="mt-2 text-sm text-white/60">
            Reach out at <a href="mailto:careers@jobscan.example" className="text-[#A78BFA] hover:underline">careers@jobscan.example</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Careers
