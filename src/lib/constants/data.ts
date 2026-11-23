export type Project = {
  title: string;
  description: string;
  longDescription?: string;
  link: string;
  github?: string;
  article?: string;
  metric?: string;
  image?: string;
  stack: { label: string; icon: string }[];
  colors: string;
  tag: string[];
  highlights?: string[];
  role?: string;
  year?: string;
};

export const impactMetrics = [
  {
    label: "Active Project",
    value: "InkBoard",
    description: "Living spatial poetry canvas (PWA)",
    icon: "ph:paint-brush-broad-bold",
  },
  {
    label: "Processed Volume",
    value: "GH₵500K+",
    description: "JED event platform & USSD offline voting",
    icon: "ph:chart-line-up-bold",
  },
  {
    label: "Developer Tool",
    value: "Ark Extension",
    description: "1-click environment disaster recovery",
    icon: "vscode-icons:file-type-vscode",
  },
  {
    label: "Technical Writing",
    value: "8 Articles",
    description: "Architecture, frameworks & career stories",
    icon: "ph:article-medium-bold",
  },
];

export const projects: Project[] = [
  {
    title: "InkBoard: Living Poetry Canvas",
    description:
      "A spatial, living public board of poems grouped by author. Wander the canvas, read new work, and follow your favorite poets.",
    longDescription:
      "InkBoard is a spatial, living canvas for poetry where poems are catalogued by author. Built as an offline-first PWA with dynamic canvas exploration, custom reading modes, typography controls, and automated Atom/RSS feeds.",
    link: "https://tryinkboard.elabo.me",
    metric: "Current Project",
    image: "https://tryinkboard.elabo.me/opengraph-image?5d01efcadb5b8971",
    stack: [
      { label: "Next.js", icon: "logos:nextjs" },
      { label: "TypeScript", icon: "logos:typescript-icon" },
      { label: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { label: "PWA", icon: "logos:pwa" },
    ],
    colors: "bg-amber-900/10 text-amber-400 border border-amber-500/20",
    tag: ["production", "frontend", "creative"],
    highlights: [
      "Spatial living canvas grouped by author",
      "Offline-first PWA with custom reading view",
      "Atom/RSS feed integration for automated poem distribution",
      "Active production project (tryinkboard.elabo.me)",
    ],
    role: "Creator & Lead Engineer",
    year: "2026",
  },
  {
    title: "Ark: VS Code Disaster Recovery",
    description:
      "A VS Code extension that backs up and restores your entire environment (extensions, settings, keybindings) in one click. Never lose your setup again.",
    longDescription:
      "Ark is a disaster recovery tool for developers. It securely backs up your VS Code environment to a private GitHub Gist and restores it instantly, with a smart diff preview and one-click recovery. Open source, privacy-first, and built for productivity.",
    link: "https://marketplace.visualstudio.com/items?itemName=ellaboevans.ark-disaster-recovery",
    github: "https://github.com/ellaboevans/ark",
    article: "/blog/ark-never-lose-vscode-setup",
    metric: "VS Code Marketplace",
    image: "https://ik.imagekit.io/kkldhhslb/ark-cover.png",
    stack: [
      { label: "TypeScript", icon: "logos:typescript-icon" },
      { label: "VS Code API", icon: "vscode-icons:file-type-vscode" },
      { label: "GitHub Gist", icon: "logos:github-icon" },
    ],
    colors: "bg-yellow-900/10 text-yellow-500 border border-yellow-500/20",
    tag: ["production", "tool", "open-source", "productivity"],
    highlights: [
      "One-click backup and restore",
      "Smart diff preview before restore",
      "Auto-backup, privacy-first (no third-party servers)",
      "Open source and auditable",
    ],
    role: "Creator",
    year: "2026",
  },
  {
    title: "JED: Event & USSD Platform",
    description:
      "An online event management and ticketing platform integrated with an offline USSD voting engine.",
    longDescription:
      "Developed a full-stack event management solution with a unique selling point: offline voting via USSD. This allows event organizers to reach audiences without internet access while maintaining real-time vote tallying.",
    link: "https://jedevent.com",
    article: "/blog/building-jed-startup-before-graduation",
    metric: "GH₵500K+ Volume",
    image: "https://ik.imagekit.io/kkldhhslb/jed-story.webp",
    stack: [
      { label: "Next.js", icon: "logos:nextjs" },
      { label: "Postgres", icon: "logos:postgres" },
      { label: "TypeScript", icon: "logos:typescript-icon" },
      { label: "Nest", icon: "logos:nest" },
    ],
    colors: "bg-emerald-900/10 text-emerald-500 border border-emerald-500/20",
    tag: ["production", "frontend", "backend"],
    highlights: [
      "USSD integration for offline voting",
      "Real-time vote tallying and settlement",
      "Multi-event management dashboard",
    ],
    role: "Co-founder & Full Stack Developer",
    year: "2024",
  },
  {
    title: "ST School",
    description:
      "A school management application designed to streamline administrative tasks and enhance communication between instructors and students.",
    longDescription:
      "Built a comprehensive school management system that handles student enrollment, grade tracking, attendance management, and parent-teacher communication. The platform serves multiple schools with role-based access control.",
    link: "https://school.slightlytechie.com",
    metric: "Multi-School SaaS",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    stack: [
      { label: "React", icon: "logos:react" },
      { label: "TypeScript", icon: "logos:typescript-icon" },
    ],
    colors: "bg-purple-900/10 text-purple-400 border border-purple-500/20",
    tag: ["production", "frontend"],
    highlights: [
      "Role-based access control for admins, teachers, and students",
      "Real-time grade and attendance tracking",
      "Parent notification system",
    ],
    role: "Frontend Developer",
    year: "2024",
  },
  {
    title: "Schematics",
    description:
      "A custom Angular schematic that simplifies and standardizes the generation of Angular components with ChangeDetectionStrategy.OnPush by default.",
    longDescription:
      "Schematics is a custom Angular schematic that simplifies and standardizes the generation of Angular components with ChangeDetectionStrategy.OnPush by default, enforcing best practices from day one.",
    link: "https://github.com/ellaboevans/schematics",
    github: "https://github.com/ellaboevans/schematics",
    article: "/blog/custom-angular-schematics",
    metric: "OnPush Defaults",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    stack: [{ label: "Angular", icon: "logos:angular" }],
    colors: "bg-cyan-900/10 text-cyan-400 border border-cyan-500/20",
    tag: ["tool", "open-source"],
    highlights: [
      "Enforces OnPush performance best practices",
      "Standardized component templates",
      "Direct Angular CLI integration",
    ],
    role: "Creator",
    year: "2024",
  },
  {
    title: "Storyblok Field Plugin",
    description:
      "A Storyblok field plugin application showcasing fundamental features including value updates, modal toggling, and asset selection.",
    longDescription:
      "A custom field plugin for Storyblok CMS that extends the editor capabilities with customized asset selection, live modal dialogs, and real-time state sync.",
    link: "https://github.com/ellaboevans/sb-cl-custom-plugin",
    github: "https://github.com/ellaboevans/sb-cl-custom-plugin",
    metric: "CMS Plugin",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    stack: [
      { label: "React.js", icon: "logos:react" },
      { label: "TypeScript", icon: "logos:typescript-icon" },
    ],
    colors: "bg-blue-900/10 text-blue-400 border border-blue-500/20",
    tag: ["tool", "open-source", "CMS"],
    highlights: [
      "Custom field type for Storyblok CMS",
      "Asset picker integration",
      "Modal-based editing experience",
    ],
    role: "Creator",
    year: "2024",
  },
];

export const tools = [
  {
    title: "Schematics",
    description:
      "Schematics is a custom Angular schematic that simplifies and standardizes the generation of Angular components with `ChangeDetectionStrategy.OnPush` by default.",
    link: "https://github.com/ellaboevans/schematics",
    stack: [{ label: "Angular", icon: "logos:angular" }],
    colors: "bg-cyan-900/30 text-cyan-500 border border-dashed border-cyan-500/30",
    tag: ["tool", "learning"],
  },
  {
    title: "Storyblok Field Plugin",
    description:
      "This is a Storyblok field plugin application. It showcases some fundamental features for field plugins, including value updates, modal toggling, and asset selection.",
    link: "https://github.com/ellaboevans/sb-cl-custom-plugin",
    stack: [
      { label: "React.js", icon: "logos:react" },
      { label: "TypeScript", icon: "logos:typescript-icon" },
    ],
    colors: "bg-blue-500/10 text-blue-300 border border-dashed border-blue-500/30",
    tag: ["tool", "learning", "CMS plugin"],
  },
];

export const TypingQuotes = [
  "now i am in it and i cannot get out and i feel like there is no way out people talk about real love now i am feeling like i am missing out i am trying to drown the pain but the liquor keep bringing it out",

  "bury me in the ocean with my ancestors that jumped from ships because they knew death was better than bondage just bury me do not cage me i lived free and i die free",

  "you know i had to do it for you i go for mine i got to shine throw your hands up in the sky i am gonna get on this tv mama i amma put you down",

  "i am just a kid from brooklyn whatever happens tomorrow you must promise me one thing that you will stay who you are not a perfect soldier but a good man",

  "i keep showing up even when no one is watching even when the words do not come easy i keep going because something inside me knows that quitting is louder than failure and if i stop now i will never know how close i was to breaking through the noise and finding my real speed",

  "i do not need luck i do not need help i have my focus my rhythm and these hands that do not miss when it matters so when the timer starts and the keys begin to fly just know that i came ready to win and i do not plan on slowing down for anyone",

  "do not pray for an easy life pray for the strength to endure a difficult one do not pray for less problems pray for more wisdom do not pray for less challenges pray for more skills do not pray for less stress pray for more patience",

  "the world gets quiet when i type like nothing else exists except the sound of keys and the thoughts in my head moving in sync every word feels like a breath and every line is a step forward i am not racing anyone i am just learning how to move with peace and purpose",

  "this is not just typing this is training for something bigger this is focus under pressure control under chaos every second counts and every word matters you cannot fake flow and you cannot outrun the clock but if you show up with fire in your fingers you just might beat the game",

  "i have always believed that success is not just about talent or luck it is about persistence resilience and the willingness to keep going even when the odds are against you every setback is an opportunity to learn every failure is a step closer to success",

  "i have rehearsed this moment a thousand times but when the words get close my mind goes blank like i am afraid to say what is really in my heart i do not know how to start or even if it will make a difference but maybe if i type it out loud i will find the courage to speak",
];

export const playgrounds = [
  {
    name: "Password Generator",
    path: "/playground/password-generator",
    description:
      "A simple and secure password generator that creates strong passwords based on user-defined criteria.",
  },
  {
    name: "Keypp",
    path: "/playground/keypp",
    description:
      "A straightforward typing test application that measures your typing speed and accuracy.",
  },
  {
    name: "Regfatto",
    path: "/playground/regfatto",
    description:
      "An interactive environment where you can practice and learn regular expressions. ",
  },
  {
    name: "Truth JS",
    path: "/playground/js",
    description:
      "A playground for testing and experimenting with JavaScript code snippets.",
  },
];


export const techInhabitants = [
  {
    name: "AmaliTech Ghana Ltd.",
    role: "Software Engineer",
    link: "https://amalitech.com/",
    duration: "Oct 2024 - Present",
    colors: "bg-amber-900/30 text-amber-500 border border-dashed border-amber-500/30",
    description:
      "I contribute to a multinational content-commerce platform by developing reusable UI components, ensuring SEO-ready performance, and implementing multi-language, multi-market features in collaboration with designers and backend teams.",
  },
  {
    name: "Slightly Techie",
    role: "Community Member",
    link: "https://slightlytechie.com/",
    duration: "Jul 2023 - Present",
    colors: "bg-stone-800/40 text-stone-200 border border-dashed border-stone-600/40",
    description:
      "As a community member, I actively participate in discussions, share knowledge, and contribute to various projects and initiatives aimed at fostering a supportive environment for tech professionals.",
  },
  {
    name: "GDSC, KNUST",
    role: "Core Team Member",
    link: "https://g.dev/eelabo",
    duration: "Oct 2023 - Jun 2024",
    colors: "bg-blue-900/30 text-blue-500 border border-dashed border-blue-500/30",
    description:
      "We focused on empowering students with practical skills in web and mobile development, cloud computing, and other emerging technologies through hands-on learning experiences and community engagement.",
  },
];