import * as templates from '@/templates'

const API = {
    'GET': {
        '/@.*': onDefault,
    },
    'POST': {
        '/api/templates/updates': templates.postUpdates,
        '/api/addere': templates.postAddere,
        '/api/quaerere': onDefault,
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