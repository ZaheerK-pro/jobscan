import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { Button } from './ui/button'
import {
  Target,
  Heart,
  Shield,
  Zap,
  Users,
  ArrowRight,
} from 'lucide-react'

const values = [
  {
    icon: Shield,
    title: 'Trust',
    description: 'We only list jobs from verified companies. No spam, no fake postings—just real opportunities.',
  },
  {
    icon: Zap,
    title: 'Simplicity',
    description: 'One profile, one place to search and apply. We keep job hunting simple so you can focus on what matters.',
  },
  {
    icon: Heart,
    title: 'People first',
    description: 'We build for job seekers and recruiters alike. Your success is our success.',
  },
]

const stats = [
  { value: 'Thousands', label: 'Active job listings' },
  { value: 'Top', label: 'Companies hiring' },
  { value: 'Free', label: 'For job seekers' },
]

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 px-4 pt-16 pb-24 sm:px-6 sm:pt-20 sm:pb-28 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(106,56,194,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(106,56,194,0.12)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6A38C2] blur-3xl"
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm"
          >
            About us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            We help you find your <span className="bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] bg-clip-text text-transparent">dream job</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-white/70 sm:text-xl max-w-2xl mx-auto"
          >
            JobScan connects job seekers with real opportunities from verified companies. One place to search, apply, and track—all for free.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6A38C2]/20 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6A38C2] to-[#8B5CF6] text-white shadow-lg shadow-[#6A38C2]/25">
              <Target className="h-7 w-7" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">
              Our mission
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              We built JobScan to make job hunting simple, transparent, and effective. Everyone deserves a clear path to the right role—we're here to provide it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
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
              What we <span className="text-gradient">believe</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Our values guide everything we do—from the products we build to how we work with job seekers and companies.
            </p>
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((item, index) => {
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

      {/* Stats */}
      <section className="relative py-14 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4C1D95] via-[#6A38C2] to-[#7C3AED]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 text-center">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-white">{item.value}</div>
                <div className="mt-1 text-base sm:text-lg text-white/90">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
              <Users className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">
              Join us
            </h2>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto">
              We're always looking for talented people. Check out open roles or browse jobs from companies we work with.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                className="h-12 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] px-8 text-base font-semibold shadow-lg shadow-[#6A38C2]/25 hover:shadow-xl hover:shadow-[#6A38C2]/30"
              >
                <Link to="/careers">
                  Careers at JobScan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl border-2 border-slate-200 px-8 text-base font-semibold hover:border-[#6A38C2]/40 hover:bg-[#6A38C2]/5 hover:text-[#6A38C2]"
              >
                <Link to="/browse">Browse jobs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About
