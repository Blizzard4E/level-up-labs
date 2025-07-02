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
			<TresAmbientLight :intensity="0.75" />
			<TresHemisphereLight
				:intensity="0.5"
				:skyColor="'#e0eaff'"
				:groundColor="'#222233'"
			/>
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
			{ id: "Survival Mystery", name: "Survival Mystery" },
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
	{
		id: "Super Priates Adventure",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751436754/Game%20Design%20Showcase%20Website/Super%20Priates%20Adventure/Super_Priates_Adventure_fxtatx.png",
		title: "Super Priates Adventure",
		desc: "A casual 2D platformer inspired by Mario, but with a pirate twist! Jump, run, and collect treasures as you navigate through adventurous islands filled with quirky pirate enemies and hidden secrets.",
		genres: [{ id: "2D Platformer", name: "2D Platformer" }],
		publishers: [{ id: "Suy Heng", name: "Suy Heng" }],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751436438/Game%20Design%20Showcase%20Website/Super%20Priates%20Adventure/Superpiratesadventure-Demo_dmrpfk.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/1Hc-3KR3A7n6p_XrCxg0WOrtSg8nDBRZP/view?usp=sharing",
	},
	{
		id: "Pinkie's Adventure",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751437674/Game%20Design%20Showcase%20Website/Pinkie%27s%20Adventure/Pinkie_s_Adventure_ygy3b8.png",
		title: "Pinkie's Adventure",
		desc: "Pinkie's Adventure is a 2D platformer where you jump, avoid obstacles, collect items, and try to complete all three levels without losing all your health.",
		genres: [{ id: "2D Platformer", name: "2D Platformer" }],
		publishers: [{ id: "Usphea Kim", name: "Usphea Kim" }],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751437408/Game%20Design%20Showcase%20Website/Pinkie%27s%20Adventure/Game-Record-00.00.02.831-00.00.45.291_mw9bwf.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/1KRVuQW79QH76hr3PAQ1P_ztgzjVDroOT/view?usp=sharing",
	},
	{
		id: "Kafish",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751438289/Game%20Design%20Showcase%20Website/Kafish/Kafish_o3m7j5.png",
		title: "Kafish",
		desc: "Kafish is a fast-paced and intense game where you take control of a fierce cat, devouring smaller fish to grow larger and assert your dominance and take over the ocean.",
		genres: [
			{ id: "Action", name: "Action" },
			{ id: "Arcade", name: "Arcade" },
			{ id: "Eat-em-up", name: "Eat-em-up" },
		],
		publishers: [{ id: "Vongsorya Uch", name: "Vongsorya Uch" }],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751438132/Game%20Design%20Showcase%20Website/Kafish/Kafish-Recording_dmm1p7.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/1AF55VhzRP_d6ziDbIiYf9IrU_kvHEJL0/view?usp=sharing",
	},
	{
		id: "Birdy",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751438708/Game%20Design%20Showcase%20Website/Birdy/Birdy_txdujl.png",
		title: "Birdy",
		desc: "Birdy is a simple, addictive game inspired by Flappy Bird. Tap to fly and dodge obstacles to achieve the highest score possible.",
		genres: [
			{ id: "Arcade", name: "Arcade" },
			{ id: "Endless Runner", name: "Endless Runner" },
			{ id: "Casual", name: "Casual" },
		],
		publishers: [{ id: "Sok Eng Hout", name: "Sok Eng Hout" }],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751438535/Game%20Design%20Showcase%20Website/Birdy/Birdy_Demo_ny39wx.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/1AF55VhzRP_d6ziDbIiYf9IrU_kvHEJL0/view?usp=sharing",
	},
	{
		id: "Pigstacle",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751439547/Game%20Design%20Showcase%20Website/Pigstacle/Pigstacle_amvrmj.png",
		title: "Pigstacle",
		desc: "Navigate a chaotic castle filled with obstacles and help the King escape the mischievous pigs. Dodge, jump, and climb to survive!",
		genres: [
			{ id: "Platformer", name: "Platformer" },
			{ id: "Arcade", name: "Arcade" },
			{ id: "Obstacle Course", name: "Obstacle Course" },
		],
		publishers: [{ id: "Headangelly Huy", name: "Headangelly Huy" }],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751439524/Game%20Design%20Showcase%20Website/Pigstacle/Video_Pigstacle_tbvd7k.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/1AF55VhzRP_d6ziDbIiYf9IrU_kvHEJL0/view?usp=sharing",
	},
	{
		id: "Escape From Paragon",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751443238/Game%20Design%20Showcase%20Website/Escape%20From%20Paragon/Escappe_From_Paragon_bgus2k.png",
		title: "Escape From Paragon",
		desc: "Escape from Paragon is a psychological horror game where a normal school day turns eerie. After taking the elevator, you find yourself in a strange, unsettling version of your school. Can you find your way out?",
		genres: [{ id: "Psychological Horror", name: "Psychological Horror" }],
		publishers: [{ id: "Choung Pheng Ear", name: "Choung Pheng Ear" }],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751240856/Game%20Design%20Showcase%20Website/landing-video_uydrbt.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/1o2ymArUSX6rP3jrv_xI9FYjRDBL6Ttgv/view?usp=sharing",
	},
	{
		id: "Walled Room",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751442159/Game%20Design%20Showcase%20Website/Walled%20Room/Walled_Room_hhokvw.png",
		title: "Walled Room",
		desc: "Puzzle like room where player solve puzzle for each room using their environment to continus.",
		genres: [{ id: "Puzzle", name: "Puzzle" }],
		publishers: [{ id: "Chhorng Ky", name: "Chhorng Ky" }],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751442134/Game%20Design%20Showcase%20Website/Walled%20Room/2025-07-01_20-14-44_wlra8p.mp4",
		],
		releasedDate: "7 July 2025",
		downloadUrl:
			"https://drive.google.com/file/d/1xKxSjSr2rt-fwVGle165BrG8GrGb5PC-/view?usp=sharing",
	},
	{
		id: "Unalived Wizard",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751440605/Game%20Design%20Showcase%20Website/Unalived%20Wizard/Unalived_Wizard_vlz88p.png",
		title: "Unalived Wizard",
		desc: "Unalived Wizard is a roguelike survival game inspired by Vampire Survivors. Battle endless waves of enemies, collect powerful upgrades, and see how long you can survive as a wizard in a chaotic arena.",
		genres: [
			{ id: "Roguelike", name: "Roguelike" },
			{ id: "Survival", name: "Survival" },
			{ id: "Action", name: "Action" },
		],
		publishers: [{ id: "Kanold Vy", name: "Kanold Vy" }],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751440755/Game%20Design%20Showcase%20Website/Unalived%20Wizard/Unalive_Wizard-00.01.24.123-00.02.00.527_1_fyypod.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/1LNbg4rZEdFJqXWv0Dn9DgGPJKqVngghJ/view?usp=sharing",
	},
	{
		id: "Thief Platformer",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751441735/Game%20Design%20Showcase%20Website/Thief%20Platformer/Thief_Platformer_o1ufxp.png",
		title: "Thief Platformer",
		desc: "Mario like platformer with quick fast paces level. Using Grappling hook and dash to get around.",
		genres: [{ id: "Platformer", name: "Platformer" }],
		publishers: [{ id: "Chhorng Ky", name: "Chhorng Ky" }],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751441789/Game%20Design%20Showcase%20Website/Thief%20Platformer/2025-07-01_20-20-21_jkxtwo.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/1h_KogvJaOaGa9Ixigcei9KCNNaonFDmv/view?usp=sharing",
	},
	{
		id: "Into The Maze",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751441267/Game%20Design%20Showcase%20Website/Into%20The%20Maze/Into_The_Maze_fio0lj.png",
		title: "Into The Maze",
		desc: "The game is a maze-platformer, where survival depends on your ability to navigate through a labyrinth and find the key to unlock the exit while collecting treasures along the way and avoiding obstacles.",
		genres: [{ id: "Platformer", name: "Platformer" }],
		publishers: [{ id: "Pichey Uong", name: "Pichey Uong" }],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751441245/Game%20Design%20Showcase%20Website/Into%20The%20Maze/Screen-Capture_1_q4d0nv.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/1LNbg4rZEdFJqXWv0Dn9DgGPJKqVngghJ/view?usp=sharing",
	},

	{
		id: "Final Day",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751440050/Game%20Design%20Showcase%20Website/Final%20Day/Final_Day_pxbr65.png",
		title: "Final Day",
		desc: "The game is a survival type of game where players need to try their best to survive and eliminate the enemy.",
		genres: [{ id: "Surival", name: "Surival" }],
		publishers: [{ id: "Long Seng", name: "Long Seng" }],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751439816/Game%20Design%20Showcase%20Website/Final%20Day/Long_Seng_-_Game_Demo_Sem_I-00.00.07.866-00.00.45.771_ng5bpf.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/1AF55VhzRP_d6ziDbIiYf9IrU_kvHEJL0/view?usp=sharing",
	},
	{
		id: "Spawn Niac",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751444235/Game%20Design%20Showcase%20Website/Spawn%20Niac/Spawn_Niac_qfkv6m.png",
		title: "Spawn Niac",
		desc: "Deploy troops, defend your tower, and destroy the enemy in this fast-paced strategy game.",
		genres: [{ id: "Strategy", name: "Strategy" }],
		publishers: [{ id: "Thavorak Suon", name: "Thavorak Suon" }],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751444209/Game%20Design%20Showcase%20Website/Spawn%20Niac/Spawniac_lyeqvd.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/1YhLctLSYkw5KupBD9E-MBM8p8ecCMved/view?usp=sharing",
	},
	{
		id: "Otsutsuki",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751444768/Game%20Design%20Showcase%20Website/Otsutsuki/Otsutsuki_pnllmp.png",
		title: "Otsutsuki",
		desc: "this is Otsutsuki , an action-packed space shooter game where you control a spaceship in an intense battle against two types of enemies.",
		genres: [{ id: "Space Shooter", name: "Space Shooter" }],
		publishers: [{ id: "Bunlong Prak", name: "Bunlong Prak" }],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751444530/Game%20Design%20Showcase%20Website/Otsutsuki/Gamerecord-00.00.47.750-00.01.11.514_nvuq53.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/1HjMUMrr53NHtMbauOGvuiWB_Y6MZk0tG/view?usp=sharing",
	},
	{
		id: "Dunk Frog",
		texture:
			"https://res.cloudinary.com/duzvevuup/image/upload/v1751445483/Game%20Design%20Showcase%20Website/Dunk%20Frog/Dunk_Frog_cs8vph.png",
		title: "Dunk Frog",
		desc: "Leap your way to the top as a determined frog in this challenging vertical platformer inspired by Jump King. Time your jumps, master tricky ledges, and overcome punishing falls as you climb ever higher in search of glory.",
		genres: [
			{ id: "Platformer", name: "Platformer" },
			{ id: "Precision", name: "Precision" },
			{ id: "Challenging", name: "Challenging" },
		],
		publishers: [
			{ id: "Kanold Vy", name: "Kanold Vy" },
			{ id: "Headangelly Huy", name: "Headangelly Huy" },
		],
		gameplays: [
			"https://res.cloudinary.com/duzvevuup/video/upload/v1751445446/Game%20Design%20Showcase%20Website/Dunk%20Frog/2025-07-02_15-05-08-00.00.06.346-00.00.30.221_a1ddyb.mp4",
		],
		releasedDate: "28 February 2025",
		downloadUrl:
			"https://drive.google.com/file/d/1LNbg4rZEdFJqXWv0Dn9DgGPJKqVngghJ/view?usp=sharing",
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
