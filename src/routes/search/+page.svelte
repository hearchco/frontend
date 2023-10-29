<!-- Header section -->
<header
	class="custom-bg-headfoot dark:custom-bg-headfoot flex h-36 w-full items-center border border-gray-100 dark:border-0"
>
	<div class="mx-4 w-full">
		<div class="mx-auto flex max-w-screen-md items-center">
			<div>
				<a href="/">
					<img class="h-20 w-20" src="/img/brzaguza.svg" alt="" />
				</a>
			</div>
			<div
				class="custom-bg-button dark:custom-bg-button flex h-12 w-full rounded-full border border-gray-100 shadow-2xl dark:border-0 dark:text-white"
			>
				<input
					class="mx-4 h-full w-full bg-transparent focus:outline-none"
					type="text"
					placeholder="Guzni..."
					autocomplete="off"
					autocapitalize="none"
					spellcheck="false"
					autocorrect="off"
					dir="auto"
					value=""
				/>
				<!-- <button
            class="brzaguza-text-blue hover:brzaguza-text-pink h-full w-8 rounded-full bg-transparent"
          >
            <svg
              class="h-1/2 w-full bg-transparent"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M368 368L144 144M368 144L144 368"
              ></path>
            </svg>
          </button> -->
				<button
					class="brzaguza-text-blue hover:brzaguza-bg-pink h-full w-20 rounded-full bg-transparent"
				>
					<svg class="mx-auto h-1/2 w-full bg-transparent" viewBox="0 0 512 512" aria-hidden="true">
						<path
							d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
							fill="none"
							stroke="currentColor"
							stroke-miterlimit="10"
							stroke-width="32"
						/>
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-miterlimit="10"
							stroke-width="32"
							d="M338.29 338.29L448 448"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</header>
<div class="mx-auto mb-4 max-w-screen-sm">
	<div id="result-list" class="mx-2 my-4 max-w-fit overflow-clip">
		<template>
			<div>
				<article id="result">
					<a id="link" href="https://brzaguza.rs" class="dark:text-white" rel="noreferrer"
						>https://brzaguza.rs</a
					>
					<h1
						id="title"
						class="brzaguza-text-blue hover:brzaguza-text-pink text-xl hover:underline"
					>
						<a href="https://brzaguza.rs" rel="noreferrer">BrzaGuza - Metasearch engine</a>
					</h1>
					<p id="description" class="my-1 text-justify text-sm text-gray-600 dark:text-gray-200" />
					<div id="engines" class="my-2 text-right text-xs text-gray-800 dark:text-gray-400">
						<template>
							<span class="mx-0.5" />
						</template>
					</div>
				</article>
				<hr class="my-2 border border-gray-200 dark:border-gray-600" />
			</div>
		</template>
	</div>
</div>
