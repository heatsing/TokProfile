import Link from "next/link";
import { ClipboardPaste, Copy, SearchCheck, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type Detail = { title: string; text: string };

export type UtilityToolContent = {
  title: string;
  description: string;
  availability: string;
  acceptedInput: string;
  inputExample: string;
  intro: Detail;
  steps: [Detail, Detail, Detail];
  result: Detail[];
  guideTitle: string;
  guide: Detail[];
  faq: { question: string; answer: string }[];
  related: { href: string; label: string }[];
};

export const utilityToolColumn =
  "mx-auto w-[calc(100%-2rem)] max-w-[900px] sm:w-[calc(100%-3rem)]";
export const utilityToolHero = "scroll-mt-24 bg-[#e66f13] py-12 text-white sm:py-16";
export const utilityToolHeading =
  "text-[clamp(1.3rem,2.7vw,1.75rem)] font-bold leading-tight tracking-[-0.025em]";

const stepIcons = [Copy, ClipboardPaste, SearchCheck];

export function ToolLanding({
  content,
  icon: Icon,
  workspace,
  result,
  children,
}: {
  content: UtilityToolContent;
  icon: LucideIcon;
  workspace: ReactNode;
  result?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white text-[#24211f]">
      <SiteHeader variant="utility" />
      <section className={utilityToolHero}>
        <div className={utilityToolColumn}>
          <div className="text-center">
            <h1 className="text-[clamp(1.9rem,4vw,2.75rem)] font-bold leading-[1.24] tracking-[-0.025em]">
              {content.title}
            </h1>
            <p className="mx-auto mt-2 max-w-[680px] text-sm leading-6 text-[#fff8f4] sm:text-base">
              {content.description}
            </p>
          </div>
          <div className="mt-7 grid gap-3 lg:grid-cols-[minmax(0,1fr)_230px]">
            <div>
              {workspace}
              <p className="mt-2 text-sm font-medium leading-5 text-[#fff5ee]">
                {content.availability}
              </p>
            </div>
            <aside className="rounded-[5px] border border-white/50 bg-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-bold">
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                {content.acceptedInput}
              </div>
              <p className="mt-1 break-words text-sm text-[#fff5ee]">
                {content.inputExample}
              </p>
            </aside>
          </div>
        </div>
      </section>

      <div className={utilityToolColumn}>
        <nav
          aria-label="On this page"
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 border-b border-[#e8e2de] py-4 text-sm font-semibold text-[#a13c0d]"
        >
          <a href="#how-it-works" className="hover:underline">
            How it works
          </a>
          <a href="#tool-guide" className="hover:underline">
            What to check
          </a>
          <a href="#faq" className="hover:underline">
            FAQs
          </a>
        </nav>

        {result ? (
          <section aria-label="Profile viewer result" className="mt-8">
            {result}
          </section>
        ) : null}

        <section className="mx-auto mt-10 max-w-[70ch] text-center sm:mt-12">
          <h2 className={utilityToolHeading}>{content.intro.title}</h2>
          <p className="mt-3 text-sm leading-6 text-[#56514e] sm:text-[15px]">
            {content.intro.text}
          </p>
        </section>
        <section
          id="how-it-works"
          aria-labelledby="steps-title"
          className="mt-10 scroll-mt-5 sm:mt-12"
        >
          <h2 id="steps-title" className={`${utilityToolHeading} text-center`}>
            How to use this tool
          </h2>
          <ol className="mt-5 grid gap-0 sm:grid-cols-3 sm:gap-8">
            {content.steps.map((step, index) => {
              const StepIcon = stepIcons[index];
              return (
                <li
                  key={step.title}
                  className="grid grid-cols-[34px_1fr] items-center border-b border-[#e8e2de] py-3 last:border-b-0 sm:block sm:border-0 sm:px-1 sm:text-center"
                >
                  <StepIcon
                    aria-hidden="true"
                    className="size-6 text-[#a13c0d] sm:mx-auto"
                  />
                  <h3 className="text-sm font-bold sm:mt-3">{step.title}</h3>
                  <p className="col-start-2 mt-1 text-sm leading-5 text-[#56514e] sm:mt-1.5">
                    {step.text}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>

        <section
          aria-labelledby="result-title"
          className="mt-10 grid items-center gap-7 sm:mt-12 sm:grid-cols-2 sm:gap-8"
        >
          <div
            aria-hidden="true"
            className="relative grid min-h-[180px] place-items-center overflow-hidden rounded bg-[#28221f]"
          >
            <span className="absolute size-[240px] rounded-full border border-white/15 shadow-[0_0_0_23px_rgba(255,255,255,0.045),0_0_0_47px_rgba(255,255,255,0.035)]" />
            <span className="relative grid aspect-[1.86] w-[58%] max-w-[230px] place-items-center rounded-[9px] border border-[#f6ae8c] bg-[#df642a]">
              <Icon className="size-9 text-white" />
            </span>
          </div>
          <div>
            <h2 id="result-title" className={utilityToolHeading}>
              What this tool returns
            </h2>
            <dl className="mt-2 divide-y divide-[#e8e2de]">
              {content.result.map((detail) => (
                <div
                  key={detail.title}
                  className="grid grid-cols-[minmax(96px,0.85fr)_1.35fr] gap-3 py-2 text-sm"
                >
                  <dt className="font-semibold">{detail.title}</dt>
                  <dd className="leading-5 text-[#56514e]">{detail.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <section
          id="tool-guide"
          aria-labelledby="guide-title"
          className="mt-10 scroll-mt-5 sm:mt-12"
        >
          <h2 id="guide-title" className={utilityToolHeading}>
            {content.guideTitle}
          </h2>
          <div className="mt-3 divide-y divide-[#e8e2de]">
            {content.guide.map((detail) => (
              <article key={detail.title} className="py-4">
                <h3 className="font-bold text-[#a13c0d]">{detail.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-[#56514e]">{detail.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="faq"
          aria-labelledby="faq-title"
          className="mt-10 scroll-mt-5 sm:mt-12"
        >
          <h2 id="faq-title" className={utilityToolHeading}>
            Frequently asked questions
          </h2>
          <div className="mt-3 divide-y divide-[#e8e2de] border-y border-[#e8e2de]">
            {content.faq.map((item) => (
              <details key={item.question}>
                <summary className="cursor-pointer py-3 text-sm font-semibold">
                  {item.question}
                </summary>
                <p className="pb-4 pr-4 text-sm leading-6 text-[#56514e]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
        <section aria-labelledby="related-title" className="my-10 sm:my-12">
          <h2 id="related-title" className={utilityToolHeading}>
            Related tools and help
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-[#a13c0d]">
            {content.related.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="underline-offset-4 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <SiteFooter />
      {children}
    </main>
  );
}
