## The Evans Elabo — Portfolio

Welcome to the source code of my personal portfolio — a space where I showcase my work, experiments, and ideas across front-end development, UI engineering, and interactive design.

### Overview

This portfolio is built to reflect not just what I do, but how I approach my craft — blending creativity, precision, and performance into modern web experiences.

### SEO Playbook

This project ships with dynamic SEO features powered by the App Router metadata system:

- Code-generated Open Graph images for the site and blog posts.
- Dynamic metadata generation for pages and articles.
- Dynamic sitemap and robots generation.
- Structured data (JSON-LD) for site, person, organization, and blog content.

To enable search engine ownership verification, set these environment variables:

- `GOOGLE_SITE_VERIFICATION`
- `BING_SITE_VERIFICATION`

After deployment, submit your sitemap:

1. Google Search Console: add `https://evans.elabo.com/sitemap.xml`.
2. Bing Webmaster Tools: add `https://evans.elabo.com/sitemap.xml`.

Open Graph image routes:

- Site: `/opengraph-image`
- Blog index: `/blog/opengraph-image`
- Blog post: `/blog/[slug]/opengraph-image`