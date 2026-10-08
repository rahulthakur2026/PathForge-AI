import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiDownload, HiShare, HiCheckCircle, HiOutlineDocumentText, HiOutlinePhotograph, HiOutlineShare } from 'react-icons/hi';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassCard, Button } from '@/components/ui';
import { Loader } from '@/components/Loader';
import { EmptyState } from '@/components/States';
import { exportRoadmapApi } from '@/services/api';
import { useApp } from '@/context/AppContext';

export function ExportPage() {
  const navigate = useNavigate();
  const { roadmap } = useApp();
  const [loading, setLoading] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a] text-slate-900 dark:text-white">
        <Navbar />
        <div className="pt-20">
          <EmptyState
            icon={<HiDownload className="w-8 h-8" />}
            title="Nothing to Export Yet"
            description="Generate a roadmap first, then come back to export it."
            action={<Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>}
          />
        </div>
      </div>
    );
  }

  const handleExport = async (format: 'pdf' | 'image') => {
    setLoading(format);
    setSuccess(null);
    try {
      const result = await exportRoadmapApi(format, roadmap);
      setSuccess(format);
      setShareUrl(result.url);
    } catch {
      setSuccess(null);
    } finally {
      setLoading(null);
    }
  };

  const handleShare = async () => {
    setLoading('share');
    try {
      const url = `${window.location.origin}/roadmap`;
      setShareUrl(url);
      setSuccess('share');
    } finally {
      setLoading(null);
    }
  };

  const exportOptions = [
    { id: 'pdf', icon: <HiOutlineDocumentText className="w-8 h-8" />, title: 'Export as PDF', desc: 'Download a polished PDF of your complete roadmap with all details.' },
    { id: 'image', icon: <HiOutlinePhotograph className="w-8 h-8" />, title: 'Export as Image', desc: 'Get a high-resolution PNG of your visual skill tree roadmap.' },
    { id: 'share', icon: <HiOutlineShare className="w-8 h-8" />, title: 'Share Roadmap', desc: 'Generate a shareable link to send your roadmap to friends or mentors.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060912] dark:to-[#0a0e1a] text-slate-900 dark:text-white">
      <Navbar />

      <div className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <HiDownload className="w-7 h-7 text-cyan-500" /> Export Center
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Download or share your career roadmap in multiple formats.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {exportOptions.map((opt) => (
            <motion.div key={opt.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <GlassCard className="p-6 h-full flex flex-col" hover>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4">
                  {opt.icon}
                </div>
                <h3 className="text-base font-semibold mb-2">{opt.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex-1">{opt.desc}</p>

                {success === opt.id ? (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                      <HiCheckCircle className="w-4 h-4" /> Success!
                    </div>
                    {shareUrl && (
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-white/5">
                        <input
                          readOnly
                          value={shareUrl}
                          className="flex-1 bg-transparent text-xs text-slate-600 dark:text-slate-300 outline-none truncate"
                        />
                        <button
                          onClick={() => navigator.clipboard?.writeText(shareUrl)}
                          className="text-xs text-cyan-500 hover:underline flex-shrink-0"
                        >Copy</button>
                      </div>
                    )}
                  </div>
                ) : loading === opt.id ? (
                  <div className="mt-4"><Loader text="Processing..." /></div>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() => opt.id === 'share' ? handleShare() : handleExport(opt.id as 'pdf' | 'image')}
                  >
                    {opt.id === 'share' ? <HiShare className="w-4 h-4" /> : <HiDownload className="w-4 h-4" />}
                    {opt.id === 'share' ? 'Share' : 'Export'}
                  </Button>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Roadmap Summary Preview */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold mb-4">Roadmap Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-xl bg-slate-100 dark:bg-white/5">
              <div className="text-xl font-bold text-cyan-500">{roadmap.nodes.length}</div>
              <div className="text-xs text-slate-500">Milestones</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-slate-100 dark:bg-white/5">
              <div className="text-xl font-bold text-blue-500">{roadmap.edges.length}</div>
              <div className="text-xs text-slate-500">Connections</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-slate-100 dark:bg-white/5">
              <div className="text-xl font-bold text-emerald-500">4</div>
              <div className="text-xs text-slate-500">Phases</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-slate-100 dark:bg-white/5">
              <div className="text-xl font-bold text-amber-500">{roadmap.career}</div>
              <div className="text-xs text-slate-500">Career</div>
            </div>
          </div>
        </GlassCard>
      </div>

      <Footer />
    </div>
  );
}
