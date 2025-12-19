import { createRoot } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import type { BrandProfile, VoiceSignature } from '@/types';

function createBrandStore() {
  const [profiles, setProfiles] = createStore<BrandProfile[]>([]);

  const createProfile = (name: string): BrandProfile => {
    const profile: BrandProfile = {
      id: crypto.randomUUID(),
      name,
      samples: [],
      signature: {
        tone: '',
        pov: '',
        bannedPhrases: [],
        favoredPhrases: [],
        formattingRules: [],
      },
      createdAt: Date.now(),
    };
    setProfiles(produce((p) => p.push(profile)));
    return profile;
  };

  const addSample = (profileId: string, sample: string) => {
    setProfiles(
      (p) => p.id === profileId,
      'samples',
      produce((samples) => samples.push(sample))
    );
  };

  const removeSample = (profileId: string, index: number) => {
    setProfiles(
      (p) => p.id === profileId,
      'samples',
      produce((samples) => samples.splice(index, 1))
    );
  };

  const updateSignature = (profileId: string, signature: VoiceSignature) => {
    setProfiles((p) => p.id === profileId, 'signature', signature);
  };

  const deleteProfile = (id: string) => {
    setProfiles((p) => p.filter((profile) => profile.id !== id));
  };

  const getProfile = (id: string) => profiles.find((p) => p.id === id);

  return {
    profiles,
    createProfile,
    addSample,
    removeSample,
    updateSignature,
    deleteProfile,
    getProfile,
  };
}

export const brandStore = createRoot(createBrandStore);
