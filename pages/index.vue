<template>
	<div @mousemove="handleMouseMove">
		<div class="w-screen h-screen relative overflow-hidden">
			<div class="fixed top-0 left-0 z-0 animation-shaky select-none">
				<img
					src="https://res.cloudinary.com/duzvevuup/image/upload/v1751240816/Game%20Design%20Showcase%20Website/jinx_rl3ggw.webp"
					class="relative min-w-screen min-h-screen w-screen h-screen object-cover scale-105"
					alt=""
				/>
			</div>
			<div
				class="plus-pattern fixed top-0 left-0 z-0 min-w-screen min-h-screen w-screen h-screen"
			></div>
			<div
				class="landing-gradient fixed top-0 left-0 z-0 min-w-screen min-h-screen w-screen h-screen"
			></div>
		</div>
		<div class="absolute top-0 mt-[40vh] left-0 z-20 px-16">
			<h1 class="font-bold text-5xl text-pink mb-4">
				"GAME <span class="text-blue">ON</span>"
			</h1>
			<div class="w-[40vw] text-white text-2xl flex-col">
				<p class="text-white text-2xl">
					Kon Khmer Games is an independent game development studio
					founded and operated by Khmer developers. Established in 23
					February 2024, we have been operating for 1 year as of 2025.
					We create engaging interactive experiences and innovative
					gameplay that entertains players worldwide, bringing fresh
					perspectives and creativity to the gaming industry.
				</p>
			</div>
			<div class="mt-8">
				<NuxtLink href="/games"><LandingButton /></NuxtLink>
			</div>
		</div>
		<TresCanvas window-size alpha class="">
			<TresPerspectiveCamera
				:args="[80, 1, 0.1, 1000]"
				:position="[0, 0.2, 3.25]"
			/>
			<TresAmbientLight :intensity="1" />
			<TresDirectionalLight :position="[0, 240, 80]" />
			<Suspense>
				<LandingArcadeMachine
					:mouse-x="mousePosition.x"
					:mouse-y="mousePosition.y"
				/>
			</Suspense>
		</TresCanvas>
	</div>
</template>

<script lang="ts" setup>
const mousePosition = reactive({
	x: 0,
	y: 0,
});
const handleMouseMove = (event: MouseEvent) => {
	mousePosition.x = event.clientX;
	mousePosition.y = event.clientY;
};
</script>

<style></style>
