import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import Back from "@/components/back";
import { Icon } from "@iconify/react";
import ContactForm from "./_components/contact-form";
import CalendlyButton from "@/components/calendly-button";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with Evans Elabo. Whether you have a project idea, want to collaborate, or just want to say hello, I'd love to hear from you.",
  path: "/contact",
  keywords: ["Contact", "Get in Touch", "Hire", "Collaborate", "Freelance"],
});

const contactMethods = [
  {
    icon: "line-md:email",
    label: "Email",
    value: "ellaboevans@gmail.com",
    href: "mailto:ellaboevans@gmail.com",
  },
  {
    icon: "line-md:twitter-x",
    label: "Twitter",
    value: "@dev_concept",
    href: "https://twitter.com/dev_concept",
  },
  {
    icon: "line-md:github-loop",
    label: "GitHub",
    value: "ellaboevans",
    href: "https://github.com/ellaboevans",
  },
];

export default function ContactPage() {
  return (
    <div>
      <div className="mt-4">
        <Back />
      </div>

      <h1 className="text-4xl pb-1 font-bold mt-8">Get in Touch</h1>
      <p className="dark:text-stone-400 text-stone-500 mt-2">
        Have a project in mind, want to collaborate, or just want to say hello? I&apos;d love to
        hear from you. Fill out the form below or reach out through any of my social channels.
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold mb-6 text-stone-900 dark:text-stone-100">
            Send a Message
          </h2>
          <ContactForm />
        </div>

        <div className="lg:pl-8">
          <h2 className="text-xl font-bold mb-6 text-stone-900 dark:text-stone-100">
            Other Ways to Connect
          </h2>

          <div className="space-y-4">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg border border-stone-200 dark:border-stone-700 hover:border-amber-500/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <Icon
                    icon={method.icon}
                    className="w-5 h-5 text-stone-600 dark:text-stone-400 group-hover:text-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <p className="text-sm text-stone-500 dark:text-stone-400">{method.label}</p>
                  <p className="font-medium text-stone-900 dark:text-stone-100">{method.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl border border-dashed border-amber-500/30 bg-amber-900/10">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
              <Icon icon="ph:calendar-check" className="w-5 h-5 text-amber-500" />
              Prefer a Call?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
              Book a free 30-minute consultation via Calendly to discuss your project in detail.
            </p>
            <CalendlyButton
              className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium transition-colors cursor-pointer"
            >
              Schedule via Calendly
              <Icon icon="ph:arrow-right" className="w-4 h-4" />
            </CalendlyButton>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-stone-100/50 dark:bg-stone-800/50">
            <p className="text-sm text-stone-600 dark:text-stone-400">
              <strong className="text-stone-900 dark:text-stone-100">Response time:</strong> I
              typically respond within 24-48 hours during weekdays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
