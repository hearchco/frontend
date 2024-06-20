install:
	pnpm install --frozen-lockfile

update:
	pnpm update

dev:
	pnpm run dev

compile:
	pnpm run build

preview:
	pnpm run preview

check:
	pnpm run check

test:
	pnpm run test:unit

lint:
	pnpm run lint

format:
	pnpm run format

aws:
	cp svelte.config.aws.js svelte.config.js

node:
	cp svelte.config.node.js svelte.config.js
