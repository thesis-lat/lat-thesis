import page from "../templates/page.html";

export async function onRequest(context) {
  return new Response(page, {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}
