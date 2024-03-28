install:
	pnpm install --frozen-lockfile

dev:
	pnpm run dev

build:
	pnpm run build

preview:
	pnpm run preview

cf:
	cp svelte.config.cf.js svelte.config.js

node:
	cp svelte.config.node.js svelte.config.js