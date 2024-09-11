NAME=thesis

# test paths=
test:
	sqlite3 < $(paths)

# execute-file ctx=--local path=
execute-file:
	bun run wrangler d1 execute $(NAME) $(ctx) --file $(path)

# execute ctx=--remote sql="SELECT 1"
execute:
	bun run wrangler d1 execute $(NAME) $(ctx) --command "$(sql)"

local:
	@make execute-file ctx=--local path=./tables.sql

remote:
	@make execute-file ctx=--remote path=./tables.sql
