"use client";

import { createContext, useContext } from "react";
import type { SiteConfig } from "@/lib/site-config-types";
import type { TenantContentData } from "@/types/tenant";
import { phoneToTel } from "@/lib/site-config-types";

export type ClientSiteConfig = SiteConfig & { phoneTel: string };

const SiteConfigContext = createContext<ClientSiteConfig | null>(null);
const TenantUiContext = createContext<TenantContentData | null>(null);

export function SiteConfigProvider({
  config,
  tenantUi = null,
  children,
}: {
  config: SiteConfig;
  tenantUi?: TenantContentData | null;
  children: React.ReactNode;
}) {
  const value: ClientSiteConfig = {
    ...config,
    phoneTel: phoneToTel(config.phone),
  };
  return (
    <SiteConfigContext.Provider value={value}>
      <TenantUiContext.Provider value={tenantUi}>{children}</TenantUiContext.Provider>
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig(): ClientSiteConfig {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) throw new Error("useSiteConfig must be used within SiteConfigProvider");
  return ctx;
}

export function useTenantUi(): TenantContentData | null {
  return useContext(TenantUiContext);
}
