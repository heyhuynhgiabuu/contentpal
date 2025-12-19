import type { Component, JSX } from 'solid-js';

interface Props {
  children: JSX.Element;
}

export const AppShell: Component<Props> = (props) => {
  return (
    <div class="min-h-screen bg-gray-50">
      {/* Header */}
      <header class="bg-white border-b px-6 py-4">
        <div class="max-w-5xl mx-auto flex justify-between items-center">
          <h1 class="text-xl font-bold text-gray-900">Content Studio</h1>
          <button type="button" class="text-gray-500 hover:text-gray-700">
            Settings
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main class="max-w-5xl mx-auto px-6 py-8">{props.children}</main>
    </div>
  );
};
