import { createRoot, createSignal } from 'solid-js';
import type { AppSettings } from '@/types';

function createSettingsStore() {
  const [settings, setSettings] = createSignal<AppSettings>({
    usageCount: 0,
  });

  const setApiKey = (key: string) => {
    setSettings((prev) => ({ ...prev, geminiApiKey: key }));
  };

  const clearApiKey = () => {
    setSettings((prev) => ({ ...prev, geminiApiKey: undefined }));
  };

  const incrementUsage = () => {
    setSettings((prev) => ({
      ...prev,
      usageCount: prev.usageCount + 1,
      lastUsed: Date.now(),
    }));
  };

  const hasApiKey = () => !!settings().geminiApiKey;

  return {
    settings,
    setApiKey,
    clearApiKey,
    incrementUsage,
    hasApiKey,
  };
}

export const settingsStore = createRoot(createSettingsStore);
