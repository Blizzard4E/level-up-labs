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
			<div class="text-white text-2xl mt-[200px] w-full px-32 grid gap-8">
				<div class="grid gap-4">
					<h1 class="uppercase font-bold text-4xl">VISION</h1>
					<p>
						Our vision is to become a globally recognized studio
						that bridges cultures through interactive storytelling,
						showcasing Cambodia's rich heritage while pioneering
						gameplay experiences that resonate across all borders.
						We envision celebrating Khmer creativity on the world
						stage and inspiring a new generation of Southeast Asian
						developers.
					</p>
				</div>

				<div class="grid gap-4">
					<h1 class="uppercase font-bold text-4xl">MISSION</h1>
					<p>
						Our mission centers on blending traditional Khmer
						culture with cutting-edge technology, delivering unique
						interactive experiences that entertain global audiences
						while preserving Cambodia's storytelling traditions.
						We're committed to fostering local talent and building
						sustainable gaming ecosystems in Southeast Asia.
					</p>
				</div>
				<div class="grid gap-4">
					<h1 class="uppercase font-bold text-4xl">CORE VALUES</h1>
					<p>
						Our core values include cultural pride in honoring Khmer
						heritage, innovation through diversity by combining
						traditional wisdom with modern technology, excellence in
						craft through meticulous attention to detail,
						maintaining a global mindset with a local heart,
						fostering collaborative spirit within our community, and
						pursuing sustainable growth that uplifts Cambodia's
						creative industries.
					</p>
				</div>
				<div class="grid gap-4">
					<h1 class="uppercase font-bold text-4xl">
						WHY WE ARE UNIQUE
					</h1>
					<p>
						What makes us unique is our authentic representation of
						Khmer culture in gaming, our Southeast Asian
						storytelling perspective, our hybrid development
						approach combining traditional artistic techniques with
						modern tools, our community-centric development process
						involving local cultural experts, our bilingual
						expertise serving both diaspora and international
						audiences, our commitment to mentoring emerging regional
						developers, and our model of sustainable cultural gaming
						that proves authenticity and commercial success can
						coexist.
					</p>
				</div>
				<div class="grid gap-4">
					<h1 class="uppercase font-bold text-4xl">
						International Linkages
					</h1>
					<ul class="list-disc pl-6 mt-2">
						<li>
							Global Gaming Networks - Partnerships with
							international indie game publishers, distributors,
							and platforms to bring Khmer-developed games to
							worldwide markets through Steam, mobile app stores,
							and console networks.
						</li>
						<li>
							Cultural Exchange Programs - Collaborations with
							international museums, cultural institutions, and
							educational organizations to develop games that
							serve as cultural learning tools and promote
							cross-cultural understanding.
						</li>
					</ul>
				</div>
				<div class="grid gap-4">
					<h1 class="uppercase font-bold text-4xl">
						Community Services
					</h1>
					<ul class="list-disc pl-6 mt-2">
						<li>
							Local Talent Development - Free game development
							workshops and coding bootcamps for Cambodian youth,
							providing pathways into the digital creative economy
							and building the next generation of local
							developers.
						</li>
						<li>
							Cultural Preservation Initiative - Collaborative
							projects with elderly community members, traditional
							artists, and cultural historians to digitally
							preserve Khmer stories, legends, and artistic
							techniques through interactive media.
						</li>
					</ul>
				</div>
			</div>
			<div class="w-full pb-4 px-32">
				<div class="flex w-full mt-16">
					<h1 class="uppercase font-bold text-6xl text-white">
						Partners
					</h1>
				</div>
				<div class="grid grid-cols-4 gap-8 items-center mt-8">
					<div class="flex flex-col items-center">
						<img
							src="https://res.cloudinary.com/duzvevuup/image/upload/v1751449117/Game%20Design%20Showcase%20Website/animed_qsqnbb.png"
							class="w-[240px] aspect-square object-cover"
							alt=""
						/>
						<h2 class="text-white font-bold text-4xl text-center">
							Anime D. Cambodia
						</h2>
					</div>
					<div class="flex flex-col items-center">
						<img
							src="https://res.cloudinary.com/duzvevuup/image/upload/v1751449118/Game%20Design%20Showcase%20Website/steam_wzjryq.png"
							class="w-[240px] aspect-square object-cover"
							alt=""
						/>
						<h2 class="text-white font-bold text-4xl text-center">
							Steam
						</h2>
					</div>
					<div class="flex flex-col items-center">
						<img
							src="https://res.cloudinary.com/duzvevuup/image/upload/v1751449117/Game%20Design%20Showcase%20Website/xbox_kgnfki.jpg"
							class="w-[240px] aspect-square object-cover"
							alt=""
						/>
						<h2 class="text-white font-bold text-4xl text-center">
							XBox
						</h2>
					</div>
					<div class="flex flex-col items-center">
						<img
							src="https://res.cloudinary.com/duzvevuup/image/upload/v1751449117/Game%20Design%20Showcase%20Website/monster_sbw6vv.png"
							class="w-[240px] aspect-square object-cover"
							alt=""
						/>
						<h2 class="text-white font-bold text-4xl text-center">
							Monster
						</h2>
					</div>
				</div>
			</div>
			<div class="w-full pb-8 px-32">
				<div class="flex w-full mt-16 mb-4">
					<h1 class="uppercase font-bold text-6xl text-white">
						CONTACT US
					</h1>
				</div>
				<p class="text-2xl">Email: konkhmergames@gmail.com</p>
				<p class="text-2xl">
					Address: #32, Street 240, Preah Ang Phanavong, Phnom Penh,
					Cambodia
				</p>
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
