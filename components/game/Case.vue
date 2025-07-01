<template>
	<TresGroup ref="collectionGroup">
		<primitive
			v-for="gameCase in loadedGameCases"
			:key="gameCase.id"
			:object="gameCase.model"
		/>
	</TresGroup>
</template>

<script lang="ts" setup>
import { ref, onMounted, markRaw, shallowRef, watch, nextTick } from "vue";
import { MeshStandardMaterial, Scene, Group } from "three";

interface GameCase {
	id: string;
	texture: string;
	model?: Scene;
	originalPosition?: { x: number; y: number; z: number };
	originalRotation?: { x: number; y: number; z: number };
}

const props = defineProps<{
	mouseX: number;
	mouseY: number;
	selectedGameCase: number;
	gameCases: GameCase[];
}>();

const collectionGroup = ref<Group>();

const loadedGameCases = shallowRef<GameCase[]>([]);
const dvdModel = "/models/game_case.glb";
const dvdDistance = 0.08;
const currentSelectedIndex = ref<number>(
	Math.floor(props.gameCases.length / 2)
);

// Cursor following variables
const isFollowingCursor = ref<boolean>(false);
const selectedGameCaseModel = ref<Scene | null>(null);

// Smooth transition variables
const isTransitioningToMouse = ref<boolean>(false);
const transitionStartTime = ref<number>(0);
const transitionDuration = 800; // Duration for smooth transition to mouse following
const transitionStartRotation = ref<{ x: number; y: number }>({ x: 0, y: 0 });

// Define default/base rotations for cursor following
const defaultRotationX = 0; // 0 degrees in radians
const defaultRotationY = 0; // 0 degrees in radians

// Calculate offset to center the collection initially
const totalWidth = (props.gameCases.length - 1) * dvdDistance;
const centerOffset = -totalWidth / 2;

async function loadGameCases() {
	const loaded: GameCase[] = [];

	for (const [i, gameCase] of props.gameCases.entries()) {
		try {
			const { scene, nodes } = await useGLTF(dvdModel);
			const texture = await useTexture([gameCase.texture]);
			const material = new MeshStandardMaterial({
				map: texture,
			});

			texture.flipY = false;

			if (nodes.Cube) {
				nodes.Cube.material = material;
			}

			// Set initial position and rotation with center offset
			const initialX = i * dvdDistance + centerOffset;
			const initialY = 0.2;
			const initialZ = 2.6;
			const initialRotationY = Math.PI / 2;

			scene.position.set(initialX, initialY, initialZ);
			scene.rotation.set(0, initialRotationY, 0);

			loaded.push({
				id: gameCase.id,
				texture: gameCase.texture,
				model: markRaw(scene),
				originalPosition: { x: initialX, y: initialY, z: initialZ },
				originalRotation: { x: 0, y: initialRotationY, z: 0 },
			});

			console.log(`Game case ${gameCase.id} loaded`);
		} catch (error) {
			console.error(`Error loading game case ${gameCase.id}:`, error);
		}
	}

	loadedGameCases.value = loaded;
	console.log("All game cases loaded successfully");
}

function animateObjectTo(
	object: Scene | Group,
	target: { position: any; rotation: any },
	duration = 500,
	allowFullRotation = false,
	onComplete?: () => void
) {
	const startPosition = {
		x: object.position.x,
		y: object.position.y,
		z: object.position.z,
	};
	const startRotation = {
		x: object.rotation.x,
		y: object.rotation.y,
		z: object.rotation.z,
	};
	const startTime = Date.now();

	// Handle rotation wrapping to avoid the long way around (unless we want full rotation)
	let targetRotationY = target.rotation.y;
	if (
		!allowFullRotation &&
		Math.abs(startRotation.y - targetRotationY) > Math.PI
	) {
		if (startRotation.y > targetRotationY) {
			targetRotationY += Math.PI * 2;
		} else {
			targetRotationY -= Math.PI * 2;
		}
	}

	function animate() {
		const elapsed = Date.now() - startTime;
		const progress = Math.min(elapsed / duration, 1);

		// Easing function (ease-in-out cubic)
		const easedProgress =
			progress < 0.5
				? 4 * progress * progress * progress
				: 1 - Math.pow(-2 * progress + 2, 3) / 2;

		// Interpolate position
		object.position.x =
			startPosition.x +
			(target.position.x - startPosition.x) * easedProgress;
		object.position.y =
			startPosition.y +
			(target.position.y - startPosition.y) * easedProgress;
		object.position.z =
			startPosition.z +
			(target.position.z - startPosition.z) * easedProgress;

		// Interpolate rotation
		object.rotation.x =
			startRotation.x +
			(target.rotation.x - startRotation.x) * easedProgress;
		object.rotation.y =
			startRotation.y +
			(targetRotationY - startRotation.y) * easedProgress;
		object.rotation.z =
			startRotation.z +
			(target.rotation.z - startRotation.z) * easedProgress;

		if (progress < 1) {
			requestAnimationFrame(animate);
		} else if (onComplete) {
			onComplete();
		}
	}

	animate();
}

function calculateMouseRotation() {
	const rotationRangeX = (60 * Math.PI) / 180;
	const rotationRangeY = (100 * Math.PI) / 180;
	const mouseXRatio = props.mouseX / window.innerWidth - 0.5;
	const mouseYRatio = props.mouseY / window.innerHeight - 0.5;
	const mouseRotationX = mouseYRatio * rotationRangeX;
	const mouseRotationY = mouseXRatio * rotationRangeY;

	// Combine default rotation with mouse-influenced rotation
	const finalRotationX = defaultRotationX + mouseRotationX;
	const finalRotationY = defaultRotationY + mouseRotationY;

	// Apply constraints
	const constrainedRotationX = Math.max(
		defaultRotationX - rotationRangeX,
		Math.min(defaultRotationX + rotationRangeX, finalRotationX)
	);
	const constrainedRotationY = Math.max(
		defaultRotationY - rotationRangeY,
		Math.min(defaultRotationY + rotationRangeY, finalRotationY)
	);

	return {
		x: constrainedRotationX,
		y: constrainedRotationY,
	};
}

function updateSelectedGameCaseRotation() {
	if (!selectedGameCaseModel.value) return;

	const targetRotation = calculateMouseRotation();

	if (isTransitioningToMouse.value) {
		// During transition phase - interpolate from start rotation to mouse rotation
		const elapsed = Date.now() - transitionStartTime.value;
		const progress = Math.min(elapsed / transitionDuration, 1);

		// Easing function (ease-out cubic for smooth deceleration)
		const easedProgress = 1 - Math.pow(1 - progress, 3);

		selectedGameCaseModel.value.rotation.x =
			transitionStartRotation.value.x +
			(targetRotation.x - transitionStartRotation.value.x) *
				easedProgress;
		selectedGameCaseModel.value.rotation.y =
			transitionStartRotation.value.y +
			(targetRotation.y - transitionStartRotation.value.y) *
				easedProgress;

		// Check if transition is complete
		if (progress >= 1) {
			isTransitioningToMouse.value = false;
		}
	} else if (isFollowingCursor.value) {
		// Normal cursor following - direct update
		selectedGameCaseModel.value.rotation.x = targetRotation.x;
		selectedGameCaseModel.value.rotation.y = targetRotation.y;
	}
}

function startMouseFollowing() {
	if (!selectedGameCaseModel.value) return;

	// Store the current rotation as the starting point for transition
	transitionStartRotation.value = {
		x: selectedGameCaseModel.value.rotation.x,
		y: selectedGameCaseModel.value.rotation.y,
	};

	// Start the transition
	isTransitioningToMouse.value = true;
	transitionStartTime.value = Date.now();
	isFollowingCursor.value = true;

	// Start the animation loop for smooth transition
	function animateTransition() {
		updateSelectedGameCaseRotation();

		if (isTransitioningToMouse.value) {
			requestAnimationFrame(animateTransition);
		}
	}

	animateTransition();
}

function selectGameCase(gameCaseIndex: number) {
	// Stop cursor following for the previous selection
	isFollowingCursor.value = false;
	isTransitioningToMouse.value = false;
	selectedGameCaseModel.value = null;

	// Reset previously selected case to original position/rotation
	if (
		currentSelectedIndex.value >= 0 &&
		currentSelectedIndex.value < loadedGameCases.value.length
	) {
		const prevSelected = loadedGameCases.value[currentSelectedIndex.value];
		if (
			prevSelected.model &&
			prevSelected.originalPosition &&
			prevSelected.originalRotation
		) {
			animateObjectTo(
				prevSelected.model,
				{
					position: prevSelected.originalPosition,
					rotation: prevSelected.originalRotation,
				},
				400
			);
		}
	}

	// Calculate how much to move the entire collection to center the selected case
	if (
		gameCaseIndex >= 0 &&
		gameCaseIndex < loadedGameCases.value.length &&
		collectionGroup.value
	) {
		const selectedGameCase = loadedGameCases.value[gameCaseIndex];

		// Calculate the offset needed to center the selected case at x=0
		const selectedCaseOriginalX =
			gameCaseIndex * dvdDistance + centerOffset;
		const collectionOffset = -selectedCaseOriginalX;

		// Animate the entire collection to center the selected case
		animateObjectTo(
			collectionGroup.value,
			{
				position: {
					x: collectionOffset,
					y: 0,
					z: 0,
				},
				rotation: {
					x: 0,
					y: 0,
					z: 0,
				},
			},
			600
		);

		if (selectedGameCase.model) {
			// Step 1: Move forward to avoid collision with other cases
			animateObjectTo(
				selectedGameCase.model,
				{
					position: {
						x: selectedGameCase.model.position.x,
						y: selectedGameCase.model.position.y,
						z: 2.9, // Move forward first
					},
					rotation: {
						x: selectedGameCase.model.rotation.x,
						y: selectedGameCase.model.rotation.y,
						z: selectedGameCase.model.rotation.z,
					},
				},
				300 // Quick move forward
			);

			// Step 2: After moving forward, do a 360-degree spin and end up at the final position
			setTimeout(() => {
				const currentRotationY = selectedGameCase.model!.rotation.y;
				animateObjectTo(
					selectedGameCase.model!,
					{
						position: {
							x: selectedCaseOriginalX, // Move to final position during spin
							y: 0.2,
							z: 2.9,
						},
						rotation: {
							x: defaultRotationX, // End at default rotation for mouse following
							y: defaultRotationY + Math.PI * 2, // 360-degree spin ending at default
							z: 0,
						},
					},
					800, // Spin duration
					true // Allow full rotation
				);
			}, 300); // Wait for forward movement to complete

			// Step 3: After the spin, start cursor following immediately
			setTimeout(() => {
				// Set the model reference and start smooth cursor following
				selectedGameCaseModel.value = selectedGameCase.model!;

				// Normalize the Y rotation to defaultRotationY to avoid extra spinning
				selectedGameCase.model!.rotation.y = defaultRotationY;

				startMouseFollowing();
			}, 1100); // Wait for forward movement + spin to complete (300 + 800)
		}
	}

	currentSelectedIndex.value = gameCaseIndex;
}

onMounted(async () => {
	await loadGameCases();

	// Auto-animate the pre-selected game case after loading
	await nextTick(); // Ensure DOM is updated
	selectGameCase(currentSelectedIndex.value);
});

watch(
	() => props.selectedGameCase,
	(newIndex) => {
		if (newIndex >= 0 && newIndex < loadedGameCases.value.length) {
			selectGameCase(newIndex);
		}
	}
);

// Watch for mouse position changes and update rotation of selected game case
watch(() => [props.mouseX, props.mouseY], updateSelectedGameCaseRotation);
</script>

<style></style>
