<template>
	<nav class="fixed z-40 px-16 py-4 flex justify-between items-center w-full">
		<NuxtLink href="/" class="flex gap-4 items-center cursor-pointer">
			<img src="/images/logo_icon.svg" class="w-[60px]" />
			<h1 class="text-2xl font-bold text-white">KON KHMER GAMES</h1>
		</NuxtLink>
		<div class="text-white flex gap-8 text-xl">
			<NuxtLink
				v-for="item in navItems"
				:key="item.to"
				:to="item.to"
				:class="[
					(route.path.startsWith(item.to) && item.to !== '/') ||
					(route.path === '/' && item.to === '/')
						? 'text-pink'
						: '',
					'hover:text-pink duration-300 ease-in-out shadow',
				]"
			>
				{{ item.label }}
			</NuxtLink>
		</div>
	</nav>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();

const navItems = [
	{ to: "/", label: "Home" },
	{ to: "/games", label: "Games" },
	{ to: "/about", label: "About Us" },
	{ to: "/side-quests", label: "Side Quests" },
];
</script>
