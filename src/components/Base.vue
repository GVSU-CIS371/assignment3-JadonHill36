<template>
  <div class="baseBeverage" :style="{ height: dynamicHeights.base, backgroundColor: baseColor }"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useBeverageStore, COLORS } from "../stores/beverageStore";

const store = useBeverageStore();

// use the correct reactive values from the store
const currentBase = computed(() => store.currentBase);
const currentCreamer = computed(() => store.currentCreamer);
const currentSyrup = computed(() => store.currentSyrup);

// determine base color reactively
const baseColor = computed(() => COLORS[currentBase.value] || "#6F4E37");

// dynamic height calculation stays the same
const dynamicHeights = computed(() => {
  const CREAMER_HEIGHT = 20;
  const SYRUP_HEIGHT = 10;
  const hasCreamer = currentCreamer.value !== "None";
  const hasSyrup = currentSyrup.value !== "None";

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
</script>

<style scoped>
.baseBeverage {
  position: relative;
  width: 100%;
  bottom: 0;
  transition: all 0.7s ease-in-out;
  z-index: 300;
  border-radius: 0 0 2.2em 2.2em;
}
</style>
