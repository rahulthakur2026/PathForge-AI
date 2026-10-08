import { Link } from 'react-router-dom';
import { HiSparkles } from 'react-icons/hi';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-[#0a0e1a]/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <HiSparkles className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                PathForge AI
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
              Reverse-engineer your dream career with AI-powered roadmaps. Built for ambitious learners who want a clear path to success.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors"><FaGithub className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors"><FaTwitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors"><FaLinkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors">Dashboard</Link></li>
              <li><Link to="/roadmap" className="text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors">Roadmap</Link></li>
              <li><Link to="/compare" className="text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors">Compare Careers</Link></li>
              <li><Link to="/timeline" className="text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors">Timeline</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/paths" className="text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors">Career Paths</Link></li>
              <li><Link to="/export" className="text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors">Export Center</Link></li>
              <li><Link to="/settings" className="text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors">Settings</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200/50 dark:border-white/5">
          <p className="text-sm text-center text-slate-500 dark:text-slate-500">
            PathForge AI — Forging careers, one milestone at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}
