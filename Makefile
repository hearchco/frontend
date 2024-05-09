install:
	pnpm install --frozen-lockfile

dev:
	pnpm run dev

compile:
	pnpm run build

preview:
	pnpm run preview

check:
	pnpm run check

test:
	pnpm run test

lint:
	pnpm run lint

format:
	pnpm run format

aws:
	cp svelte.config.aws.js svelte.config.js

node:
	cp svelte.config.node.js svelte.config.js