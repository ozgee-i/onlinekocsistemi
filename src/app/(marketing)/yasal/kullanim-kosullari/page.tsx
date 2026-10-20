import type { Metadata } from "next";

import { LegalPage } from "@/components/marketing/legal-page";
import { terms as doc } from "@/content/legal";

const path = "/yasal/kullanim-kosullari";

export const metadata: Metadata = {
  title: doc.title,
  description: doc.description,
  alternates: { canonical: path },
};

export default function Page() {
  return <LegalPage doc={doc} path={path} />;
}
