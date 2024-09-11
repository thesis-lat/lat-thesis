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
