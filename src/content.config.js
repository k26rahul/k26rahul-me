import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Shared by blog, tutorials and projects.
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

const tutorials = defineCollection({
  loader: markdownLoader('./src/content/tutorials'),
  schema: postSchema,
});

const projects = defineCollection({
  loader: markdownLoader('./src/content/projects'),
  schema: postSchema.extend({
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    techStack: z.array(z.string()).default([]),
  }),
});

// No title: thoughts are quick posts with a timestamp-based slug.
const thoughts = defineCollection({
  loader: markdownLoader('./src/content/thoughts'),
  schema: z.object({
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
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

export const collections = { blog, tutorials, projects, thoughts, bookmarks };
