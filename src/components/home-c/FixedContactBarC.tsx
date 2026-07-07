"use client";

import Link from "next/link";
import { useSiteConfig } from "@/components/SiteConfigProvider";
import { INQUIRY_SECTION_ID, showCompanyContact } from "@/lib/exposure-mode";

export default function FixedContactBarC() {
  const site = useSiteConfig();
  const showCompany = showCompanyContact(site.exposureMode);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 flex justify-center px-4 pb-4 pointer-events-none">
      <div className="pointer-events-auto flex w-full max-w-sm gap-2 home-c-fixed-bar">
        <Link
          href={`/#${INQUIRY_SECTION_ID}`}
          className="flex-1 text-center py-3.5 rounded-full bg-stone-900 text-white font-medium text-sm shadow-lg hover:bg-stone-800 transition"
        >
          상담하기
        </Link>
        {showCompany && (
          <a
            href={`tel:${site.phoneTel}`}
            className="flex-1 text-center py-3.5 rounded-full bg-white text-stone-900 font-medium text-sm shadow-lg border border-stone-200 hover:bg-stone-50 transition"
          >
            전화하기
          </a>
        )}
      </div>
    </div>
  );
}
