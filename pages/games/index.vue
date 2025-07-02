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
				class="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-30"
			>
				<div class="w-[40vw] flex justify-between items-center">
					<button
						class="text-white text-2xl font-bold p-4 group cursor-pointer transition-opacity"
						:class="{
							'opacity-50 cursor-not-allowed': isAnimating,
						}"
						:disabled="isAnimating"
						@click="goToPrevious"
					>
						<svg
							width="33"
							height="58"
							viewBox="0 0 33 58"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="group-hover:scale-125 duration-300 ease-in-out"
						>
							<path
								d="M1.0901 28.8744L29.3744 0.590149L32.9099 4.12568L4.62563 32.41L1.0901 28.8744Z"
								class="group-hover:fill-pink fill-white duration-300 ease-in-out"
							/>
							<path
								d="M4.50001 25.5L32.7843 53.7843L29.2487 57.3198L0.964478 29.0356L4.50001 25.5Z"
								class="group-hover:fill-pink fill-white duration-300 ease-in-out"
							/>
						</svg>
					</button>
					<button
						class="text-white text-2xl font-bold p-4 group cursor-pointer transition-opacity"
						:class="{
							'opacity-50 cursor-not-allowed': isAnimating,
						}"
						:disabled="isAnimating"
						@click="goToNext"
					>
						<svg
							class="scale-x-[-1] group-hover:scale-x-[-1.25] group-hover:scale-y-125 duration-300 ease-in-out"
							width="33"
							height="58"
							viewBox="0 0 33 58"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1.0901 28.8744L29.3744 0.590149L32.9099 4.12568L4.62563 32.41L1.0901 28.8744Z"
								class="group-hover:fill-pink fill-white duration-300 ease-in-out"
							/>
							<path
								d="M4.50001 25.5L32.7843 53.7843L29.2487 57.3198L0.964478 29.0356L4.50001 25.5Z"
								class="group-hover:fill-pink fill-white duration-300 ease-in-out"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div class="absolute top-0 left-0 z-30 text-white px-16">
				<div class="w-[20vw] mt-[20vh] grid gap-4">
					<h1 class="font-bold text-4xl uppercase text-pink">
						{{ gameCases[selectedGameCase].title }}
					</h1>
					<p class="text-xl">
						Genre:
						<span
							class="text-blue"
							v-for="(genre, i) in gameCases[selectedGameCase]
								.genres"
							:key="
								gameCases[selectedGameCase].id +
								'-genre-' +
								genre.id
							"
							>{{
								genre.name +
								(i !==
								gameCases[selectedGameCase].genres.length - 1
									? ", "
									: "")
							}}
						</span>
					</p>
					<p class="text-xl">
						{{ gameCases[selectedGameCase].desc }}
					</p>

					<h2 class="text-xl font-bold mt-6 uppercase">
						PUBLISHED BY
					</h2>
					<p
						class="text-xl uppercase"
						v-for="publisher in gameCases[selectedGameCase]
							.publishers"
						:key="'publisher-' + publisher.id"
					>
						{{ publisher.name }}
					</p>
					<h2 class="text-xl font-bold uppercase mt-6">
						{{ gameCases[selectedGameCase].releasedDate }}
					</h2>
					<div class="mt-16">
						<NuxtLink
							target="_blank"
							:href="gameCases[selectedGameCase].downloadUrl"
							><GameDownload
						/></NuxtLink>
					</div>
				</div>
			</div>
			<div
				class="absolute top-0 mt-[20vh] right-[1rem] z-30 text-white px-16"
			>
				<div class="w-[20vw] grid gap-4">
					<h2 class="text-xl font-bold uppercase">Gameplays</h2>
					<div class="relative flex flex-col gap-8">
						<div
							v-for="(gameplay, i) in gameCases[selectedGameCase]
								.gameplays"
							:key="'gameplay-' + i"
							class="relative"
						>
							<div
								:class="[
									'absolute top-[0.6rem] left-[0.6rem] w-full aspect-video z-0',
									i % 2 === 0 ? 'bg-pink' : 'bg-blue',
								]"
							></div>
							<video
								:src="gameplay"
								class="w-full aspect-video object-cover relative z-10"
								autoplay
								loop
								controls
								muted
							></video>
						</div>
					</div>
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

const gameplayUrl =
	"https://res.cloudinary.com/duzvevuup/video/upload/v1751300316/Game%20Design%20Showcase%20Website/EscapeFromParagon_FullGameplay-ezgif.com-video-cutter_a2bvsq.mp4";

const gameCases: Game[] = [
	{
		id: "The Whisper",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751432290/Game%20Design%20Showcase%20Website/The%20Whisper/Whisper_cover_ildgso.png",
		title: "The Whisper",
		desc: "You are stranded and find yourself at an old home. Inside, you find a demon creature that wants to eat your flesh. To survive, you must destroy the pentagrams that have been lay down in the house. Only then, will the demon perish from this world.",
		genres: [
			{ id: "Horror", name: "Horror" },
			{ id: "Survival", name: "Survival" },
			{ id: "Exploration", name: "Exploration" },
		],
		publishers: [{ id: "Kosal Vathanak", name: "Kosal Vathanak" }],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751430037/Game%20Design%20Showcase%20Website/The%20Whisper/whisper_gameplay_mmgaur.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/18hiwqLtBGTuwuSwzYn34kWVXmGL7ZQ31/view?usp=sharing",
	},
	{
		id: "Corpse Hoarder",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751433114/Game%20Design%20Showcase%20Website/Corpse%20Hoarder/Corpse_Hoarder_q5ccu3.png",
		title: "Corpse Hoarder",
		desc: "As the gatekeeper of the Yin-Yang Transfer Division, you must judge who can reincarnate. When villagers from your mysterious past appear—some real, some impostors—you must use your intuition to separate truth from illusion.",
		genres: [
			{ id: "Supernatural Thriller", name: "Supernatural Thriller" },
			{ id: "Psychological Mystery", name: "Psychological Mystery" },
			{ id: "Visual Novel-Adventure", name: "Visual Novel-Adventure" },
		],
		publishers: [
			{ id: "Kosal Vathanak", name: "Kosal Vathanak" },
			{ id: "Mak Sammakara", name: "Mak Sammakara" },
		],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751432610/Game%20Design%20Showcase%20Website/Corpse%20Hoarder/Corpse_Hoarder_hrfpif.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/18hiwqLtBGTuwuSwzYn34kWVXmGL7ZQ31/view?usp=sharing",
	},
	{
		id: "GS Corporation",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751434760/Game%20Design%20Showcase%20Website/GS%20Corporation/GS_Corporation_x8o1fr.png",
		title: "GS Corporation",
		desc: "As the gatekeeper of the Yin-Yang Transfer Division, you must judge who can reincarnate. When villagers from your mysterious past appear—some real, some impostors—you must use your intuition to separate truth from illusion.",
		genres: [
			{ id: "Psychological Horror", name: "Psychological Horror" },
			{ id: "Survival Mystery,", name: "Survival Mystery," },
			{
				id: "Narrative-Driven Adventure",
				name: "Narrative-Driven Adventure",
			},
		],
		publishers: [{ id: "Mak Sammakara", name: "Mak Sammakara" }],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751434393/Game%20Design%20Showcase%20Website/GS%20Corporation/Trailer_s5ppcs.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/18hiwqLtBGTuwuSwzYn34kWVXmGL7ZQ31/view?usp=sharing",
	},
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
	} else {
		selectedGameCase.value = gameCases.length - 1;
	}
	blockInteraction();
};

const goToNext = () => {
	if (isAnimating.value) return;

	if (selectedGameCase.value < gameCases.length - 1) {
		selectedGameCase.value++;
	} else {
		selectedGameCase.value = 0;
	}
	blockInteraction();
};
</script>

<style></style>
