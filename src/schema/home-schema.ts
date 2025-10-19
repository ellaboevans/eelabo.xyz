import { Person,  WebSite, WithContext } from "schema-dts";

export const homeSchema: WithContext<Person | WebSite> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Evans Elabo",
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "AmaliTech",
    url: "https://www.amalitech.org",
  },
  url: process.env.NEXT_PUBLIC_BASE_URL,
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
