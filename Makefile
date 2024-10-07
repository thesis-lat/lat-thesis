PUGS_FILES:=$(shell find assets/**/ -name "*.pug")
PUGS:= $(patsubst assets/%.pug,%,$(PUGS_FILES))

run:
	@npx wrangler pages dev static 

npm:
	npm install -g pug-cli

.PHONY: build
build: $(PUGS)

%:
	@mkdir -p $(dir $@)
	@pug -b ./assets/ ./assets/$@.pug --out $(dir $@)
