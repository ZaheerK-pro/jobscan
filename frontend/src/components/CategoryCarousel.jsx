import React from 'react'
import { motion } from 'framer-motion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
  'Frontend Developer',
  'Backend Developer',
  'Data Science',
  'Graphic Designer',
  'FullStack Developer',
]

const CategoryCarousel = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 sm:-ml-4">
          {category.map((cat, index) => (
            <CarouselItem key={cat} className="pl-2 sm:pl-4 md:basis-1/2 lg:basis-1/3">
              <motion.button
                type="button"
                onClick={() => searchJobHandler(cat)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 text-left font-semibold text-slate-700 shadow-md shadow-slate-200/50 transition-all duration-200 hover:border-[#6A38C2]/40 hover:bg-gradient-to-r hover:from-[#6A38C2]/5 hover:to-[#8B5CF6]/5 hover:shadow-lg hover:shadow-[#6A38C2]/15"
              >
                {cat}
              </motion.button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="border-2 border-slate-200 bg-white shadow-lg hover:bg-slate-50 hover:border-[#6A38C2]/30" />
        <CarouselNext className="border-2 border-slate-200 bg-white shadow-lg hover:bg-slate-50 hover:border-[#6A38C2]/30" />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
