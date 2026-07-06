import { getPages, getPageByKey, type SeoPage } from "@/lib/data";
import { getTenantPages, getTenantPageByKey } from "@/lib/supabase/tenant-pages";
import { getResolvedSiteConfig } from "@/utils/siteConfig";
import type { TenantSiteConfigRow } from "@/types/tenant";

export interface PagesContext {
  pages: SeoPage[];
  tenant: TenantSiteConfigRow | null;
  isTenant: boolean;
}

export async function resolvePagesContext(): Promise<PagesContext> {
  const { tenant, isTenant } = await getResolvedSiteConfig();

  if (isTenant && tenant) {
    const pages = await getTenantPages(tenant.id);
    return { pages, tenant, isTenant: true };
  }

  const pages = await getPages();
  return { pages, tenant: null, isTenant: false };
}

export async function resolvePageByKey(key: string): Promise<{
  page: SeoPage | undefined;
  tenant: TenantSiteConfigRow | null;
}> {
  const { tenant, isTenant } = await getResolvedSiteConfig();

  if (isTenant && tenant) {
    const page = await getTenantPageByKey(tenant.id, key);
    return { page, tenant };
  }

  const page = await getPageByKey(key);
  return { page, tenant: null };
}
