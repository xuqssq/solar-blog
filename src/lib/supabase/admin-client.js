import "server-only";
import { cache } from "react";
import { createClient } from "@supabase/supabase-js";

export const createSupabaseAdminClient = cache(() =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
);
