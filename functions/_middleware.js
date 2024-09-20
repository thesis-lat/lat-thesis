import htmlBase from "html/base.html";
import htmlTemplate from "html/template.html";

import { headerHtml, mustache } from "@/api/lib";

export async function onRequest(context) {
  const domain = context.env.DOMAIN;
  const { pathname } = new URL(context.request.url);
  if (pathname.slice(0, 2) == "/@") {
    const repo = pathname.slice(2);
    const data = await d1Template(context, repo);
    if (data) {
      data.verificatur = data.verificatur.toLocaleString("es-ES");
      data.domain = domain;
      const html = mustache(htmlBase, {
        title: data.repo.toUpperCase(),
        content: mustache(htmlTemplate, data),
      });
      await d1Verificatur(context, repo);
      return new Response(html, headerHtml);
    }
  } else if (pathname.slice(0, 4) == "/sh/") {
    const repo = pathname.slice(4);
    return new Response(
      `git clone https://github.com/${repo}.git /tmp/template
rm -rf /tmp/template/.git/
cp -r /tmp/template/* /tmp/template/.github /tmp/template/.gitignore ./
rm -rf /tmp/template
`,
      {
        headers: {
          "Content-Type": "text/x-shellscript",
          "Access-Control-Allow-Origin": "*"
        },
      },
    );
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
