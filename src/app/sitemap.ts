import * as fs from "node:fs/promises";
import * as path from "node:path";
import { getAllContentMetadata } from "@/lib/utils/content-metadata";
import { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/seo/site";

const __APP_DIR = path.join(process.cwd(), "src", "app");
const __PAGE_FILE_PATTERN = /^page\.(tsx|ts|jsx|js|mdx)$/;

type StaticRouteEntry = {
  path: string;
  lastModified: Date;
};

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

function isRouteGroup(segment: string): boolean {
  return segment.startsWith("(") && segment.endsWith(")");
}

function shouldSkipDirectory(segment: string): boolean {
  return segment.startsWith("_") || segment === "api" || segment.startsWith("[");
}

function getRoutePath(segments: string[]): string {
  return segments.length === 0 ? "/" : `/${segments.join("/")}`;
}

function inferChangeFrequency(routePath: string): ChangeFrequency {
  if (routePath === "/") return "monthly";
  if (routePath.startsWith("/blog")) return "weekly";
  if (routePath.startsWith("/playground")) return "monthly";
  return "yearly";
}

function inferPriority(routePath: string): number {
  if (routePath === "/") return 1;
  if (routePath === "/blog") return 0.9;
  if (routePath.startsWith("/blog/")) return 0.8;
  if (routePath.startsWith("/playground")) return 0.8;
  return 0.6;
}

async function collectStaticRoutes(
  dir: string,
  segments: string[] = []
): Promise<StaticRouteEntry[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const pageFile = entries.find((entry) => entry.isFile() && __PAGE_FILE_PATTERN.test(entry.name));

  const routes: StaticRouteEntry[] = [];

  if (pageFile) {
    const pageStats = await fs.stat(path.join(dir, pageFile.name));
    routes.push({
      path: getRoutePath(segments),
      lastModified: pageStats.mtime,
    });
  }

  for (const entry of entries) {
    if (!entry.isDirectory() || shouldSkipDirectory(entry.name)) {
      continue;
    }

    const nextSegments = isRouteGroup(entry.name) ? segments : [...segments, entry.name];
    const childRoutes = await collectStaticRoutes(path.join(dir, entry.name), nextSegments);
    routes.push(...childRoutes);
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [staticRoutes, posts] = await Promise.all([
    collectStaticRoutes(__APP_DIR),
    getAllContentMetadata({
      published: true,
      sortBy: "updatedAt",
      sortDirection: "desc",
    }),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: getAbsoluteUrl(route.path),
    lastModified: route.lastModified,
    changeFrequency: inferChangeFrequency(route.path),
    priority: inferPriority(route.path),
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: getAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const combinedEntries = [...staticEntries, ...postEntries];

  const uniqueEntries = combinedEntries.filter(
    (entry, index, entries) => index === entries.findIndex((item) => item.url === entry.url)
  );

  return uniqueEntries.sort((a, b) => a.url.localeCompare(b.url));
}
