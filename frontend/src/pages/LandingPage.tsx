import { Link } from 'react-router-dom';
import { FileText, Sparkles, Download, CheckCircle, Star, ArrowRight, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Navbar } from '../components/layout/Navbar';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Zap className="w-3 h-3" />
            NEW AI ENGINE V2.0
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Build a Professional Resume<br />
            <span className="text-blue-600">in Minutes with AI</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Stop struggling with words. Let our AI write your experience, skills, and summary
            instantly so you can land your dream job faster.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Link to="/signup">
              <Button size="lg" className="gap-2 shadow-lg shadow-blue-200 text-base px-8 py-3.5">
                <Sparkles className="w-5 h-5" />
                Create My Resume
              </Button>
            </Link>
            <Link to="#demo">
              <Button variant="outline" size="lg" className="text-base px-8 py-3.5">
                View Samples
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-400">No credit card required &bull; 10,000+ resumes created</p>
        </div>

        {/* Mock App Preview */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16" id="demo">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-200">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="grid grid-cols-2 min-h-[320px]">
              <div className="p-8 border-r border-gray-100 flex flex-col justify-center">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-4 h-4 text-gray-500" />
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Your Rough Input</p>
                <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-500 leading-relaxed border border-gray-100">
                  Worked at TechCorp for 3 years doing marketing stuff. managed a team of 5 people. we increased
                  sales by 20 percent.<br /><br />
                  skills: photoshop, excel, writing.<br />
                  education: university of texas, 2018.
                </div>
                <div className="flex items-center gap-1.5 mt-4 text-xs text-blue-600 font-medium">
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-2.5 h-2.5 text-white" />
                  </div>
                  AI Processing...
                </div>
              </div>
              <div className="p-8 relative flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300" />
                  <div>
                    <div className="h-3 w-28 bg-gray-800 rounded mb-1" />
                    <div className="h-2 w-20 bg-blue-200 rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-gray-200 rounded" />
                  <div className="h-2 w-4/5 bg-gray-200 rounded" />
                  <div className="h-2 w-3/5 bg-gray-200 rounded" />
                  <div className="mt-3 h-2 w-full bg-gray-100 rounded" />
                  <div className="h-2 w-5/6 bg-gray-100 rounded" />
                  <div className="h-2 w-4/5 bg-gray-100 rounded" />
                  <div className="mt-3 h-2 w-3/4 bg-gray-100 rounded" />
                  <div className="h-2 w-full bg-gray-100 rounded" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200">
                  <CheckCircle className="w-3 h-3" />
                  ATS OPTIMIZED
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to get hired</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Our platform combines powerful AI with expert design principles to ensure your resume stands out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="w-6 h-6 text-blue-600" />,
                bg: 'bg-blue-50',
                title: 'AI Writing Assistant',
                desc: 'Generate professional summaries and bullet points tailored to your specific job role with a single click. No more writer\'s block.',
              },
              {
                icon: <CheckCircle className="w-6 h-6 text-sky-600" />,
                bg: 'bg-sky-50',
                title: 'ATS-Friendly Templates',
                desc: 'Our designs are tested against Applicant Tracking Systems to ensure your resume gets read by humans, not filtered by bots.',
              },
              {
                icon: <Download className="w-6 h-6 text-teal-600" />,
                bg: 'bg-teal-50',
                title: 'Instant PDF Download',
                desc: 'Export your polished resume in high-quality PDF format instantly. Ready to send to recruiters or upload to job portals.',
              },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-5`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold tracking-widest text-gray-400 uppercase mb-8">
            Trusted by job seekers at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {['CompanyA', 'TechGlobal', 'Innovate', 'FutureWorks'].map((c) => (
              <div key={c} className="flex items-center gap-2 text-gray-400">
                <Star className="w-4 h-4" />
                <span className="text-sm font-semibold">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to land your next job?</h2>
          <p className="text-blue-100 text-lg mb-10">
            Join thousands of professionals who have accelerated their careers with our AI resume builder.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-base px-10 py-3.5 shadow-lg">
              Build My Resume for Free
            </Button>
          </Link>
          <p className="text-blue-200 text-sm mt-4">No hidden fees for basic templates.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-white">ResumateAI</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">
                Helping professionals craft the perfect narrative for their careers through the power of artificial intelligence.
              </p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Templates', 'Pricing', 'Reviews'] },
              { title: 'Resources', links: ['Resume Guide', 'Career Blog', 'Interview Prep', 'Cover Letters'] },
              { title: 'Company', links: ['About Us', 'Contact', 'Privacy', 'Terms'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-white mb-4 text-sm">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm hover:text-white transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">&copy; 2024 ResumateAI Inc. All rights reserved.</p>
            <div className="flex gap-6 text-xs">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
