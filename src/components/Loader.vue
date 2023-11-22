<template>
    <div :class="`overlay position-${position}`">
        <div class="loader">
            <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg>
        </div>
    </div>
</template>
<script setup>
defineProps(['position'])
</script>
<style lang="scss" scoped>
.overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.575);
    left: 0;
    top: 0;
    display: grid;
    place-items: center;

    .loader {
        svg {
            width: 3.25em;
            transform-origin: center;
            animation: rotate4 2s linear infinite;
        }

        circle {
            fill: none;
            stroke: var(--white-color);
            stroke-width: 5;
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
            stroke-linecap: round;
            animation: dash4 1.5s ease-in-out infinite;
        }
    }
}

@keyframes rotate4 {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash4 {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
    }

    100% {
        stroke-dashoffset: -125px;
    }
}
</style>