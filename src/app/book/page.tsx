import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import Back from "@/components/back";
import CalEmbed from "./_components/cal-embed";

export const metadata: Metadata = createPageMetadata({
  title: "Wanna Talk? Book a Free Consultation with Evans Elabo",
  description:
    "Schedule a free consultation to discuss your software development project, technical architecture, or web application needs.",
  path: "/book",
  keywords: [
    "Book Consultation",
    "Software Development Consultation",
    "Technical Consultation",
    "Web Development Meeting",
    "Project Discussion",
  ],
});

const consultationSteps = [
  {
    title: "Pick a Time",
    description: "Choose a slot that works for you from the calendar below.",
  },
  {
    title: "Share Your Vision",
    description: "Brief me on your project goals and technical requirements.",
  },
  {
    title: "Get Actionable Insights",
    description: "Receive tailored recommendations and potential next steps.",
  },
];

export default function BookPage() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK || "eelabo/30min";

  return (
    <div>
      <div className="mt-4">
        <Back />
      </div>

      <h1 className="text-4xl pb-1 font-bold mt-8">Wanna Talk? Pick a Date</h1>
      <p className="dark:text-stone-400 text-stone-500 mt-2">
        Have a project in mind or need technical guidance? Let&apos;s chat!
        Schedule a free consultation and we&apos;ll discuss how I can help bring
        your ideas to life.
      </p>

      <div className="mt-8 rounded-lg border border-stone-200 dark:border-stone-700 overflow-hidden min-h-[600px]">
        <CalEmbed calLink={calLink} />
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">What to Expect</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {consultationSteps.map((step, index) => (
            <div key={step.title} className="flex flex-col">
              <span className="text-amber-500 font-bold text-lg mb-2">
                {index + 1}.
              </span>
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
                {step.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
