import { type Component, createSignal, Show } from 'solid-js';
import type {
  EmailContent,
  GeneratedContent,
  LinkedInContent,
  SEOContent,
  XThreadContent,
} from '@/types';

interface Props {
  content: GeneratedContent | null;
  rawText: string;
}

export const OutputPreview: Component<Props> = (props) => {
  const [copied, setCopied] = createSignal(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(props.rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([props.rawText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div class="space-y-4">
      <div class="flex gap-2">
        <button
          type="button"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={copyToClipboard}
        >
          {copied() ? '✓ Copied!' : 'Copy'}
        </button>
        <button
          type="button"
          class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          onClick={downloadMarkdown}
        >
          Export MD
        </button>
      </div>

      <Show when={props.content}>
        <div class="p-4 bg-white rounded-lg border shadow-sm">
          <Show when={props.content?.type === 'linkedin'}>
            <LinkedInPreview content={props.content as LinkedInContent} />
          </Show>
          <Show when={props.content?.type === 'x_thread'}>
            <XThreadPreview content={props.content as XThreadContent} />
          </Show>
          <Show when={props.content?.type === 'email'}>
            <EmailPreview content={props.content as EmailContent} />
          </Show>
          <Show when={props.content?.type === 'seo'}>
            <SEOPreview content={props.content as SEOContent} />
          </Show>
        </div>
      </Show>
    </div>
  );
};

const LinkedInPreview: Component<{ content: LinkedInContent }> = (props) => (
  <div class="space-y-3">
    <p class="font-bold text-lg">{props.content.hook}</p>
    <p class="whitespace-pre-wrap">{props.content.body}</p>
    <p class="text-blue-600">{props.content.hashtags?.join(' ')}</p>
    <p class="font-medium">{props.content.cta}</p>
  </div>
);

const XThreadPreview: Component<{ content: XThreadContent }> = (props) => (
  <div class="space-y-2">
    {props.content.tweets?.map((tweet, i) => (
      <div class="p-3 bg-gray-50 rounded-lg">
        <span class="text-gray-400 text-sm">{i + 1}/</span>
        <p>{tweet.text}</p>
      </div>
    ))}
  </div>
);

const EmailPreview: Component<{ content: EmailContent }> = (props) => (
  <div class="space-y-4">
    {props.content.emails?.map((email, i) => (
      <div class="p-4 border rounded-lg">
        <div class="text-sm text-gray-500">Email {i + 1}</div>
        <div class="font-bold">{email.subject}</div>
        <p class="mt-2 whitespace-pre-wrap">{email.body}</p>
        <p class="mt-2 text-blue-600">{email.cta}</p>
      </div>
    ))}
  </div>
);

const SEOPreview: Component<{ content: SEOContent }> = (props) => (
  <div class="space-y-3">
    <div>
      <span class="text-sm text-gray-500">Title ({props.content.title?.length || 0}/60)</span>
      <p class="font-bold text-blue-700">{props.content.title}</p>
    </div>
    <div>
      <span class="text-sm text-gray-500">
        Description ({props.content.metaDescription?.length || 0}/160)
      </span>
      <p>{props.content.metaDescription}</p>
    </div>
    <div>
      <span class="text-sm text-gray-500">Keywords</span>
      <div class="flex flex-wrap gap-1 mt-1">
        {props.content.keywords?.map((kw) => (
          <span class="px-2 py-1 bg-gray-100 rounded text-sm">{kw}</span>
        ))}
      </div>
    </div>
  </div>
);
