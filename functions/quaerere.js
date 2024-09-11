import base from "html/base.html";
import quaerere from "html/quaerere.html";

import { headerHtml, mustache } from "@/api/lib";

export async function onRequestGet(context) {
  const result = "";
  const params = {
    title: "Quaerere / Thesis",
    content: mustache(quaerere, { result }),
  };
  const html = mustache(base, params);
  return new Response(html, headerHtml);
}
