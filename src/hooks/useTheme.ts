import { useApp } from '@/context/AppContext';

export function useTheme() {
  const { theme, toggleTheme } = useApp();
  return { theme, toggleTheme };
}
