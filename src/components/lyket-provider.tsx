"use client";

import { Provider } from "@lyket/react";
import { ReactNode } from "react";

type LyketProviderProps = {
  children: ReactNode;
};

export default function LyketProvider({ children }: Readonly<LyketProviderProps>) {
  const apiKey = process.env.NEXT_PUBLIC_LYKET_API_KEY;

  if (!apiKey) {
    return <>{children}</>;
  }

  return (
    <Provider
      apiKey={apiKey}
      theme={{
        colors: {
          primary: "#f59e0b", // amber-500
          text: "#78716c", // stone-500
          highlight: "#fef3c7", // amber-100
          icon: "#f59e0b",
          background: "transparent",
        },
      }}
    >
      {children}
    </Provider>
  );
}
