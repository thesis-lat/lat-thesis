run:
	bun run wrangler pages dev static

serve:
	python3 -m http.server -d docs -p ./assets/static
