import { getAllContentMetadata } from "@/lib/utils/content-metadata";
import { getAbsoluteUrl, SITE_CONFIG } from "@/lib/seo/site";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

function escapeXml(text: string): string {
  return text
    .replaceAll('&', "&amp;")
    .replaceAll(/</g, "&lt;")
    .replaceAll(/>/g, "&gt;")
    .replaceAll(/"/g, "&quot;")
    .replaceAll(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getAllContentMetadata({
    published: true,
    sortBy: "createdAt",
    sortDirection: "desc",
  });

  const siteUrl = getAbsoluteUrl("/");
  const feedUrl = getAbsoluteUrl("/feed.xml");

  const rssItems = posts
    .map((post) => {
      const postUrl = getAbsoluteUrl(`/blog/${post.slug}`);
      const pubDate = new Date(post.createdAt).toUTCString();

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(SITE_CONFIG.authorName)}</author>
      ${post.keywords.map((keyword) => `<category>${escapeXml(keyword)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_CONFIG.siteName)} - Blog</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(SITE_CONFIG.defaultDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <managingEditor>${escapeXml(SITE_CONFIG.authorName)}</managingEditor>
    <webMaster>${escapeXml(SITE_CONFIG.authorName)}</webMaster>
${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
