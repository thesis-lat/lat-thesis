export const headerHtml = {
  headers: {
    "Content-Type": "text/html;charset=UTF-8",
  },
};

export function mustache(html, params, defaultValue) {
  return html.replace(
    /{{([\w\s]+)}}/gi,
    (a, b) => params[b.trim()] ?? defaultValue ?? a,
  );
}

export function formatTemplates(templates) {
  return templates
    .map(
      (e) => `<div class="update">
  ${e.verificatur == 0 ? "\u274C" : "\u2705"}
  <a href="/@${e.repo}" target="_blank">${e.repo}</a><br>
  ${e.patriae_nomen}<br>
  <i class="fa-solid fa-language"></i> ${e.lingua}
  <i class="fa-solid fa-calendar"></i> ${e.annus}<br>
  <i class="fa-solid fa-comment"></i> ${e.descriptio}
</div>`,
    )
    .join("");
}
