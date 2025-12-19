import type { Recipe, RecipeKind } from '@/types';

// Pre-defined recipes with platform constraints
export const RECIPES: Recipe[] = [
  {
    id: 'linkedin-post',
    name: 'LinkedIn Post',
    description: 'Professional post with hook, body, hashtags, and CTA',
    kind: 'linkedin',
    constraints: {
      maxLength: 3000,
      formatting: ['Use line breaks for readability', 'Start with a hook', 'End with CTA'],
    },
    jsonSchema: {
      type: 'object',
      properties: {
        hook: { type: 'string', description: 'Attention-grabbing first line' },
        body: { type: 'string', description: 'Main content with line breaks' },
        hashtags: { type: 'array', items: { type: 'string' }, maxItems: 5 },
        cta: { type: 'string', description: 'Call to action' },
      },
      required: ['hook', 'body', 'hashtags', 'cta'],
    },
  },
  {
    id: 'x-thread',
    name: 'X Thread',
    description: 'Multi-tweet thread for X/Twitter',
    kind: 'x_thread',
    constraints: {
      maxLength: 280,
      maxItems: 10,
      formatting: ['Each tweet max 280 chars', 'Number tweets 1/n format'],
    },
    jsonSchema: {
      type: 'object',
      properties: {
        tweets: {
          type: 'array',
          items: {
            type: 'object',
            properties: { text: { type: 'string', maxLength: 280 } },
          },
        },
        hashtags: { type: 'array', items: { type: 'string' }, maxItems: 3 },
      },
      required: ['tweets', 'hashtags'],
    },
  },
  {
    id: 'email-sequence',
    name: '3-Email Sequence',
    description: 'Nurture sequence with 3 emails',
    kind: 'email',
    constraints: {
      maxItems: 3,
      formatting: ['Clear subject lines', 'Scannable body', 'Single CTA per email'],
    },
    jsonSchema: {
      type: 'object',
      properties: {
        emails: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              subject: { type: 'string' },
              body: { type: 'string' },
              cta: { type: 'string' },
            },
          },
          minItems: 3,
          maxItems: 3,
        },
      },
      required: ['emails'],
    },
  },
  {
    id: 'seo-meta',
    name: 'SEO Meta Tags',
    description: 'Title, description, and keywords for SEO',
    kind: 'seo',
    constraints: {
      formatting: ['Title max 60 chars', 'Description 150-160 chars'],
    },
    jsonSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', maxLength: 60 },
        metaDescription: { type: 'string', maxLength: 160 },
        keywords: { type: 'array', items: { type: 'string' }, maxItems: 10 },
      },
      required: ['title', 'metaDescription', 'keywords'],
    },
  },
];

export const getRecipe = (id: string): Recipe | undefined => RECIPES.find((r) => r.id === id);

export const getRecipesByKind = (kind: RecipeKind): Recipe[] =>
  RECIPES.filter((r) => r.kind === kind);
