export const headerHtml = {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' }
}

export const headerJson = {
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
}

export function mustache(html, params, defaultValue) {
    return html.replace(
        /{{([\w\s]+)}}/gi,
        (a, b) => params[b.trim()] ?? defaultValue ?? a,
    )
}

export function encodeText(value) {
    if (typeof value == 'string') {
        return value
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/\n/g, '<br>')
    }
    return value
}
