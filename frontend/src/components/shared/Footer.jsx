import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const links = {
    'For job seekers': [
      { to: '/', label: 'Home' },
      { to: '/jobs', label: 'Jobs' },
      { to: '/browse', label: 'Browse' },
    ],
    'Company': [
      { to: '/about', label: 'About' },
      { href: '#', label: 'Contact' },
      { to: '/careers', label: 'Careers' },
    ],
  }

  const social = [
    { href: 'https://facebook.com', label: 'Facebook', icon: 'M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z' },
    { href: 'https://twitter.com', label: 'Twitter', icon: 'M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z' },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: 'M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z' },
  ]

  return (
    <footer className="relative border-t border-slate-200 bg-slate-50/80">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6A38C2]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10 lg:gap-16">
          {/* Brand */}
          <div className="max-w-xs">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold text-slate-900">
                Job<span className="text-[#6A38C2]">Scan</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Find your next role. Search jobs, apply in one click, and track your applications—all in one place.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-[#6A38C2]/40 hover:bg-[#6A38C2]/5 hover:text-[#6A38C2]"
                  aria-label={item.label}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d={item.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-10 sm:gap-16">
            {Object.entries(links).map(([heading, items]) => (
              <div key={heading}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  {heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li key={item.label}>
                      {item.to ? (
                        <Link
                          to={item.to}
                          className="text-slate-600 transition-colors hover:text-[#6A38C2]"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className="text-slate-600 transition-colors hover:text-[#6A38C2]"
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-center text-sm text-slate-500">
            © {currentYear} JobScan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
