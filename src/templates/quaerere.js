import { headerJson } from "@/lib";

const testData = [
    { annus: 2024, lingua: 'Latin', patriae_nomen: '🇻🇦 Vatican City Statte', repo: 'thesis-lat/template', descriptio: 'Descriptio' },
    { annus: 2024, lingua: 'Latin', patriae_nomen: '🇻🇦 Vatican City Statte', repo: 'thesis-lat/template', descriptio: 'Descriptio' },
    { annus: 2024, lingua: 'Latin', patriae_nomen: '🇻🇦 Vatican City Statte', repo: 'thesis-lat/template', descriptio: 'Descriptio' },
    { annus: 2024, lingua: 'Latin', patriae_nomen: '🇻🇦 Vatican City Statte', repo: 'thesis-lat/template', descriptio: 'Descriptio' },
]

export default async function onRequestPost(context) {
    const formData = await context.request.formData()
    const query = formData.get('q') ?? '';
    const data = await d1Data(context, query)
    return new Response(JSON.stringify(data), headerJson)
}

async function d1Data(context, query) {
    if (query == '') return [];
    const search = `%${query}%`;
    const stmt = context.env.D1.prepare(
        `SELECT repo, annus, lingua, patriae_nomen, descriptio
FROM templates
WHERE repo LIKE ?1
  OR patria LIKE ?1
  OR universitas LIKE ?1
  OR descriptio LIKE ?1
ORDER BY updated_at DESC
LIMIT 7`,
    ).bind(search);
    //return testData
    return (await stmt.all()).results
}