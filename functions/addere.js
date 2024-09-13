import base from "html/base.html";
import addere from "html/addere.html";

import { headerHtml, mustache } from "@/api/lib";

const templateDefault = {
  url: "https://github.com/thesis-lat/template",
  repo: "thesis-lat/template",
  patriaeNomen: "Vatican City Statte",
  patria: "vat",
  lingua: "Latin",
  flag: "🇻🇦",
  universitas: "www.thesis.lat",
  facultas: "thesis.lat/facultas",
  repositorium: "repositorium.thesis.lat/",
  descriptio: "Informatiō thesis",
  annus: 2024,
  publicae: "\u2705", // \u274C
};
export async function onRequestGet(context) {
  return content(templateDefault);
}

export async function onRequestPost(context) {
  const formData = await context.request.formData();
  const url = formData.get("url");
  if (url == templateDefault.url) {
    return content(templateDefault);
  }
  let template = await makeTemplate(url);
  if (template && (await d1Update(context, template))) {
    template.publicae = "\u2705";
  }
  return content(template);
}

function content(template) {
  const params = {
    title: "Addere / Thesis",
    content: mustache(addere, template),
  };
  const html = mustache(base, params);
  return new Response(html, headerHtml);
}

async function getJson(url) {
  let res = await fetch(url);
  if (res.status == 200) return await res.json();
}

async function makeTemplate(url) {
  let template = templateDefault;
  template.url = url;
  template.publicae = "\u274C";
  if (url.startsWith("https://github.com/")) {
    template.repo = url.slice(19);
    const info = await getJson(
      "https://raw.githubusercontent.com/" +
        template.repo +
        "/main/thesis.json",
    );
    Object.keys(info).forEach((k) => (template[k] = info[k] ?? ""));
    const patria = await getJson(
      "https://restcountries.com/v3.1/alpha/" + info.patria,
    );
    if (patria[0]) {
      template.patriaeNomen = patria[0].name.official;
      template.flag = patria[0].flag;
      template.lingua = patria[0].languages[info.lingua] ?? info.lingua;
    }
  }
  return template;
}

async function d1Update(ctx, template) {
  const stmt = ctx.env.D1.prepare(
    `INSERT INTO templates(
    repo, annus, patria, patriae_nomen, lingua,
    universitas, facultas, repositorium,
    descriptio
) VALUES (
  ?1, ?2, ?3, ?4, ?5,
  ?6, ?7, ?8,
  ?9
)
ON CONFLICT (repo) DO UPDATE SET
  annus = excluded.annus,
  patria = excluded.patria,
  patriae_nomen = excluded.patriae_nomen,
  lingua = excluded.lingua,
  universitas = excluded.universitas,
  facultas = excluded.facultas,
  repositorium = excluded.repositorium,
  descriptio = excluded.descriptio,
  updated_at = current_timestamp
`,
  ).bind(
    template.repo,
    template.annus,
    template.patria,
    template.flag + " " + template.patriaeNomen,
    template.lingua,
    template.universitas,
    template.facultas,
    template.repositorium,
    template.descriptio,
  );
  const result = await stmt.run();
  return result.meta.changes > 0;
}
