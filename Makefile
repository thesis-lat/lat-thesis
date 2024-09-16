run:
	npx wrangler pages dev static

pkgs:
	sudo apt update -y
	sudo apt install -y $(shell cat ./apt-packages.txt)

doc:
	@pandoc \
	--filter pandoc-plantuml \
	-o ./static/Thesis.pdf \
	./docs/meta.yml \
	$(shell cat ./docs/docs.txt)
