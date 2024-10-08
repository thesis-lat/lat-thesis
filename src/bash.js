export default async function onRequestGet(context) {
    const { pathname } = new URL(context.request.url)
    const repo = pathname.slice(4)
    return new Response(
        `git clone https://github.com/${repo}.git /tmp/template
rm -rf /tmp/template/.git/
cp -r /tmp/template/* /tmp/template/.github /tmp/template/.gitignore ./
rm -rf /tmp/template`,
        {
            headers: {
                "Content-Type": "text/x-shellscript",
                "Access-Control-Allow-Origin": "*"
            }
        }
    )
}
