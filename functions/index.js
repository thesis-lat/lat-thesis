import base from "html/base.html";
import home from "html/home.html";

import { headerHtml, mustache, formatTemplates } from "@/api/lib";

export async function onRequestGet(context) {
  const templates = await d1LastTemplates(context);
  const result = formatTemplates(templates);
  const params = {
    title: "Thesis / Scientia potentia est!",
    content: mustache(home, { result }),
  };
  const html = mustache(base, params);
  return new Response(html, headerHtml);
}

async function d1LastTemplates(context) {
  const stmt = context.env.D1.prepare(
    `SELECT *
FROM templates
WHERE verificatur > 0
ORDER BY annus DESC
LIMIT 10`,
  );
  const result = await stmt.all();
  return result.results;
}
