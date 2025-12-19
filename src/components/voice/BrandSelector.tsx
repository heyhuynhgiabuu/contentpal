import { type Component, createSignal, For, Show } from 'solid-js';
import { brandStore } from '@/store';
import type { BrandProfile } from '@/types';

interface Props {
  selectedId: string | null;
  onSelect: (profile: BrandProfile | null) => void;
}

export const BrandSelector: Component<Props> = (props) => {
  const [showCreate, setShowCreate] = createSignal(false);
  const [newName, setNewName] = createSignal('');

  const handleCreate = () => {
    if (newName().trim()) {
      const profile = brandStore.createProfile(newName().trim());
      props.onSelect(profile);
      setNewName('');
      setShowCreate(false);
    }
  };

  return (
    <div class="space-y-4">
      {/* No brand option */}
      <button
        type="button"
        class={`w-full p-4 rounded-lg border-2 text-left ${
          props.selectedId === null
            ? 'border-blue-600 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300'
        }`}
        onClick={() => props.onSelect(null)}
      >
        <div class="font-semibold">No Brand Voice</div>
        <div class="text-sm text-gray-500">Use default AI tone</div>
      </button>

      {/* Existing profiles */}
      <For each={brandStore.profiles}>
        {(profile) => (
          <button
            type="button"
            class={`w-full p-4 rounded-lg border-2 text-left ${
              props.selectedId === profile.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => props.onSelect(profile)}
          >
            <div class="font-semibold">{profile.name}</div>
            <div class="text-sm text-gray-500">
              {profile.samples.length} samples • {profile.signature.tone || 'No tone set'}
            </div>
          </button>
        )}
      </For>

      {/* Create new */}
      <Show
        when={showCreate()}
        fallback={
          <button
            type="button"
            class="w-full p-4 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500"
            onClick={() => setShowCreate(true)}
          >
            + Create New Brand Profile
          </button>
        }
      >
        <div class="p-4 border-2 border-blue-500 rounded-lg space-y-3">
          <input
            type="text"
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Brand name..."
            value={newName()}
            onInput={(e) => setNewName(e.currentTarget.value)}
          />
          <div class="flex gap-2">
            <button
              type="button"
              class="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleCreate}
            >
              Create
            </button>
            <button
              type="button"
              class="flex-1 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setShowCreate(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
};
