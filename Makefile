install:
	pnpm install --frozen-lockfile
	sed -i -E 's|npm:@sveltejs/kit@[^/"]+|@sveltejs/kit|g' ./node_modules/@hearchco/sveltekit-adapter-aws/handler/index.js

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

adapter-aws:
	cp svelte.config.aws.js svelte.config.js

adapter-node:
	cp svelte.config.node.js svelte.config.js

adapter-auto:
	cp svelte.config.auto.js svelte.config.js