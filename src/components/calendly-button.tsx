"use client";

import React from "react";
import { openCalendly } from "@/lib/utils/calendly";

type CalendlyButtonProps = {
  className?: string;
  children: React.ReactNode;
  url?: string;
  ariaLabel?: string;
};

export default function CalendlyButton({
  className,
  children,
  url,
  ariaLabel,
}: Readonly<CalendlyButtonProps>) {
  return (
    <button
      type="button"
      onClick={() => openCalendly(url)}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
