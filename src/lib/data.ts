import fs from "fs/promises";
import path from "path";
import { isR2Configured, r2Key, readR2Text, writeR2Text } from "./r2";

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface LocalPartner {
  type: string;
  name: string;
  address: string;
  placeUrl: string;
}

export interface SeoPage {
  id: string;
  slug: string;
  keyword: string;
  regionName?: string;
  title: string;
  description: string;
  content: string;
  faqs: SeoFaq[];
  localPartners?: LocalPartner[];
  /** @deprecated imageIndex 사용 — CDN 변경 시 자동 반영 */
  imageUrl?: string;
  imageIndex?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  brandName?: string;
  companyName?: string;
  tagline?: string;
  description?: string;
  url?: string;
  phone?: string;
  email?: string;
  address?: string;
  businessNumber?: string;
  representative?: string;
  imageCdn?: string;
  imageCount?: number;
  supportBase?: string;
  supportExtra?: string;
  supportMax?: string;
  geminiApiKey?: string;
  naverClientId?: string;
  naverClientSecret?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");

function normalizeKey(value: string): string {
  try {
    return decodeURIComponent(value).normalize("NFC").trim();
  } catch {
    return value.normalize("NFC").trim();
  }
}

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  if (isR2Configured()) {
    const raw = await readR2Text(r2Key("data", filename));
    if (raw) {
      try {
        return JSON.parse(raw) as T;
      } catch {
        return fallback;
      }
    }
    return fallback;
  }

  const filePath = path.join(DATA_DIR, filename);
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      return JSON.parse(raw) as T;
    } catch {
      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        continue;
      }
      return fallback;
    }
  }
  return fallback;
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  const content = JSON.stringify(data, null, 2);

  if (isR2Configured()) {
    await writeR2Text(r2Key("data", filename), content);
    return;
  }

  const filePath = path.join(DATA_DIR, filename);
  const tempPath = `${filePath}.tmp`;
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(tempPath, content, "utf-8");
  await fs.rename(tempPath, filePath);
}

export async function getPages(): Promise<SeoPage[]> {
  return readJson<SeoPage[]>("pages.json", []);
}

export async function getPageByKey(key: string): Promise<SeoPage | undefined> {
  const pages = await getPages();
  const normalized = normalizeKey(key);

  return pages.find((p) => {
    const slugNorm = normalizeKey(p.slug);
    return (
      p.id === key ||
      p.id === normalized ||
      p.slug === key ||
      slugNorm === normalized
    );
  });
}

export async function savePage(page: SeoPage): Promise<void> {
  const pages = await getPages();
  const idx = pages.findIndex((p) => p.id === page.id);
  if (idx >= 0) pages[idx] = page;
  else pages.push(page);
  await writeJson("pages.json", pages);
}

export async function deletePage(id: string): Promise<void> {
  const pages = await getPages();
  await writeJson(
    "pages.json",
    pages.filter((p) => p.id !== id)
  );
}

export async function getSettings(): Promise<Settings> {
  return readJson<Settings>("settings.json", {});
}

export async function saveSettings(settings: Settings): Promise<void> {
  await writeJson("settings.json", settings);
}
