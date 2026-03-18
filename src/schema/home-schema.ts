import { Person,  WebSite, WithContext } from "schema-dts";
import { getAbsoluteUrl } from "@/lib/seo/site";

export const homeSchema: WithContext<Person | WebSite> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Evans Elabo",
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "AmaliTech",
    url: "https://amalitech.com",
  },
  url: getAbsoluteUrl("/"),
  sameAs: [
    "https://github.com/ellaboevans",
    "https://twitter.com/dev_concept",
    "mailto:ellaboevans@gmail.com",
  ],
  description:
    "Evans Elabo is a Ghana-based software engineer specializing in high-performing front-ends with Angular and Next.js, and robust backends with Node.js, Prisma, and Supabase.",
  alumniOf: {
    "@type": "Organization",
    name: "Kwame Nkrumah University of Science and Technology",
    url: "https://knust.edu.gh/",
  },
  knowsAbout: [
    "Angular",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "TypeScript",
    "Supabase",
    "Golang",
    "Software Architecture",
    "Human-centered design",
    "Constructed languages",
  ],
};
