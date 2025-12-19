import { type Component, createSignal, Show } from 'solid-js';
import type { SourceDoc } from '@/types';

interface Props {
  onSubmit: (source: SourceDoc) => void;
}

type InputMode = 'text' | 'url' | 'file';

export const SourceInput: Component<Props> = (props) => {
  const [mode, setMode] = createSignal<InputMode>('text');
  const [text, setText] = createSignal('');
  const [url, setUrl] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async () => {
    const currentMode = mode();

    if (currentMode === 'text' && text().trim()) {
      props.onSubmit({
        body: text().trim(),
        sourceType: 'text',
      });
    } else if (currentMode === 'url' && url().trim()) {
      setLoading(true);
      // TODO: Call Tauri command to scrape URL
      // For now, create placeholder
      props.onSubmit({
        body: `Content from: ${url()}`,
        sourceType: 'url',
        sourceMeta: { url: url() },
      });
      setLoading(false);
    }
  };

  const handleFileDrop = (e: DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        props.onSubmit({
          body: reader.result as string,
          sourceType: 'file',
          sourceMeta: { filename: file.name },
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div class="space-y-4">
      {/* Mode Tabs */}
      <div class="flex gap-2">
        {(['text', 'url', 'file'] as InputMode[]).map((m) => (
          <button
            type="button"
            class={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode() === m
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setMode(m)}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* Text Input */}
      <Show when={mode() === 'text'}>
        <textarea
          class="w-full h-64 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Paste your content here..."
          value={text()}
          onInput={(e) => setText(e.currentTarget.value)}
        />
      </Show>

      {/* URL Input */}
      <Show when={mode() === 'url'}>
        <input
          type="url"
          class="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com/article"
          value={url()}
          onInput={(e) => setUrl(e.currentTarget.value)}
        />
      </Show>

      {/* File Drop */}
      <Show when={mode() === 'file'}>
        <label
          class="w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
        >
          <input
            type="file"
            accept=".txt,.md,.docx"
            class="hidden"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  props.onSubmit({
                    body: reader.result as string,
                    sourceType: 'file',
                    sourceMeta: { filename: file.name },
                  });
                };
                reader.readAsText(file);
              }
            }}
          />
          Drop or click to select TXT, MD, or DOCX file
        </label>
      </Show>

      {/* Submit Button */}
      <button
        type="button"
        class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        onClick={handleSubmit}
        disabled={
          loading() || (mode() === 'text' && !text().trim()) || (mode() === 'url' && !url().trim())
        }
      >
        {loading() ? 'Loading...' : 'Continue'}
      </button>
    </div>
  );
};
