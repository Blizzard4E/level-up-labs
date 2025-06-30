<template>
	<primitive :object="model" />
</template>

<script lang="ts" setup>
import { MeshStandardMaterial, Texture } from "three";
const props = defineProps<{
	mouseX: number;
	mouseY: number;
}>();

// Load in arcade machine model
const { scene: model, nodes } = await useGLTF(
	"https://res.cloudinary.com/duzvevuup/image/upload/v1751240734/Game%20Design%20Showcase%20Website/arcade_machine_ao7qmb.glb" // Replace with your actual model path
);

// Load in textures for each node
const [arcadeMachineTexture, bannerTexture, screenTexture, screenCoverTexture] =
	await useTexture([
		"/textures/arcade_machine.png",
		"textures/banner.png",
		"/textures/screen.png",
		"/textures/screen_cover.png",
	]);
const videoTexture = (await useVideoTexture(
	"https://res.cloudinary.com/duzvevuup/video/upload/v1751240856/Game%20Design%20Showcase%20Website/landing-video_uydrbt.mp4"
)) as Texture;
// Create materials for each node
const arcadeMachineMaterial = new MeshStandardMaterial({
	map: arcadeMachineTexture,
});
arcadeMachineTexture.flipY = false;
bannerTexture.flipY = false;
screenTexture.flipY = false;
videoTexture.flipY = false;
const bannerMaterial = new MeshStandardMaterial({
	map: bannerTexture,
});
const screenMaterial = new MeshStandardMaterial({
	map: screenTexture,
});
const screenCoverMaterial = new MeshStandardMaterial({
	map: screenCoverTexture,
	transparent: true,
});

// Apply materials to nodes
nodes.ArcadeMachine.material = arcadeMachineMaterial;
nodes.Banner.material = bannerMaterial;
nodes.Screen.material = screenMaterial;
nodes.ScreenCover.material = screenCoverMaterial;

// Define default/base rotations
const defaultRotationX = Math.PI / 36; // 5 degrees tilt down
const defaultRotationY = -Math.PI / 5.142857; // 35 degrees tilt left

function updateModelRotation() {
	const rotationRangeX = Math.PI / 12; // 15 degrees
	const rotationRangeY = Math.PI / 6; // 30 degrees

	const mouseXRatio = props.mouseX / window.innerWidth - 0.5;
	const mouseYRatio = props.mouseY / window.innerHeight - 0.5;

	const mouseRotationX = -mouseYRatio * rotationRangeX;
	const mouseRotationY = -mouseXRatio * rotationRangeY;

	// Combine default rotation with mouse-influenced rotation
	const finalRotationX = defaultRotationX + mouseRotationX;
	const finalRotationY = defaultRotationY + mouseRotationY;

	model.position.z = -2.5;
	model.position.x = 4;
	model.position.y = -2;

	// model.rotation.x = Math.max(
	// 	defaultRotationX - rotationRangeX,
	// 	Math.min(defaultRotationX + rotationRangeX, finalRotationX)
	// );
	model.rotation.x = defaultRotationX;
	model.rotation.y = Math.max(
		defaultRotationY - rotationRangeY,
		Math.min(defaultRotationY + rotationRangeY, finalRotationY)
	);
}

onMounted(() => {
	// Initial rotation based on current mouse position
	updateModelRotation();
	setTimeout(() => {
		screenMaterial.map = videoTexture;
		const videoElement = videoTexture.image as HTMLVideoElement;
		videoElement.currentTime = 0;
		videoElement.play();
	}, 3000);
});

// Watch for mouse position changes and update rotation
watch(() => [props.mouseX, props.mouseY], updateModelRotation);
</script>
<style></style>
