import { type Component, For } from 'solid-js';
import { RECIPES } from '@/store';
import type { Recipe } from '@/types';

interface Props {
  selectedId: string | null;
  onSelect: (recipe: Recipe) => void;
}

export const RecipePicker: Component<Props> = (props) => {
  const icons: Record<string, string> = {
    linkedin: '💼',
    x_thread: '🐦',
    email: '📧',
    seo: '🔍',
    script: '🎬',
  };

  return (
    <div class="grid grid-cols-2 gap-4">
      <For each={RECIPES}>
        {(recipe) => (
          <button
            type="button"
            class={`p-4 rounded-lg border-2 text-left transition-all ${
              props.selectedId === recipe.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => props.onSelect(recipe)}
          >
            <div class="text-2xl mb-2">{icons[recipe.kind] || '📄'}</div>
            <div class="font-semibold text-gray-900">{recipe.name}</div>
            <div class="text-sm text-gray-500 mt-1">{recipe.description}</div>
          </button>
        )}
      </For>
    </div>
  );
};
