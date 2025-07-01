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
            <div class="w-full mt-24 grid grid-cols-5 px-16 gap-8">
                <div class="relative">
                    <div class="absolute">
                        <div class="flex flex-col gap-8 fixed">
                            <div v-for="trip in trips" :key="trip.name">
                                <button
                                    @click="selectedTripIndex = trip.id"
                                    :class="[
                                        'uppercase text-3xl 2xl:text-4xl font-bold duration-300 ease-in-out',
                                        selectedTripIndex === trip.id
                                            ? 'text-pink'
                                            : 'text-white/50 hover:text-pink cursor-pointer',
                                    ]"
                                >
                                    {{ trip.name }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-3 pb-8 relative">
                    <Transition
                        name="slide-up"
                        mode="out-in"
                        appear
                    >
                        <div :key="selectedTripIndex">
                            <TripSihanoukville v-if="selectedTripIndex == 0" />
                            <TripSiemReap v-else-if="selectedTripIndex == 1" />
                            <TripMondulkiri v-else-if="selectedTripIndex == 2" />
                            <TripThailand v-else-if="selectedTripIndex == 3" />
                            <TripSingapore v-else-if="selectedTripIndex == 4" />
                        </div>
                    </Transition>
                </div>
                <div>
                    <h2 class="text-xl font-bold uppercase mb-4">Photos</h2>
                    <Transition
                        name="slide-from-right"
                        mode="out-in"
                        appear
                    >
                        <div 
                            :key="selectedTripIndex"
                            class="relative flex flex-col gap-8"
                        >
                            <div
                                v-for="(image, i) in trips[selectedTripIndex]
                                    .images"
                                :key="
                                    'trip-' +
                                    trips[selectedTripIndex].id +
                                    '-image-' +
                                    i
                                "
                                class="relative"
                            >
                                <div
                                    :class="[
                                        'absolute top-[0.6rem] left-[0.6rem] w-full aspect-video z-0 ',
                                        i % 2 === 0 ? 'bg-pink' : 'bg-blue',
                                    ]"
                                ></div>
                                <img
                                    :src="image"
                                    class="w-full aspect-video object-cover relative z-10"
                                ></img>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { TripSihanoukville } from "#components";

const trips = [
    {
        id: 0,
        name: "Sihanoukville",
        images: ["https://res.cloudinary.com/duzvevuup/image/upload/v1751391211/Game%20Design%20Showcase%20Website/Trips/89de6f10-64e8-4c8b-bcf1-d4310077a7cf.png", 
        "https://res.cloudinary.com/duzvevuup/image/upload/v1751391223/Game%20Design%20Showcase%20Website/Trips/bb576da8-eb30-4310-8c49-0432f9c1daa0.png", 
        "https://res.cloudinary.com/duzvevuup/image/upload/v1751391229/Game%20Design%20Showcase%20Website/Trips/b32c1861-c7c1-47bc-8f8b-38f06162625c.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391241/Game%20Design%20Showcase%20Website/Trips/b9bc3a52-cd95-41ed-aae7-1385b48fd846.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391248/Game%20Design%20Showcase%20Website/Trips/c11dcc38-109b-45e8-9ecf-b5c6e82a0b35.png"],
    },
    {
        id: 1,
        name: "Siem Reap",
        images: ["https://res.cloudinary.com/duzvevuup/image/upload/v1751391498/Game%20Design%20Showcase%20Website/Trips/cbd765f6-6db7-4b92-8bb7-c826d25d3d2f.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391504/Game%20Design%20Showcase%20Website/Trips/d60a0d7d-b894-4ab9-ac5d-b24d701abc98.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391509/Game%20Design%20Showcase%20Website/Trips/68b509f6-10dd-4749-9f59-fe1cbe8bfc08.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391509/Game%20Design%20Showcase%20Website/Trips/68b509f6-10dd-4749-9f59-fe1cbe8bfc08.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391534/Game%20Design%20Showcase%20Website/Trips/153ef353-852a-4cde-afe7-518d11312616.png"],
    },
    {
        id: 2,
        name: "Mondulkiri",
        images: ["https://res.cloudinary.com/duzvevuup/image/upload/v1751391632/Game%20Design%20Showcase%20Website/Trips/7fbb2f7a-b60c-4cab-8fa8-e3c3fad3d39a.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391637/Game%20Design%20Showcase%20Website/Trips/8c70cbe1-cdf4-4f6a-b53d-4c89bf74df41.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391646/Game%20Design%20Showcase%20Website/Trips/4582a7ff-58cb-4715-bc13-6e760f64766d.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391650/Game%20Design%20Showcase%20Website/Trips/76f0bd67-88db-4961-b41f-499149ef0c4a.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391709/Game%20Design%20Showcase%20Website/Trips/ee261e69-66dc-4491-8a68-bffef29ed624.png"],
    },
    {
        id: 3,
        name: "Thailand",
        images: ["https://res.cloudinary.com/duzvevuup/image/upload/v1751391757/Game%20Design%20Showcase%20Website/Trips/e0b62eb6-1b11-45f4-8902-2129724d95fe.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391766/Game%20Design%20Showcase%20Website/Trips/981e79da-728d-4085-93b9-0b09e667eb97.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391773/Game%20Design%20Showcase%20Website/Trips/bf1b21e0-67fc-44a7-9339-fd16a3904b08.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391781/Game%20Design%20Showcase%20Website/Trips/4d669261-4b82-4ff3-adf1-c0d23b698c32.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391792/Game%20Design%20Showcase%20Website/Trips/3ca8e209-4ee6-4654-8835-0c1de4639f3e.png"],
    },
    {
        id: 4,
        name: "Singapore",
        images: ["https://res.cloudinary.com/duzvevuup/image/upload/v1751391863/Game%20Design%20Showcase%20Website/Trips/878e896a-fee0-4cdb-91d6-a9bb2bb31483.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391885/Game%20Design%20Showcase%20Website/Trips/a8024169-05a1-4114-ae2c-26b4ff39d7f3.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391878/Game%20Design%20Showcase%20Website/Trips/3bff2d64-3bda-498e-8893-4f6c7239505f.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391893/Game%20Design%20Showcase%20Website/Trips/87542b6d-7c0d-4a39-8bbb-df4d26e80ef7.png", "https://res.cloudinary.com/duzvevuup/image/upload/v1751391899/Game%20Design%20Showcase%20Website/Trips/f1f1731a-ccc6-45de-9c43-d22badcc10bb.png"],
    },
];

const selectedTripIndex = ref(0);
</script>

<style scoped>
.slide-up-enter-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-up-leave-active {
    transition: all 0.2s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-15px);
}

.slide-up-enter-to,
.slide-up-leave-from {
    opacity: 1;
    transform: translateY(0);
}

/* Image section slide from right animations */
.slide-from-right-enter-active {
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-from-right-leave-active {
    transition: all 0.3s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.slide-from-right-enter-from {
    opacity: 0;
    transform: translateX(40px);
}

.slide-from-right-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}

.slide-from-right-enter-to,
.slide-from-right-leave-from {
    opacity: 1;
    transform: translateX(0);
}
</style>