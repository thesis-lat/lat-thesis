import htmlInfo from '../../templates/info.tpl.html'

import { mustache, headerHtml } from '@/lib'

const testData = {
    repo: 'thesis-lat/template',
    patriae_nomen: '🇻🇦 Vatican City Statte',
    lingua: 'Latin',
    universitas: 'www.thesis.lat',
    facultas: 'thesis.lat/facultas',
    repositorium: 'repositorium.thesis.lat/',
    descriptio: 'Informatiō thesis',
    annus: 2024,
    verificatur: 1_000_000_000,
}

export default async function onRequestGet(context) {
    const { pathname } = new URL(context.request.url)
    const repo = pathname.slice(2)
    const data = await d1Data(context, repo)
    if (data) {
        await d1Verificatur(context, repo)
        data.title = data.repo.toUpperCase()
        data.domain = context.env.DOMAIN
        const html = mustache(htmlInfo, data)
        return new Response(html, headerHtml)
    }
    return context.next()
}

async function d1Data(context, repo) {
    const stmt = context.env.D1.prepare(
        `SELECT 
    repo, patriae_nomen, lingua, annus, universitas, facultas, 
    repositorium, descriptio, verificatur
FROM templates
WHERE repo = ?1`,
    ).bind(repo)
    // return testData
    return await stmt.first()
}

async function d1Verificatur(context, repo) {
    const stmt = context.env.D1.prepare(
        `UPDATE templates
SET verificatur = verificatur + 1
WHERE repo = ?1`,
    ).bind(repo);
    return (await stmt.run()).meta
}
