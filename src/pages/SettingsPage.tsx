import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMoon, HiSun, HiUser, HiMail, HiCheck } from 'react-icons/hi';
import { HiOutlineCog } from 'react-icons/hi';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassCard, Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';

export function SettingsPage() {
  const { theme, toggleTheme, user, setUser, progressPercentage, roadmap } = useApp();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setUser({ ...user, name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const settingsSections = [
    { icon: <HiUser className="w-5 h-5" />, title: 'Profile', desc: 'Update your personal information' },
    { icon: <HiOutlineCog className="w-5 h-5" />, title: 'Appearance', desc: 'Customize your visual experience' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a] text-slate-900 dark:text-white">
      <Navbar />

      <div className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <HiOutlineCog className="w-7 h-7 text-cyan-500" /> Settings
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Manage your profile and app preferences.</p>
        </motion.div>

        {/* Appearance */}
        <GlassCard className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center text-cyan-500">
              <HiOutlineCog className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Appearance</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Choose your preferred theme</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => theme !== 'light' && toggleTheme()}
              className={`p-5 rounded-2xl border-2 transition-all ${
                theme === 'light'
                  ? 'border-cyan-400 bg-cyan-50/50 ring-2 ring-cyan-400/20'
                  : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <HiSun className="w-6 h-6 text-amber-500" />
                {theme === 'light' && <HiCheck className="w-5 h-5 text-cyan-500" />}
              </div>
              <div className="text-sm font-semibold">Light Mode</div>
              <div className="text-xs text-slate-500 mt-1">Bright and clean interface</div>
            </button>

            <button
              onClick={() => theme !== 'dark' && toggleTheme()}
              className={`p-5 rounded-2xl border-2 transition-all ${
                theme === 'dark'
                  ? 'border-cyan-400 bg-cyan-500/5 ring-2 ring-cyan-400/20'
                  : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <HiMoon className="w-6 h-6 text-indigo-400" />
                {theme === 'dark' && <HiCheck className="w-5 h-5 text-cyan-500" />}
              </div>
              <div className="text-sm font-semibold">Dark Mode</div>
              <div className="text-xs text-slate-500 mt-1">Easy on the eyes, perfect for night</div>
            </button>
          </div>
        </GlassCard>

        {/* Profile */}
        <GlassCard className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center text-cyan-500">
              <HiUser className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Profile</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Update your personal information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <HiUser className="w-4 h-4 text-cyan-500" /> Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-400 transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <HiMail className="w-4 h-4 text-cyan-500" /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-400 transition-all"
              />
            </div>

            <Button onClick={handleSave} className="w-full">
              {saved ? <><HiCheck className="w-4 h-4" /> Saved!</> : 'Save Changes'}
            </Button>
          </div>
        </GlassCard>

        {/* Stats */}
        {roadmap && (
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold mb-4">Your Stats</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-xl bg-slate-100 dark:bg-white/5">
                <div className="text-2xl font-bold text-cyan-500">{progressPercentage}%</div>
                <div className="text-xs text-slate-500">Roadmap Progress</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-slate-100 dark:bg-white/5">
                <div className="text-2xl font-bold text-blue-500">{roadmap.nodes.length}</div>
                <div className="text-xs text-slate-500">Total Milestones</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-slate-100 dark:bg-white/5">
                <div className="text-2xl font-bold text-emerald-500">{roadmap.career.split(' ')[0]}</div>
                <div className="text-xs text-slate-500">Active Career</div>
              </div>
            </div>
          </GlassCard>
        )}
      </div>

      <Footer />
    </div>
  );
}
