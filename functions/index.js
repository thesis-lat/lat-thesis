import base from "html/base.html";
import home from "html/home.html";

import { headerHtml, mustache } from "@/api/lib";

export async function onRequestGet(context) {
  const updates = await d1LastUpdates(context);
  const result = formatUpdates(updates);
  const params = {
    title: "Thesis / Scientia potentia est!",
    content: mustache(home, { result }),
  };
  const html = mustache(base, params);
  return new Response(html, headerHtml);
}

async function d1LastUpdates(ctx) {
  const stmt = ctx.env.D1.prepare(
    `SELECT * FROM templates WHERE verificatur = 1 ORDER BY updated_at DESC LIMIT 10`,
  );
  const result = await stmt.all();
  return result.results;
}

function formatUpdates(updates) {
  return updates
    .map(
      (e) => `<div class="update">
    ${e.verificatur == 0 ? "\u274C" : "\u2705"} ${e.annus} ${e.lingua}<br>
    ${e.patriae_nomen}<br>
    <a href="https://github.com/${e.repo}" target="_blank">
      <i class="fa-brands fa-github-alt"></i> ${e.repo}
    </a><br>
    <small>${e.descriptio}</small>
  </div>`,
    )
    .join("");
}
