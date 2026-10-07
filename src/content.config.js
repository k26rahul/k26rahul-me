import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Shared by blog and projects.
const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  heroImage: z.string().optional(),
  draft: z.boolean().default(false),
});

const markdownLoader = (base) =>
  glob({ pattern: '**/*.{md,mdx}', base });

const blog = defineCollection({
  loader: markdownLoader('./src/content/blog'),
  schema: postSchema,
});

const projects = defineCollection({
  loader: file('./src/content/projects/projects.yaml'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
  }),
});

// Each item in links.json needs an `id` key, used only as the entry id.
const bookmarks = defineCollection({
  loader: file('./src/content/bookmarks/links.json'),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    note: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, projects, bookmarks };
