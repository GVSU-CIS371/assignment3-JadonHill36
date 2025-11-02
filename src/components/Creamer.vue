<template>
  <div class="froth" :style="{ height: dynamicHeights.creamer }">
    <template v-if="currentCreamer !== 'No Cream'">
      <div
        v-for="i in 5"
        :key="i"
        class="foam"
        :style="{ backgroundColor: foamColor }"
      ></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useBeverageStore, COLORS } from "../stores/beverageStore";

const store = useBeverageStore();

// Reactive selection
const currentCreamer = computed(() => store.currentCreamer);
const currentSyrup = computed(() => store.currentSyrup);

// Smooth height animation
const dynamicHeights = computed(() => {
  const CREAMER_HEIGHT = 20;
  const SYRUP_HEIGHT = 10;
  const hasCreamer = currentCreamer.value !== "No Cream";
  const hasSyrup = currentSyrup.value !== "No Syrup";

  const visibleCreamer = hasCreamer ? CREAMER_HEIGHT : 0;
  const visibleSyrup = hasSyrup ? SYRUP_HEIGHT : 0;
  const baseHeight = 100 - visibleCreamer - visibleSyrup;

  return {
    creamer: `${visibleCreamer}%`,
    syrup: `${visibleSyrup}%`,
    base: `${baseHeight}%`,
    isCreamerVisible: hasCreamer,
    isSyrupVisible: hasSyrup,
  };
});

// Foam color from store COLORS
const foamColor = computed(() => COLORS[currentCreamer.value] || "#FFFACD");
</script>

<style lang="scss" scoped>
.froth {
  background-color: var(--mug-color);
  overflow: visible;
  transform: none;
  position: relative;
  width: 100%;
  transition: all 0.7s ease-in-out;
  z-index: 100;
}

.foam {
  display: block;
  border-radius: 30px;
  height: 40px;
  width: 40px;
  position: absolute;
  z-index: 110;
}

.foam:nth-child(1) { top: 0px; left: -3px; }
.foam:nth-child(2) { top: 0px; left: 55px; }
.foam:nth-child(3) { width: 30px; height: 30px; border-radius: 40px; top: 3px; left: 30px; }
.foam:nth-child(4) { width: 30px; height: 30px; border-radius: 45px; top: 5px; right: -2px; }
.foam:nth-child(5) { top: 2px; right: 10px; }
</style>
