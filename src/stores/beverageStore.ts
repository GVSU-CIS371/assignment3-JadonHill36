import { defineStore } from "pinia";

export const COLORS: Record<string, string> = {
  Coffee: "#6F4E37",
  "Black Tea": "#2E1F0E",
  "Green Tea": "#4CAF50",
  Milk: "#F0F8FF",
  Cream: "#FFFACD",
  "Half & Half": "#FAFAD2",
  Vanilla: "#FFEFD5",
  Caramel: "#DAA520",
  Hazelnut: "#6B4423",
  "No Cream": "transparent",
  "No Syrup": "transparent",
};

export const useBeverageStore = defineStore("beverageStore", {
  state: () => ({
    bases: ["Black Tea", "Green Tea", "Coffee"],
    creamers: ["No Cream", "Milk", "Cream", "Half & Half"],
    syrups: ["No Syrup", "Vanilla", "Caramel", "Hazelnut"],
    temperatures: ["Hot", "Cold"],

    currentBase: "Coffee",
    currentCreamer: "No Cream",
    currentSyrup: "No Syrup",
    currentTemperature: "Hot",

    beverages: [] as {
      name: string;
      base: string;
      creamer: string;
      syrup: string;
      temperature: string;
    }[],

    newName: "",
  }),

  actions: {
    makeBeverage() {
      if (!this.newName.trim()) return;

      const newBeverage = {
        name: this.newName.trim(),
        base: this.currentBase,
        creamer: this.currentCreamer,
        syrup: this.currentSyrup,
        temperature: this.currentTemperature,
      };

      this.beverages.push(newBeverage);
      this.newName = "";
    },

    showBeverage(bevName: string) {
      const found = this.beverages.find((b) => b.name === bevName);
      if (found) {
        this.currentBase = found.base;
        this.currentCreamer = found.creamer;
        this.currentSyrup = found.syrup;
        this.currentTemperature = found.temperature;
      }
    },

    setBase(base: string) {
      this.currentBase = base;
    },
    setCreamer(creamer: string) {
      this.currentCreamer = creamer;
    },
    setSyrup(syrup: string) {
      this.currentSyrup = syrup;
    },
    setTemperature(temp: string) {
      this.currentTemperature = temp;
    },
  },

  getters: {
  dynamicHeights: (state) => {
    const CREAMER_HEIGHT = 20;
    const SYRUP_HEIGHT = 10;
    const hasCreamer = state.currentCreamer !== "No Cream";
    const hasSyrup = state.currentSyrup !== "No Syrup";

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
  },
},

});
