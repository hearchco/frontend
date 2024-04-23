install:
	pnpm install --frozen-lockfile

dev:
	pnpm run dev

compile:
	pnpm run build

preview:
	pnpm run preview

aws:
	cp svelte.config.aws.js svelte.config.js

node:
	cp svelte.config.node.js svelte.config.js