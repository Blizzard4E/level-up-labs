<template>
	<div>
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
		<div
			class="absolute min-w-screen min-h-screen w-screen h-screen top-0 left-0 z-30 text-white"
		>
			<div class="flex items-center w-full mt-24 flex-col gap-8">
				<h1 class="uppercase text-4xl font-bold shadow-2xl">
					The Team
				</h1>
				<div
					class="flex gap-x-[150px] gap-y-8 place-items-center justify-center w-[1400px] flex-wrap pb-8"
				>
					<div
						class="relative group"
						v-for="(member, idx) in members"
						:key="member.name"
					>
						<div
							:class="[
								'absolute top-[0.5rem] left-[0.5rem] z-0 w-[246px] h-[367px]',
								idx === 1 || idx === 3 || idx === 4
									? 'bg-pink'
									: 'bg-blue',
							]"
						></div>
						<div class="w-[246px] h-[367px] overflow-hidden">
							<img
								:src="member.image"
								class="w-[246px] h-[367px] relative z-10 object-cover hover:scale-110 duration-300 ease-in-out"
								alt=""
							/>
						</div>
						<div class="flex flex-col items-center uppercase mt-4">
							<h2 class="text-xl font-bold shadow">
								{{ member.name }}
							</h2>
							<p
								:class="[
									'text-md shadow',
									idx === 1 || idx === 3 || idx === 4
										? 'text-pink'
										: 'text-blue',
								]"
							>
								{{ member.role }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const members = [
	{
		id: 0,
		name: "Putmonyrath Vann",
		role: "IT Manager",
		image: "/images/team/monyrath.png",
	},
	{
		id: 1,
		name: "Choung Pheng Ear",
		role: "Founder",
		image: "/images/team/pheng.jpg",
	},
	{
		id: 2,
		name: "Bunlong Prak",
		role: "Co-founder",
		image: "/images/team/bunlong.png",
	},
	{
		id: 3,
		name: "Thavorak Suon",
		role: "Product Manager",
		image: "/images/team/vorak.jpg",
	},
	{
		id: 4,
		name: "Pichey Uong",
		role: "Software Analyst",
		image: "/images/team/pichey.png",
	},
];
</script>

<style></style>
