import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import Back from "@/components/back";
import LabView from "./_components/lab-view";

export const metadata: Metadata = createPageMetadata({
  title: "Language Research Lab - Evans Elabo",
  description:
    "Computational linguistics research workbench and evaluation lab investigating orthographic variation, Akan dialect continuum modeling, and NLP benchmarking for West African languages.",
  path: "/lab",
  keywords: [
    "Language Research Lab",
    "Computational Linguistics",
    "NLP",
    "Akan",
    "Twi",
    "Fante",
    "Nzema",
    "Ghanaian Pidgin",
    "Dialect Continuum",
    "Orthographic Variation",
    "Low Resource NLP",
    "Evans Elabo",
  ],
});

export default function LabPage() {
  return (
    <div>
      <div className="mt-4">
        <Back />
      </div>

      <LabView />
    </div>
  );
}
