// ============ Core Domain Types ============

export interface Project {
  id: string;
  name: string;
  source: SourceDoc;
  outputs: OutputItem[];
  brandProfileId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface SourceDoc {
  title?: string;
  body: string;
  sourceType: 'url' | 'text' | 'file';
  sourceMeta?: {
    url?: string;
    filename?: string;
    extractedAt?: number;
  };
}

export interface OutputItem {
  id: string;
  recipeId: string;
  content: GeneratedContent;
  status: 'pending' | 'generating' | 'completed' | 'error';
  error?: string;
  createdAt: number;
}

// ============ Brand Voice Types ============

export interface BrandProfile {
  id: string;
  name: string;
  samples: string[];
  signature: VoiceSignature;
  createdAt: number;
}

export interface VoiceSignature {
  tone: string;
  pov: string;
  bannedPhrases: string[];
  favoredPhrases: string[];
  formattingRules: string[];
}

// ============ Recipe Types ============

export type RecipeKind = 'linkedin' | 'x_thread' | 'email' | 'seo' | 'script';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  kind: RecipeKind;
  constraints: PlatformConstraints;
  jsonSchema: object;
}

export interface PlatformConstraints {
  maxLength?: number;
  maxItems?: number;
  formatting?: string[];
}

// ============ Generated Content Types ============

export type GeneratedContent =
  | LinkedInContent
  | XThreadContent
  | EmailContent
  | SEOContent
  | ScriptContent;

export interface LinkedInContent {
  type: 'linkedin';
  hook: string;
  body: string;
  hashtags: string[];
  cta: string;
}

export interface XThreadContent {
  type: 'x_thread';
  tweets: { text: string }[];
  hashtags: string[];
}

export interface EmailContent {
  type: 'email';
  emails: {
    subject: string;
    body: string;
    cta: string;
  }[];
}

export interface SEOContent {
  type: 'seo';
  title: string;
  metaDescription: string;
  keywords: string[];
}

export interface ScriptContent {
  type: 'script';
  intro: string;
  sections: { heading: string; content: string }[];
  outro: string;
}

// ============ App State Types ============

export interface AppSettings {
  geminiApiKey?: string;
  usageCount: number;
  lastUsed?: number;
}

export interface GenerationRequest {
  sourceDoc: SourceDoc;
  recipeId: string;
  brandProfileId?: string;
}

export interface StreamChunk {
  type: 'partial' | 'complete' | 'error';
  content?: string;
  error?: string;
}
