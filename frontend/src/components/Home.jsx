import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import WhyJobScan from './landing/WhyJobScan'
import HowItWorks from './landing/HowItWorks'
import StatsSection from './landing/StatsSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <WhyJobScan />
      <HowItWorks />
      <StatsSection />
      <section className="relative py-16 sm:py-20 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6A38C2]/20 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Browse by <span className="text-gradient">category</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Jump to popular roles and start your search.
          </p>
        </div>
        <CategoryCarousel />
      </section>
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home