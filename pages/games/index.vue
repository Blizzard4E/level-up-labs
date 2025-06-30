<template>
	<div @mousemove="handleMouseMove">
		<div class="w-screen h-screen relative overflow-hidden">
			<div class="absolute top-0 left-0 z-0 animation-shaky select-none">
				<img
					src="https://res.cloudinary.com/duzvevuup/image/upload/v1751240816/Game%20Design%20Showcase%20Website/jinx_rl3ggw.webp"
					class="relative min-w-screen min-h-screen w-screen h-screen object-cover scale-105"
					alt=""
				/>
			</div>
			<div
				class="plus-pattern absolute top-0 left-0 z-0 min-w-screen min-h-screen w-screen h-screen"
			></div>
			<div
				class="landing-gradient absolute top-0 left-0 z-10 min-w-screen min-h-screen w-screen h-screen"
			></div>
			<div
				class="absolute top-0 left-0 z-20 w-screen h-screen flex items-center justify-center"
			>
				<div class="w-[40vw] flex justify-between items-center">
					<button
						class="text-white text-2xl font-bold p-4 transition-opacity duration-200"
						:class="{
							'opacity-50 cursor-not-allowed': isAnimating,
						}"
						:disabled="isAnimating"
						@click="goToPrevious"
					>
						Back
					</button>
					<button
						class="text-white text-2xl font-bold p-4 transition-opacity duration-200"
						:class="{
							'opacity-50 cursor-not-allowed': isAnimating,
						}"
						:disabled="isAnimating"
						@click="goToNext"
					>
						Next
					</button>
				</div>
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
				<GameCase
					:selected-game-case="selectedGameCase"
					:mouse-x="mousePosition.x"
					:mouse-y="mousePosition.y"
					:game-cases="gameCases"
				/>
			</Suspense>
		</TresCanvas>
	</div>
</template>

<script lang="ts" setup>
import { GameCase } from "#components";

const mousePosition = reactive({
	x: 0,
	y: 0,
});

const isAnimating = ref(false);

const handleMouseMove = (event: MouseEvent) => {
	mousePosition.x = event.clientX;
	mousePosition.y = event.clientY;
};

const gameCases = [
	{ id: "case1", texture: "/textures/game_covers.png" },
	{ id: "case2", texture: "/textures/game_covers.png" },
	{ id: "case3", texture: "/textures/game_covers.png" },
	{ id: "case4", texture: "/textures/game_covers.png" },
	{ id: "case5", texture: "/textures/game_covers.png" },
	{ id: "case6", texture: "/textures/game_covers.png" },
	{ id: "case7", texture: "/textures/game_covers.png" },
	{ id: "case8", texture: "/textures/game_covers.png" },
	{ id: "case9", texture: "/textures/game_covers.png" },
	{ id: "case10", texture: "/textures/game_covers.png" },
	{ id: "case11", texture: "/textures/game_covers.png" },
	{ id: "case12", texture: "/textures/game_covers.png" },
];

const selectedGameCase = ref(Math.floor(gameCases.length / 2));

const blockInteraction = () => {
	isAnimating.value = true;
	setTimeout(() => {
		isAnimating.value = false;
	}, 1350); // 1350ms animation duration
};

const goToPrevious = () => {
	if (isAnimating.value) return;

	if (selectedGameCase.value > 0) {
		selectedGameCase.value--;
		blockInteraction();
	}
};

const goToNext = () => {
	if (isAnimating.value) return;

	if (selectedGameCase.value < gameCases.length - 1) {
		selectedGameCase.value++;
		blockInteraction();
	}
};
</script>

<style></style>
