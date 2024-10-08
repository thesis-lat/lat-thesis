export default async function onRequestGet(context) {
    const domain = context.env.DOMAIN
    const data = await d1Data(context)
    const list = data.map((e) => domain + '@' + e.repo).join('\n')
    return new Response(list)
}

async function d1Data(context) {
    const stmt = context.env.D1.prepare(`SELECT repo
FROM templates
WHERE verificatur > 0
ORDER BY verificatur ASC
LIMIT 100`)
    return (await stmt.all()).results
}
