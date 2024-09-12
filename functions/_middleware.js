import base from "html/base.html";
import template from "html/template.html";

import { headerHtml, mustache } from "@/api/lib";

export async function onRequest(context) {
  const { pathname } = new URL(context.request.url);
  if (pathname.slice(0, 2) == "/@") {
    const repo = pathname.slice(2);
    const data = await d1Template(context, repo);
    if (data) {
      data.verificatur = data.verificatur.toLocaleString("es-ES");
      const html = mustache(base, {
        title: data.repo.toUpperCase(),
        content: mustache(template, data),
      });
      await d1Verificatur(context, repo);
      return new Response(html, headerHtml);
    }
  }
  return context.next();
}

async function d1Template(context, repo) {
  const stmt = context.env.D1.prepare(
    `SELECT *
FROM templates
WHERE repo = ?1`,
  ).bind(repo);
  return await stmt.first();
}

async function d1Verificatur(context, repo) {
  const stmt = context.env.D1.prepare(
    `UPDATE templates
SET verificatur = verificatur + 1
WHERE repo = ?1`,
  ).bind(repo);
  const result = await stmt.run();
  return result.meta.changes > 0;
}
