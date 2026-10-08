import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Roadmap, Progress, Theme, User, RoadmapInput } from '@/types';
import { supabase } from '@/lib/supabase';

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  roadmap: Roadmap | null;
  setRoadmap: (r: Roadmap | null) => void;
  roadmapInput: RoadmapInput | null;
  setRoadmapInput: (i: RoadmapInput | null) => void;
  progress: Progress[];
  toggleNodeComplete: (nodeId: string) => void;
  isNodeComplete: (nodeId: string) => boolean;
  progressPercentage: number;
  user: User;
  setUser: (u: User) => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: User = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  avatar: '',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('pf-theme') as Theme | null;
    return saved || 'dark';
  });

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [roadmapInput, setRoadmapInput] = useState<RoadmapInput | null>(null);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('pf-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const loadFromDatabase = useCallback(async () => {
    try {
      const [profileRes, inputRes, roadmapRes, progressRes] = await Promise.all([
        supabase.from('user_profiles').select('*').limit(1).maybeSingle(),
        supabase.from('roadmap_inputs').select('*').order('updated_at', { ascending: false }).limit(1).maybeSingle(),
        supabase.from('roadmaps').select('*').order('created_at', { ascending: false }).limit(1).maybeSingle(),
        supabase.from('progress').select('*'),
      ]);

      if (profileRes.data) {
        setUser({
          name: profileRes.data.name,
          email: profileRes.data.email,
          avatar: profileRes.data.avatar || '',
        });
      }

      if (inputRes.data) {
        setRoadmapInput({
          dreamRole: inputRes.data.dream_role,
          dreamRoleKey: inputRes.data.dream_role_key,
          company: inputRes.data.company || undefined,
          timeline: inputRes.data.timeline,
          weeklyHours: inputRes.data.weekly_hours,
          currentSkills: inputRes.data.current_skills || [],
        });
      }

      if (roadmapRes.data) {
        setRoadmap({
          career: roadmapRes.data.career,
          nodes: roadmapRes.data.nodes || [],
          edges: roadmapRes.data.edges || [],
        });
      }

      if (progressRes.data) {
        setProgress(
          progressRes.data
            .filter((p: any) => p.completed)
            .map((p: any) => ({
              nodeId: p.node_id,
              completed: p.completed,
              completedAt: p.completed_at,
            }))
        );
      }
    } catch (err) {
      console.error('Failed to load from database:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFromDatabase();
  }, [loadFromDatabase]);

  useEffect(() => {
    if (!roadmapInput) return;
    const saveInput = async () => {
      try {
        const existing = await supabase.from('roadmap_inputs').select('id').order('updated_at', { ascending: false }).limit(1).maybeSingle();
        if (existing.data) {
          await supabase.from('roadmap_inputs').update({
            dream_role: roadmapInput.dreamRole,
            dream_role_key: roadmapInput.dreamRoleKey || 'other',
            company: roadmapInput.company || null,
            timeline: roadmapInput.timeline,
            weekly_hours: roadmapInput.weeklyHours,
            current_skills: roadmapInput.currentSkills,
            updated_at: new Date().toISOString(),
          }).eq('id', existing.data.id);
        } else {
          await supabase.from('roadmap_inputs').insert({
            dream_role: roadmapInput.dreamRole,
            dream_role_key: roadmapInput.dreamRoleKey || 'other',
            company: roadmapInput.company || null,
            timeline: roadmapInput.timeline,
            weekly_hours: roadmapInput.weeklyHours,
            current_skills: roadmapInput.currentSkills,
          });
        }
      } catch (err) {
        console.error('Failed to save roadmap input:', err);
      }
    };
    saveInput();
  }, [roadmapInput]);

  useEffect(() => {
    if (!roadmap) return;
    const saveRoadmap = async () => {
      try {
        const inputRes = await supabase.from('roadmap_inputs').select('id').order('updated_at', { ascending: false }).limit(1).maybeSingle();
        const existing = await supabase.from('roadmaps').select('id').order('created_at', { ascending: false }).limit(1).maybeSingle();
        if (existing.data) {
          await supabase.from('roadmaps').update({
            career: roadmap.career,
            nodes: roadmap.nodes,
            edges: roadmap.edges,
            input_id: inputRes.data?.id || null,
          }).eq('id', existing.data.id);
        } else {
          await supabase.from('roadmaps').insert({
            career: roadmap.career,
            nodes: roadmap.nodes,
            edges: roadmap.edges,
            input_id: inputRes.data?.id || null,
          });
        }
      } catch (err) {
        console.error('Failed to save roadmap:', err);
      }
    };
    saveRoadmap();
  }, [roadmap]);

  useEffect(() => {
    if (!user) return;
    const saveUser = async () => {
      try {
        const existing = await supabase.from('user_profiles').select('id').limit(1).maybeSingle();
        if (existing.data) {
          await supabase.from('user_profiles').update({
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            updated_at: new Date().toISOString(),
          }).eq('id', existing.data.id);
        } else {
          await supabase.from('user_profiles').insert({
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          });
        }
      } catch (err) {
        console.error('Failed to save user profile:', err);
      }
    };
    saveUser();
  }, [user]);

  const toggleNodeComplete = useCallback((nodeId: string) => {
    setProgress((prev) => {
      const existing = prev.find((p) => p.nodeId === nodeId);
      const nowCompleted = !existing;
      const completedAt = new Date().toISOString();

      (async () => {
        try {
          if (existing) {
            const res = await supabase.from('progress').select('id').eq('node_id', nodeId).maybeSingle();
            if (res.data) {
              await supabase.from('progress').delete().eq('id', res.data.id);
            }
          } else {
            const roadmapRes = await supabase.from('roadmaps').select('id').order('created_at', { ascending: false }).limit(1).maybeSingle();
            await supabase.from('progress').insert({
              node_id: nodeId,
              completed: true,
              completed_at: completedAt,
              roadmap_id: roadmapRes.data?.id || null,
            });
          }
        } catch (err) {
          console.error('Failed to toggle progress:', err);
        }
      })();

      if (existing) {
        return prev.filter((p) => p.nodeId !== nodeId);
      }
      return [...prev, { nodeId, completed: true, completedAt }];
    });
  }, []);

  const isNodeComplete = useCallback(
    (nodeId: string) => progress.some((p) => p.nodeId === nodeId && p.completed),
    [progress]
  );

  const progressPercentage = roadmap
    ? Math.round((progress.filter((p) => p.completed).length / roadmap.nodes.length) * 100)
    : 0;

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        roadmap,
        setRoadmap,
        roadmapInput,
        setRoadmapInput,
        progress,
        toggleNodeComplete,
        isNodeComplete,
        progressPercentage,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
