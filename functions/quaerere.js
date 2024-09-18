import htmlBase from "html/base.html";
import htmlQuaerere from "html/quaerere.html";

import { headerHtml, mustache, formatTemplates } from "@/api/lib";

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const query = url.searchParams.get("q") ?? "";
  const templates = await d1SearchTemplates(context, query);
  let result = formatTemplates(templates);
  const params = {
    title: "Quaerere / Thesis",
    content: mustache(htmlQuaerere, { query, result }),
  };
  const html = mustache(htmlBase, params);
  return new Response(html, headerHtml);
}

async function d1SearchTemplates(context, query) {
  if (query == "") return [];
  const search = `%${query}%`;
  const stmt = context.env.D1.prepare(
    `SELECT *
FROM templates
WHERE repo LIKE ?1
  OR patria LIKE ?1
  OR universitas LIKE ?1
  OR descriptio LIKE ?1
ORDER BY updated_at DESC
LIMIT 20`,
  ).bind(search);
  const result = await stmt.all();
  return result.results;
}
