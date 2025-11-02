<template>
  <div class="syrup" :style="{ height: dynamicHeights.syrup, backgroundColor: syrupColor }"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useBeverageStore, COLORS } from "../stores/beverageStore";

const store = useBeverageStore();

const currentSyrup = computed(() => store.currentSyrup);
const currentCreamer = computed(() => store.currentCreamer);

// Dynamic heights for animation
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

// Syrup color from global COLORS map
const syrupColor = computed(() => COLORS[currentSyrup.value] || "transparent");
</script>

<style lang="scss" scoped>
.syrup {
  transform: none;
  position: relative;
  width: 100%;
  transition: all 0.7s ease-in-out;
  z-index: 200;
}
</style>
