import type { Metadata } from "next";

import { LegalPage } from "@/components/marketing/legal-page";
import { cookies as doc } from "@/content/legal";

const path = "/yasal/cerez";

export const metadata: Metadata = {
  title: doc.title,
  description: doc.description,
  alternates: { canonical: path },
};

export default function Page() {
  return <LegalPage doc={doc} path={path} />;
}
