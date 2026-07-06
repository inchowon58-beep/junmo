import type { SeoFaq, SeoPage, LocalPartner } from "@/lib/data";
import { getSupabaseAdmin } from "./tenant-db";

export interface TenantSeoPageRow {
  id: string;
  site_config_id: string;
  slug: string;
  keyword: string;
  region_name: string | null;
  title: string;
  description: string;
  content: string;
  faqs: SeoFaq[];
  local_partners: LocalPartner[] | null;
  image_index: number | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

function normalizeKey(value: string): string {
  try {
    return decodeURIComponent(value).normalize("NFC").trim();
  } catch {
    return value.normalize("NFC").trim();
  }
}

export function tenantRowToSeoPage(row: TenantSeoPageRow): SeoPage {
  return {
    id: row.id,
    slug: row.slug,
    keyword: row.keyword,
    regionName: row.region_name || undefined,
    title: row.title,
    description: row.description,
    content: row.content,
    faqs: row.faqs || [],
    localPartners: row.local_partners || undefined,
    imageIndex: row.image_index || undefined,
    imageUrl: row.image_url || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function seoPageToRow(siteConfigId: string, page: SeoPage): Omit<TenantSeoPageRow, "created_at" | "updated_at"> {
  return {
    id: page.id,
    site_config_id: siteConfigId,
    slug: page.slug,
    keyword: page.keyword,
    region_name: page.regionName || null,
    title: page.title,
    description: page.description,
    content: page.content,
    faqs: page.faqs || [],
    local_partners: page.localPartners || null,
    image_index: page.imageIndex ?? null,
    image_url: page.imageUrl || null,
  };
}

export async function getTenantPages(siteConfigId: string): Promise<SeoPage[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("tenant_seo_pages")
    .select("*")
    .eq("site_config_id", siteConfigId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as TenantSeoPageRow[]).map(tenantRowToSeoPage);
}

export async function getTenantPageByKey(
  siteConfigId: string,
  key: string
): Promise<SeoPage | undefined> {
  const pages = await getTenantPages(siteConfigId);
  const normalized = normalizeKey(key);

  return pages.find((p) => {
    const slugNorm = normalizeKey(p.slug);
    return p.id === key || p.id === normalized || p.slug === key || slugNorm === normalized;
  });
}

export async function saveTenantPage(siteConfigId: string, page: SeoPage): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error("Supabase가 설정되지 않았습니다.");
  }

  const row = seoPageToRow(siteConfigId, page);
  const now = new Date().toISOString();

  const { data: existing } = await supabase
    .from("tenant_seo_pages")
    .select("id")
    .eq("id", page.id)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("tenant_seo_pages")
      .update({ ...row, updated_at: now })
      .eq("id", page.id);
    if (error) throw new Error(error.message);
    return;
  }

  const { error } = await supabase.from("tenant_seo_pages").insert({
    ...row,
    created_at: page.createdAt || now,
    updated_at: page.updatedAt || now,
  });

  if (error) throw new Error(error.message);
}

export async function deleteTenantPage(siteConfigId: string, pageId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase가 설정되지 않았습니다.");

  const { error } = await supabase
    .from("tenant_seo_pages")
    .delete()
    .eq("site_config_id", siteConfigId)
    .eq("id", pageId);

  if (error) throw new Error(error.message);
}
