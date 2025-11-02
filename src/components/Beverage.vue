<template>
  <Mug>
    <Cold v-if="isIced" />
    <Hot v-else />
    <Contents>
      <!-- Layers are rendered top → mid → bottom -->
      <template v-slot:top>
        <Creamer v-if="dynamicHeights.isCreamerVisible" />
      </template>

      <template v-slot:mid>
        <Syrup v-if="dynamicHeights.isSyrupVisible" />
      </template>

      <template v-slot:bottom>
        <Base />
      </template>
    </Contents>
  </Mug>
</template>

<script setup lang="ts">
import Contents from "./Contents.vue";
import Mug from "./Mug.vue";
import Syrup from "./Syrup.vue";
import Base from "./Base.vue";
import Creamer from "./Creamer.vue";
import Hot from "./Hot.vue";
import Cold from "./Cold.vue";
import { useBeverageStore } from "../stores/beverageStore";

const beverageStore = useBeverageStore();
import { computed } from "vue";
const dynamicHeights = computed(() => beverageStore.dynamicHeights);


type Props = {
  isIced: boolean; // true → Cold, false → Hot
};
defineProps<Props>();
</script>
