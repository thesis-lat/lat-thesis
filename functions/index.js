import base from "html/base.html";
import home from "html/home.html";

import { headerHtml, mustache } from "@/api/lib";

export async function onRequestGet(context) {
  const result = "";
  const params = {
    title: "Thesis / Scientia potentia est!",
    content: mustache(home, { result }),
  };
  const html = mustache(base, params);
  return new Response(html, headerHtml);
}
