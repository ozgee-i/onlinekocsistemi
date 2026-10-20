import Link from "next/link";

import { legalNav } from "@/config/site";
import type { LegalDocument } from "@/content/legal";

export function LegalPage({ doc, path }: { doc: LegalDocument; path: string }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[14rem_1fr]">
      <nav aria-label="Yasal metinler" className="lg:sticky lg:top-24 lg:self-start">
        <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          {legalNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={item.href === path ? "page" : undefined}
                className="block rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:border-primary/30 aria-[current=page]:bg-primary-soft aria-[current=page]:text-primary lg:border-transparent dark:border-neutral-800"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <article className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{doc.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Son güncelleme: {doc.updatedAt}</p>
        <p className="mt-8 leading-relaxed text-muted-foreground">{doc.intro}</p>
        <div className="mt-10 space-y-9">
          {doc.blocks.map((block) => (
            <section key={block.heading}>
              <h2 className="text-lg font-semibold tracking-tight">{block.heading}</h2>
              {block.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3 leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {block.list && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-muted-foreground marker:text-primary">
                  {block.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
