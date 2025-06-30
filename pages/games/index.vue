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
					<div class="mt-16"><GameDownload /></div>
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
		id: "case1",
		texture: "/textures/game_covers.png",
		title: "Neon Skies",
		desc: "Soar through futuristic cityscapes in this high-speed racing adventure. Master gravity-defying tracks, customize your hovercraft, and compete against rivals in a neon-lit world where every second counts.",
		genres: [
			{ id: "racing", name: "Racing" },
			{ id: "futuristic", name: "Futuristic" },
			{ id: "arcade", name: "Arcade" },
		],
		publishers: [{ id: "pub1", name: "Skyline Studios" }],
		gameplays: [gameplayUrl, gameplayUrl],
	},
	{
		id: "case2",
		texture: "/textures/game_covers.png",
		title: "Dungeon Delver",
		desc: "Explore ancient ruins, solve intricate puzzles, and battle fierce monsters for hidden treasures. Each dungeon is procedurally generated, offering new challenges and secrets with every run.",
		genres: [
			{ id: "adventure", name: "Adventure" },
			{ id: "puzzle", name: "Puzzle" },
			{ id: "roguelike", name: "Roguelike" },
		],
		publishers: [{ id: "pub2", name: "Ancient Games" }],
		gameplays: [gameplayUrl, gameplayUrl],
	},
	{
		id: "case3",
		texture: "/textures/game_covers.png",
		title: "Pixel Pioneers",
		desc: "Build, craft, and survive in a charming pixelated world full of surprises. Gather resources, befriend quirky villagers, and defend your settlement from mysterious threats.",
		genres: [
			{ id: "sandbox", name: "Sandbox" },
			{ id: "survival", name: "Survival" },
			{ id: "simulation", name: "Simulation" },
		],
		publishers: [{ id: "pub3", name: "Pixel Forge" }],
		gameplays: [gameplayUrl, gameplayUrl],
	},
	{
		id: "case4",
		texture: "/textures/game_covers.png",
		title: "Galactic Outlaws",
		desc: "Lead your crew across the stars in this tactical space combat RPG. Upgrade your ship, make tough moral choices, and outwit rival factions in a galaxy teeming with danger.",
		genres: [
			{ id: "rpg", name: "RPG" },
			{ id: "strategy", name: "Strategy" },
			{ id: "sci-fi", name: "Sci-Fi" },
		],
		publishers: [{ id: "pub4", name: "Stellar Interactive" }],
		gameplays: [gameplayUrl, gameplayUrl],
	},
	{
		id: "case5",
		texture: "/textures/game_covers.png",
		title: "Mystic Grove",
		desc: "Unravel magical mysteries and restore balance to an enchanted forest. Harness elemental powers, befriend mystical creatures, and uncover the secrets of the ancient grove.",
		genres: [
			{ id: "adventure", name: "Adventure" },
			{ id: "fantasy", name: "Fantasy" },
			{ id: "puzzle", name: "Puzzle" },
		],
		publishers: [{ id: "pub5", name: "Enchanted Games" }],
		gameplays: [gameplayUrl, gameplayUrl],
	},
	{
		id: "case6",
		texture: "/textures/game_covers.png",
		title: "Cyber Siege",
		desc: "Defend your city from rogue AIs in this fast-paced tower defense game. Deploy advanced turrets, upgrade your defenses, and adapt to ever-evolving enemy tactics.",
		genres: [
			{ id: "tower-defense", name: "Tower Defense" },
			{ id: "action", name: "Action" },
			{ id: "sci-fi", name: "Sci-Fi" },
		],
		publishers: [{ id: "pub6", name: "Neon Defense" }],
		gameplays: [gameplayUrl, gameplayUrl],
	},
	{
		id: "case7",
		texture: "/textures/game_covers.png",
		title: "Shadow Runner",
		desc: "Dash, jump, and sneak past enemies in a neon-lit stealth platformer. Use gadgets, master parkour, and uncover a conspiracy lurking in the city’s shadows.",
		genres: [
			{ id: "platformer", name: "Platformer" },
			{ id: "stealth", name: "Stealth" },
			{ id: "action", name: "Action" },
		],
		publishers: [{ id: "pub7", name: "Shadow Games" }],
		gameplays: [gameplayUrl, gameplayUrl],
	},
	{
		id: "case8",
		texture: "/textures/game_covers.png",
		title: "Skybound Armada",
		desc: "Command airships and conquer the skies in epic real-time battles. Build your fleet, forge alliances, and outmaneuver foes in a world where the sky is the only limit.",
		genres: [
			{ id: "strategy", name: "Strategy" },
			{ id: "real-time", name: "Real-Time" },
			{ id: "steampunk", name: "Steampunk" },
		],
		publishers: [{ id: "pub8", name: "Cloudworks Studios" }],
		gameplays: [gameplayUrl, gameplayUrl],
	},
	{
		id: "case9",
		texture: "/textures/game_covers.png",
		title: "Echoes of Time",
		desc: "Manipulate time to solve puzzles and uncover a forgotten civilization. Experience a narrative-driven journey where your choices ripple through past, present, and future.",
		genres: [
			{ id: "puzzle", name: "Puzzle" },
			{ id: "narrative", name: "Narrative" },
			{ id: "adventure", name: "Adventure" },
		],
		publishers: [{ id: "pub9", name: "Temporal Studios" }],
		gameplays: [gameplayUrl, gameplayUrl],
	},
	{
		id: "case10",
		texture: "/textures/game_covers.png",
		title: "Frostbite Frontier",
		desc: "Survive the frozen wilderness and build your outpost against all odds. Manage resources, face blizzards, and lead your team through harsh, ever-changing conditions.",
		genres: [
			{ id: "survival", name: "Survival" },
			{ id: "simulation", name: "Simulation" },
			{ id: "strategy", name: "Strategy" },
		],
		publishers: [{ id: "pub10", name: "Icebound Games" }],
		gameplays: [gameplayUrl, gameplayUrl],
	},
	{
		id: "case11",
		texture: "/textures/game_covers.png",
		title: "Quantum Quest",
		desc: "Journey through parallel universes in this mind-bending puzzle adventure. Solve quantum conundrums, alter reality, and piece together the fate of a fractured cosmos.",
		genres: [
			{ id: "puzzle", name: "Puzzle" },
			{ id: "sci-fi", name: "Sci-Fi" },
			{ id: "adventure", name: "Adventure" },
		],
		publishers: [{ id: "pub11", name: "Quantum Leap Studios" }],
		gameplays: [gameplayUrl, gameplayUrl],
	},
	{
		id: "case12",
		texture: "/textures/game_covers.png",
		title: "Rogue Circuit",
		desc: "Hack, fight, and outsmart your way through a cybernetic underworld. Upgrade your abilities, evade security systems, and expose the secrets of a digital dystopia.",
		genres: [
			{ id: "action", name: "Action" },
			{ id: "cyberpunk", name: "Cyberpunk" },
			{ id: "roguelike", name: "Roguelike" },
		],
		publishers: [{ id: "pub12", name: "Circuit Games" }],
		gameplays: [gameplayUrl, gameplayUrl],
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
