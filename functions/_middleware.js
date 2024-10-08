import * as templates from '@/templates'
import getSitemap from '@/sitemap.txt.js'
import getBash from '@/bash'

const API = {
    'GET': {
        '/sitemap.txt': getSitemap,
        '/@.*': templates.getInfo,
        '/sh/.*': getBash,
    },
    'POST': {
        '/api/templates/updates': templates.postUpdates,
        '/api/addere': templates.postAddere,
        '/api/quaerere': templates.postQuaerere,
    }
}

export async function onRequest(context) {
    const { method, url } = context.request
    if (API[method]) {
        const { pathname } = new URL(url)
        const fn = API[method][pathname]
            || API[method][
            Object.keys(API[method]).find(path => new RegExp(path).test(pathname))
            ]
        if (fn) return await fn(context)
    }
    return context.next()
}

async function onDefault(context) {
    const { pathname } = new URL(context.request.url)
    return new Response(`${context.request.method} ${pathname}`)
}