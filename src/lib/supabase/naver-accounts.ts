import { getSupabaseAdmin } from "./tenant-db";

export interface NaverAccountRow {
  id: string;
  naver_id: string;
  label: string | null;
  vm_label: string | null;
  is_active: boolean;
  created_at: string;
}

export interface NaverRegisterJobRow {
  id: string;
  site_config_id: string;
  naver_account_id: string | null;
  naver_id: string;
  site_name: string;
  site_url: string;
  api_base_url: string;
  worker_token: string;
  status: "pending" | "processing" | "meta_applied" | "completed" | "failed";
  claimed_by: string | null;
  claimed_at: string | null;
  meta_applied_at: string | null;
  completed_at: string | null;
  error: string | null;
  created_at: string;
}

export async function listNaverAccounts(activeOnly = false): Promise<NaverAccountRow[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  let query = supabase.from("naver_accounts").select("*").order("naver_id", { ascending: true });
  if (activeOnly) query = query.eq("is_active", true);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data || []) as NaverAccountRow[];
}

export async function fetchNaverAccountById(id: string): Promise<NaverAccountRow | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase.from("naver_accounts").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return data as NaverAccountRow;
}

export async function insertNaverAccount(input: {
  naver_id: string;
  label?: string | null;
  vm_label?: string | null;
}): Promise<NaverAccountRow> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase가 설정되지 않았습니다.");

  const naverId = input.naver_id.trim().toLowerCase();
  const { data, error } = await supabase
    .from("naver_accounts")
    .insert({
      naver_id: naverId,
      label: input.label?.trim() || null,
      vm_label: input.vm_label?.trim() || null,
      is_active: true,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as NaverAccountRow;
}

export async function deleteNaverAccount(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase가 설정되지 않았습니다.");

  const { error } = await supabase.from("naver_accounts").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function insertNaverRegisterJob(
  row: Omit<NaverRegisterJobRow, "id" | "status" | "claimed_by" | "claimed_at" | "meta_applied_at" | "completed_at" | "error" | "created_at">
): Promise<NaverRegisterJobRow> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase가 설정되지 않았습니다.");

  const { data, error } = await supabase
    .from("naver_site_register_jobs")
    .insert({ ...row, status: "pending" })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as NaverRegisterJobRow;
}

export async function fetchNaverRegisterJobById(id: string): Promise<NaverRegisterJobRow | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("naver_site_register_jobs")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data as NaverRegisterJobRow;
}

export async function listNaverRegisterJobsForWorker(
  naverId: string
): Promise<NaverRegisterJobRow[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const normalized = naverId.trim().toLowerCase();
  const { data, error } = await supabase
    .from("naver_site_register_jobs")
    .select("*")
    .eq("naver_id", normalized)
    .in("status", ["pending", "processing", "meta_applied"])
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data || []) as NaverRegisterJobRow[];
}

export async function updateNaverRegisterJob(
  id: string,
  patch: Partial<NaverRegisterJobRow>
): Promise<NaverRegisterJobRow> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase가 설정되지 않았습니다.");

  const { data, error } = await supabase
    .from("naver_site_register_jobs")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as NaverRegisterJobRow;
}
