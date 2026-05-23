"use client";

import { useLenisSetup } from "@/hooks/useLenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useLenisSetup();
  return <>{children}</>;
}
