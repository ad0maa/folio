import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    timeframe: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number(),
    client: z.string().optional(),
    diagram: z.string().optional(),
    links: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(["live", "in-progress", "archived"]),
    summary: z.string(),
    stack: z.array(z.string()),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    mobileRepoUrl: z.string().url().optional(),
    aiAssisted: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = { caseStudies, projects };
