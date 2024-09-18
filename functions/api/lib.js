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
  ${e.annus} ${e.lingua} ${e.patriae_nomen}<br>
  ${e.descriptio}<br>
  <a href="/@${e.repo}">${e.repo}</a>
</div>`,
    )
    .join("");
}
