import { createSupabaseServerClient } from "@/lib/supabase/server-client";

const PAGE_SIZE = 10;

export async function getLatestArticles(limit = 5) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("articles")
    .select("id, title, publish_time, url, category_id, categories(name)")
    .order("publish_time", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function getCategories() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;
  return data || [];
}

export async function getArticlesPaginated({ categoryId, page = 1, pageSize = PAGE_SIZE }) {
  const supabase = await createSupabaseServerClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("articles")
    .select("id, title, publish_time, url, category_id, categories(name)", { count: "exact" })
    .order("publish_time", { ascending: false })
    .range(from, to);

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    articles: data || [],
    total: count || 0,
    totalPages: Math.ceil((count || 0) / pageSize),
    currentPage: page,
  };
}

export async function getArticleById(id) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*, categories(name)")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getAdjacentArticles(id) {
  const article = await getArticleById(id);
  if (!article) return { prev: null, next: null };

  const supabase = await createSupabaseServerClient();

  const [{ data: prevData }, { data: nextData }] = await Promise.all([
    supabase
      .from("articles")
      .select("id, title")
      .gt("publish_time", article.publish_time)
      .order("publish_time", { ascending: true })
      .limit(1),
    supabase
      .from("articles")
      .select("id, title")
      .lt("publish_time", article.publish_time)
      .order("publish_time", { ascending: false })
      .limit(1),
  ]);

  return {
    prev: prevData?.[0] ? { slug: prevData[0].id, title: prevData[0].title } : null,
    next: nextData?.[0] ? { slug: nextData[0].id, title: nextData[0].title } : null,
  };
}
