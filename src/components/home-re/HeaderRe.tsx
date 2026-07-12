"use client";

import { useEffect, useState } from "react";

const NAV = [
  { href: "#award", label: "수상" },
  { href: "#about", label: "소개" },
  { href: "#trust", label: "신뢰" },
  { href: "#reviews", label: "후기" },
  { href: "#contact", label: "연락처" },
];

export default function HeaderRe() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`re-header ${scrolled ? "re-header-solid" : ""}`}>
      <div className="re-header-inner">
        <a href="#top" className="re-header-brand">
          양준모공인중개사 태솔
        </a>
        <nav className="re-header-nav" aria-label="주요 메뉴">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="tel:01090494064" className="re-header-call">
          상담 전화
        </a>
      </div>
    </header>
  );
}
