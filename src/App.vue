<template>
  <div class="p-6 md:p-12 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center">
    <!-- Beverage Preview -->
    <div class="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
      <Beverage :isIced="beverageStore.currentTemperature === 'Cold'" />
    </div>

    <!-- Selection Controls -->
    <div class="w-full lg:w-1/2 p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl">
      <h2 class="text-2xl font-bold text-white mb-6 border-b pb-2 border-white/20">
        Customize Your Drink
      </h2>

      <div class="space-y-6">
        <!-- Temperature -->
        <div class="selection-group">
          <label class="group-label">Temperature</label>
          <div class="options">
            <template v-for="temp in beverageStore.temperatures" :key="temp">
              <label :for="`temp-${temp}`" class="option-label">
                <input
                  type="radio"
                  name="temperature"
                  :id="`temp-${temp}`"
                  :value="temp"
                  v-model="beverageStore.currentTemperature"
                />
                <span>{{ temp }}</span>
              </label>
            </template>
          </div>
        </div>

        <!-- Base Beverage -->
        <div class="selection-group">
          <label class="group-label">Base Beverage</label>
          <div class="options">
            <template v-for="base in beverageStore.bases" :key="base">
              <label :for="`base-${base}`" class="option-label">
                <input
                  type="radio"
                  name="base"
                  :id="`base-${base}`"
                  :value="base"
                  v-model="beverageStore.currentBase"
                />
                <span>{{ base }}</span>
              </label>
            </template>
          </div>
        </div>

        <!-- Creamer -->
        <div class="selection-group">
          <label class="group-label">Creamer</label>
          <div class="options">
            <template v-for="creamer in beverageStore.creamers" :key="creamer">
              <label :for="`creamer-${creamer}`" class="option-label">
                <input
                  type="radio"
                  name="creamer"
                  :id="`creamer-${creamer}`"
                  :value="creamer"
                  v-model="beverageStore.currentCreamer"
                />
                <span>{{ creamer }}</span>
              </label>
            </template>
          </div>
        </div>

        <!-- Syrup -->
        <div class="selection-group">
          <label class="group-label">Syrup</label>
          <div class="options">
            <template v-for="syrup in beverageStore.syrups" :key="syrup">
              <label :for="`syrup-${syrup}`" class="option-label">
                <input
                  type="radio"
                  name="syrup"
                  :id="`syrup-${syrup}`"
                  :value="syrup"
                  v-model="beverageStore.currentSyrup"
                />
                <span>{{ syrup }}</span>
              </label>
            </template>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <label for="bevName" class="text-white font-bold">Name:</label>
        <input
          id="bevName"
          v-model="beverageStore.newName"
          type="text"
          placeholder="Enter beverage name"
          class="ml-2 p-1 rounded text-black"
        />
        <button
          class="ml-2 px-3 py-1 bg-amber-600 text-white rounded hover:bg-amber-700"
          @click="beverageStore.makeBeverage()"
        >
          Make Beverage
        </button>
      </div>

      <div id="beverage-container" class="mt-6">
        <h3 class="text-white text-lg font-semibold mb-2">Saved Beverages</h3>
        <div v-if="beverageStore.beverages.length === 0">
          <em class="text-white/70">No beverages yet.</em>
        </div>
        <div v-else class="flex flex-wrap gap-2">
          <button
            v-for="bev in beverageStore.beverages"
            :key="bev.name"
            @click="beverageStore.showBeverage(bev.name)"
            class="bg-white/20 text-white px-3 py-1 rounded hover:bg-white/30 transition"
          >
            {{ bev.name }}
          </button>
        </div>
      </div>

      
    </div>
  </div>
</template>

<script setup lang="ts">
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";

const beverageStore = useBeverageStore();
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

body, html {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.selection-group {
  .group-label {
    display: block;
    font-size: 1.125rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.5rem;
  }
  .options {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .option-label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    background-color: #956f5a;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: background-color 0.2s;
    font-weight: 500;

    &:hover {
      background-color: #6e4228;
    }

    input[type="radio"] {
      margin-right: 0.5rem;
      color: #e4e0d2;
    }

    input[type="radio"]:checked + span {
      font-weight: 700;
    }
  }
}

input[type="radio"] {
  accent-color: #e4e0d2;
}
</style>
