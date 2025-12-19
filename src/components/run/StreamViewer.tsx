import { type Component, Show } from 'solid-js';

interface Props {
  isStreaming: boolean;
  content: string;
  onGenerate: () => void;
}

export const StreamViewer: Component<Props> = (props) => {
  return (
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">Output</h3>
        <button
          type="button"
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          onClick={props.onGenerate}
          disabled={props.isStreaming}
        >
          {props.isStreaming ? 'Generating...' : 'Generate'}
        </button>
      </div>

      <div class="min-h-[300px] p-4 bg-gray-50 rounded-lg border">
        <Show
          when={props.content}
          fallback={
            <div class="text-gray-400 text-center py-12">Click Generate to create content</div>
          }
        >
          <pre class="whitespace-pre-wrap font-mono text-sm">{props.content}</pre>
        </Show>
        <Show when={props.isStreaming}>
          <span class="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-1" />
        </Show>
      </div>
    </div>
  );
};
