"use client";

import { useState } from "react";
import { useSiteConfig } from "@/components/SiteConfigProvider";
import { showCompanyContact } from "@/lib/exposure-mode";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqBProps {
  items: FaqItem[];
}

export default function FaqB({ items }: FaqBProps) {
  const site = useSiteConfig();
  const showCompany = showCompanyContact(site.exposureMode);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="home-b-section py-16 lg:py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-orange mb-2">FAQ</p>
          <h2 className="text-3xl lg:text-4xl font-black text-dark">
            자주 묻는 <span className="text-orange">질문</span>
          </h2>
          {showCompany && (
            <p className="text-gray-600 mt-3">
              궁금한 점이 있으시면 전화 주세요.{" "}
              <a href={`tel:${site.phoneTel}`} className="text-orange font-bold hover:underline">
                {site.phone}
              </a>
            </p>
          )}
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.question} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-dark hover:bg-gray-50 transition"
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>
                    <span className="text-orange mr-2">Q{i + 1}</span>
                    {item.question}
                  </span>
                  <span className="text-gray-400 shrink-0">{open ? "▲" : "▼"}</span>
                </button>
                {open && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
